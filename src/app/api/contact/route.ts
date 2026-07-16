import { NextRequest, NextResponse } from 'next/server'
import { sendContactMessage, emailEnabled } from '@/lib/email'

// SMTP needs Node, not the edge runtime.
export const runtime = 'nodejs'

const MAX = { name: 100, email: 200, message: 5000 }

// ponytail: in-memory per-instance rate limit, 5/hour per IP. Serverless means each
// instance has its own map, so a determined spammer hitting cold starts gets more than
// 5 — this stops casual bots, not a targeted flood. Move to Upstash (as ANT does in
// src/lib/rateLimit.ts) if real abuse shows up.
const hits = new Map<string, number[]>()
const WINDOW_MS = 60 * 60 * 1000
const LIMIT = 5

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= LIMIT) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear() // crude bound; this map is per-instance and short-lived
  return false
}

export async function POST(req: NextRequest) {
  try {
    // Vercel sets x-forwarded-for; take the first hop. Spoofable, but the limit is a
    // speed bump, not a security control.
    const ip = (req.headers.get('x-forwarded-for') ?? 'unknown').split(',')[0].trim()
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many messages. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
    }

    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }
    if (name.length > MAX.name || email.length > MAX.email || message.length > MAX.message) {
      return NextResponse.json({ error: 'One or more fields are too long.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    if (!emailEnabled) {
      // Misconfiguration must not look like success — the visitor would think it sent.
      console.error('[contact] email not configured (GMAIL_USER / GMAIL_APP_PASSWORD)')
      return NextResponse.json({ error: 'Email is not configured.' }, { status: 503 })
    }

    const ok = await sendContactMessage({ name, email, message })
    if (!ok) {
      return NextResponse.json({ error: 'Failed to send. Please email me directly.' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] unexpected error:', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
