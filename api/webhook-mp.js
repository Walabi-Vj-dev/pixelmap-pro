// /api/webhook-mp.js - Webhook de MercadoPago
// MP llama a este endpoint cuando se confirma/cancela un pago

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const { type, data } = req.body

    console.log('Webhook MP recibido:', type, data)

    // Solo procesamos notificaciones de suscripciones
    if (type !== 'preapproval' && type !== 'subscription_preapproval') {
      return res.status(200).json({ ok: true, ignored: true })
    }

    const subscriptionId = data?.id
    if (!subscriptionId) return res.status(400).json({ error: 'Sin ID' })

    // Obtener datos de la suscripción en MP
    const mpResponse = await fetch(`https://api.mercadopago.com/preapproval/${subscriptionId}`, {
      headers: { 'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}` }
    })
    const subscription = await mpResponse.json()

    console.log('Suscripción MP:', subscription.status, subscription.external_reference)

    const userId = subscription.external_reference
    if (!userId) return res.status(400).json({ error: 'Sin external_reference' })

    // Mapear estado MP a plan de usuario
    if (subscription.status === 'authorized') {
      // Pago autorizado → activar Pro
      const expiresAt = new Date()
      expiresAt.setMonth(expiresAt.getMonth() + 1)

      await supabase.from('profiles').update({
        plan: 'pro',
        mp_subscription_id: subscriptionId,
        mp_preapproval_id: subscription.preapproval_plan_id,
        plan_expires_at: expiresAt.toISOString(),
        plan_updated_at: new Date().toISOString()
      }).eq('id', userId)

      console.log(`✅ Plan Pro activado para usuario ${userId}`)

    } else if (['cancelled', 'paused', 'pending'].includes(subscription.status)) {
      // Suscripción cancelada/suspendida → volver a Free
      await supabase.from('profiles').update({
        plan: 'free',
        mp_subscription_id: null,
        plan_expires_at: null,
        plan_updated_at: new Date().toISOString()
      }).eq('id', userId)

      console.log(`⚠️ Plan vuelto a Free para usuario ${userId} (estado: ${subscription.status})`)
    }

    return res.status(200).json({ ok: true })

  } catch (err) {
    console.error('Webhook error:', err)
    return res.status(500).json({ error: err.message })
  }
}
