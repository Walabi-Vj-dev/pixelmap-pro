const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Metodo no permitido' })

  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autenticado' })
  }

  const token = authHeader.split(' ')[1]
  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) return res.status(401).json({ error: 'Token invalido' })

  try {
    const appUrl = process.env.APP_URL || 'https://pixelmap-pro.vercel.app'
    const mpToken = process.env.MP_ACCESS_TOKEN

    // Crear preference de pago con checkout Pro de MP
    // Monto en ARS: ~$7500 ARS = U$S 4.99 aprox
    // Unit price minimo en MP Argentina es $15 ARS
    const prefResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + mpToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: [
          {
            id: 'pixelmap-pro-monthly',
            title: 'PixelMap Pro',
            description: 'Plan Pro mensual - U$S 4.99/mes',
            category_id: 'software',
            quantity: 1,
            currency_id: 'ARS',
            unit_price: 7500
          }
        ],
        payer: {
          email: user.email
        },
        external_reference: user.id,
        back_urls: {
          success: appUrl + '?payment=success',
          failure: appUrl + '?payment=failure',
          pending: appUrl + '?payment=pending'
        },
        auto_return: 'approved',
        notification_url: appUrl + '/api/webhook-mp',
        statement_descriptor: 'PixelMap Pro',
        expires: false
      })
    })

    const prefData = await prefResponse.json()
    console.log('MP Preference response:', JSON.stringify(prefData))

    if (prefData.init_point) {
      // Guardar preference_id en Supabase
      await supabase.from('profiles').update({
        mp_preapproval_id: prefData.id,
        plan_updated_at: new Date().toISOString()
      }).eq('id', user.id)

      return res.status(200).json({
        init_point: prefData.init_point,
        preference_id: prefData.id
      })
    }

    console.error('MP error - no init_point:', prefData)
    return res.status(500).json({
      error: 'Error creando pago en MercadoPago',
      detail: prefData
    })

  } catch (err) {
    console.error('Error interno:', err)
    return res.status(500).json({ error: 'Error interno', detail: err.message })
  }
}
