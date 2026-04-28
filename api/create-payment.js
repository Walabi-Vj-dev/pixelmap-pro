// /api/create-payment.js - Crea preferencia de suscripción en MercadoPago

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' })

  // Verificar usuario autenticado
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'No autenticado' })

  const token = authHeader.split(' ')[1]
  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) return res.status(401).json({ error: 'Token inválido' })

  try {
    const appUrl = process.env.APP_URL || 'https://pixelmap-pro-cr2o.vercel.app'

    // Crear preferencia de suscripción (preapproval) en MercadoPago
    const response = await fetch('https://api.mercadopago.com/preapproval_plan', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reason: 'PixelMap Pro - Plan mensual',
        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          transaction_amount: 4.99,
          currency_id: 'USD'
        },
        back_url: `${appUrl}?payment=success`,
        status: 'active'
      })
    })

    const plan = await response.json()

    if (!plan.id) {
      console.error('MP error:', plan)
      return res.status(500).json({ error: 'Error creando plan en MercadoPago', detail: plan })
    }

    // Ahora crear la suscripción para este usuario específico
    const subResponse = await fetch('https://api.mercadopago.com/preapproval', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        preapproval_plan_id: plan.id,
        reason: 'PixelMap Pro - Plan Pro U$S 4.99/mes',
        external_reference: user.id,
        payer_email: user.email,
        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          transaction_amount: 4.99,
          currency_id: 'USD'
        },
        back_url: `${appUrl}?payment=success`,
        status: 'pending'
      })
    })

    const subscription = await subResponse.json()

    if (!subscription.init_point) {
      console.error('MP subscription error:', subscription)
      return res.status(500).json({ error: 'Error creando suscripción', detail: subscription })
    }

    // Guardar ID de suscripción en Supabase
    await supabase.from('profiles').update({
      mp_preapproval_id: subscription.id,
      plan_updated_at: new Date().toISOString()
    }).eq('id', user.id)

    return res.status(200).json({
      init_point: subscription.init_point,
      subscription_id: subscription.id
    })

  } catch (err) {
    console.error('Error:', err)
    return res.status(500).json({ error: 'Error interno', detail: err.message })
  }
}
