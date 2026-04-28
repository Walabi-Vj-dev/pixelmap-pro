const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const { type, data, action } = req.body
    console.log('Webhook MP recibido:', type, action, JSON.stringify(data))

    // Manejar notificacion de pago aprobado
    if (type === 'payment' || action === 'payment.updated') {
      const paymentId = data && data.id
      if (!paymentId) return res.status(400).json({ error: 'Sin payment ID' })

      // Obtener detalles del pago
      const mpResponse = await fetch('https://api.mercadopago.com/v1/payments/' + paymentId, {
        headers: { 'Authorization': 'Bearer ' + process.env.MP_ACCESS_TOKEN }
      })
      const payment = await mpResponse.json()
      console.log('Payment data:', payment.status, payment.external_reference)

      const userId = payment.external_reference
      if (!userId) return res.status(400).json({ error: 'Sin external_reference' })

      if (payment.status === 'approved') {
        // Pago aprobado → activar Pro por 30 dias
        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + 30)

        await supabase.from('profiles').update({
          plan: 'pro',
          mp_subscription_id: String(paymentId),
          plan_expires_at: expiresAt.toISOString(),
          plan_updated_at: new Date().toISOString()
        }).eq('id', userId)

        console.log('✅ Plan Pro activado para usuario:', userId)
      } else if (payment.status === 'rejected' || payment.status === 'cancelled') {
        console.log('❌ Pago rechazado/cancelado para:', userId)
      }
    }

    // Manejar notificaciones de suscripcion
    if (type === 'preapproval') {
      const subId = data && data.id
      if (!subId) return res.status(400).json({ error: 'Sin subscription ID' })

      const mpResponse = await fetch('https://api.mercadopago.com/preapproval/' + subId, {
        headers: { 'Authorization': 'Bearer ' + process.env.MP_ACCESS_TOKEN }
      })
      const subscription = await mpResponse.json()
      const userId = subscription.external_reference

      if (!userId) return res.status(400).json({ error: 'Sin external_reference' })

      if (subscription.status === 'authorized') {
        const expiresAt = new Date()
        expiresAt.setMonth(expiresAt.getMonth() + 1)
        await supabase.from('profiles').update({
          plan: 'pro',
          mp_subscription_id: subId,
          plan_expires_at: expiresAt.toISOString(),
          plan_updated_at: new Date().toISOString()
        }).eq('id', userId)
        console.log('✅ Suscripcion Pro activada para:', userId)
      } else if (['cancelled', 'paused'].includes(subscription.status)) {
        await supabase.from('profiles').update({
          plan: 'free',
          mp_subscription_id: null,
          plan_expires_at: null,
          plan_updated_at: new Date().toISOString()
        }).eq('id', userId)
        console.log('⚠️ Plan vuelto a Free para:', userId)
      }
    }

    return res.status(200).json({ ok: true })

  } catch (err) {
    console.error('Webhook error:', err)
    return res.status(500).json({ error: err.message })
  }
}
