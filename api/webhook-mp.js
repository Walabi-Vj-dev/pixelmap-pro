const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function activatePro(userId, paymentId) {
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 30)
  const { error } = await supabase.from('profiles').update({
    plan: 'pro',
    mp_subscription_id: String(paymentId),
    plan_expires_at: expiresAt.toISOString(),
    plan_updated_at: new Date().toISOString()
  }).eq('id', userId)
  if (error) console.error('Supabase update error:', error)
  else console.log('✅ Plan Pro activado para:', userId)
}

module.exports = async function handler(req, res) {
  // Responder 200 inmediatamente para que MP no reintente
  res.status(200).json({ ok: true })

  try {
    console.log('=== WEBHOOK MP ===')
    console.log('Body:', JSON.stringify(req.body))
    console.log('Query:', JSON.stringify(req.query))

    const body = req.body || {}
    const query = req.query || {}

    // MP puede enviar el payment ID en el body o en query params
    const type = body.type || query.type || ''
    const action = body.action || query.action || ''
    const dataId = (body.data && body.data.id) || query['data.id'] || query.id || ''

    console.log('type:', type, '| action:', action, '| dataId:', dataId)

    // Notificacion de pago
    if (type === 'payment' || action === 'payment.updated' || action === 'payment.created') {
      if (!dataId) { console.log('Sin payment ID'); return }

      const mpRes = await fetch('https://api.mercadopago.com/v1/payments/' + dataId, {
        headers: { 'Authorization': 'Bearer ' + process.env.MP_ACCESS_TOKEN }
      })
      const payment = await mpRes.json()
      console.log('Payment:', payment.id, '| status:', payment.status, '| ref:', payment.external_reference)

      if (payment.status === 'approved' && payment.external_reference) {
        await activatePro(payment.external_reference, payment.id)
      }
    }

    // Notificacion de suscripcion
    if (type === 'preapproval') {
      if (!dataId) { console.log('Sin preapproval ID'); return }

      const mpRes = await fetch('https://api.mercadopago.com/preapproval/' + dataId, {
        headers: { 'Authorization': 'Bearer ' + process.env.MP_ACCESS_TOKEN }
      })
      const sub = await mpRes.json()
      console.log('Preapproval:', sub.id, '| status:', sub.status, '| ref:', sub.external_reference)

      if (sub.status === 'authorized' && sub.external_reference) {
        await activatePro(sub.external_reference, sub.id)
      }
    }

    // MP a veces envía merchant_order
    if (type === 'merchant_order') {
      if (!dataId) return
      const mpRes = await fetch('https://api.mercadopago.com/merchant_orders/' + dataId, {
        headers: { 'Authorization': 'Bearer ' + process.env.MP_ACCESS_TOKEN }
      })
      const order = await mpRes.json()
      console.log('Order:', order.id, '| status:', order.order_status, '| ref:', order.external_reference)

      if (order.order_status === 'paid' && order.external_reference) {
        // Buscar el payment aprobado dentro de la orden
        const approvedPayment = (order.payments || []).find(p => p.status === 'approved')
        if (approvedPayment) {
          await activatePro(order.external_reference, approvedPayment.id)
        }
      }
    }

  } catch (err) {
    console.error('Webhook error:', err.message)
  }
}
