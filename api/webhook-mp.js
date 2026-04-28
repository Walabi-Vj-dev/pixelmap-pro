const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const { type, data } = req.body
    console.log('Webhook MP:', type, data)

    if (type !== 'preapproval' && type !== 'subscription_preapproval') {
      return res.status(200).json({ ok: true, ignored: true })
    }

    const subscriptionId = data && data.id
    if (!subscriptionId) return res.status(400).json({ error: 'Sin ID' })

    const mpResponse = await fetch('https://api.mercadopago.com/preapproval/' + subscriptionId, {
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
        mp_subscription_id: subscriptionId,
        plan_expires_at: expiresAt.toISOString(),
        plan_updated_at: new Date().toISOString()
      }).eq('id', userId)
      console.log('Plan Pro activado para:', userId)
    } else if (['cancelled', 'paused', 'pending'].includes(subscription.status)) {
      await supabase.from('profiles').update({
        plan: 'free',
        mp_subscription_id: null,
        plan_expires_at: null,
        plan_updated_at: new Date().toISOString()
      }).eq('id', userId)
      console.log('Plan vuelto a Free para:', userId)
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return res.status(500).json({ error: err.message })
  }
}
