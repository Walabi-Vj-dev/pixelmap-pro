// /api/auth.js - Vercel Serverless Function
// Maneja: get-profile, use-trial, logout

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') return res.status(200).end()

  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token' })
  }

  const token = authHeader.split(' ')[1]

  // Verificar token con Supabase
  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) {
    return res.status(401).json({ error: 'Token inválido' })
  }

  const action = req.query.action || (req.body && req.body.action)

  // GET profile
  if (req.method === 'GET' || action === 'get-profile') {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) return res.status(500).json({ error: error.message })

    // Si es el admin, asegurar superop
    if (user.email === 'walabi@pixelmappro.com' && profile.plan !== 'superop') {
      await supabase.from('profiles').update({ plan: 'superop' }).eq('id', user.id)
      profile.plan = 'superop'
    }

    return res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.email.split('@')[0],
      plan: profile.plan,
      trial_exports: profile.trial_exports,
      plan_expires_at: profile.plan_expires_at
    })
  }

  // POST use-trial (incrementar contador de exportaciones)
  if (req.method === 'POST' && action === 'use-trial') {
    const { data: profile } = await supabase
      .from('profiles')
      .select('trial_exports, plan')
      .eq('id', user.id)
      .single()

    if (!profile) return res.status(404).json({ error: 'Perfil no encontrado' })
    if (profile.plan !== 'free') return res.status(200).json({ ok: true, trial_exports: profile.trial_exports })

    const newCount = (profile.trial_exports || 0) + 1
    await supabase.from('profiles').update({ trial_exports: newCount }).eq('id', user.id)

    return res.status(200).json({ ok: true, trial_exports: newCount })
  }

  return res.status(400).json({ error: 'Acción no válida' })
}
