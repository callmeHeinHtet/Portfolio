// Contact-form email via personal Gmail (SMTP).
//
// Mirrors the ANT hotel setup (AungNaingThu/src/lib/email.ts): nodemailer with a Gmail
// App Password (NOT the account password — Gmail blocks that from servers). Set these
// in the environment:
//   GMAIL_USER          the gmail address (the "from")
//   GMAIL_APP_PASSWORD  a 16-char App Password from Google Account → Security
//
// SAFE-OFF: if the credentials aren't set, send is a no-op that logs a warning and
// reports failure to the caller — it never throws at import time.
//
// SERVER ONLY. This must never be imported into a client component: the App Password is
// a real secret (full send-as access to the account). It is safe here because Vercel
// runs /api/* server-side.
import nodemailer from 'nodemailer'

const GMAIL_USER = process.env.GMAIL_USER
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD
export const emailEnabled = Boolean(GMAIL_USER && GMAIL_APP_PASSWORD)

// One reused transporter. Created lazily so a missing config never throws at import.
let transporter: nodemailer.Transporter | null = null
function getTransporter(): nodemailer.Transporter | null {
  if (!emailEnabled) return null
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    })
  }
  return transporter
}

// HTML-escape visitor-supplied text before it goes into an email body.
const esc = (s: string | undefined | null) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

export interface ContactMessage {
  name: string
  email: string
  message: string
}

export function buildContactEmailHtml({ name, email, message }: ContactMessage): string {
  return `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#0D0D0D;border-bottom:2px solid #FF3D00;padding-bottom:8px">
        New portfolio message
      </h2>
      <p style="margin:16px 0"><strong>From:</strong> ${esc(name)}</p>
      <p style="margin:16px 0"><strong>Email:</strong> ${esc(email)}</p>
      <div style="margin:24px 0;padding:16px;background:#F7F5F0;border-left:3px solid #FF3D00">
        <p style="white-space:pre-wrap;margin:0">${esc(message)}</p>
      </div>
      <p style="color:#8A8A8A;font-size:12px">Sent from the contact form on your portfolio.</p>
    </div>
  `
}

/** Send a contact-form message to GMAIL_USER. Returns false if email is off or send fails. */
export async function sendContactMessage(msg: ContactMessage): Promise<boolean> {
  const t = getTransporter()
  if (!t) {
    console.warn('[email] GMAIL_USER / GMAIL_APP_PASSWORD not set — contact message dropped')
    return false
  }
  try {
    await t.sendMail({
      from: `"Portfolio Contact" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      // replyTo lets you hit Reply and answer the visitor directly.
      replyTo: msg.email,
      subject: `Portfolio: ${msg.name}`,
      html: buildContactEmailHtml(msg),
    })
    return true
  } catch (err) {
    console.error('[email] send failed:', err)
    return false
  }
}
