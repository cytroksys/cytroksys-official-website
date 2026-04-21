/* global process */
import 'dotenv/config'
import express from 'express'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import { companyProfile, services } from '../src/data/company.js'

const app = express()
const port = Number(process.env.PORT || 8787)

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const GOOGLE_MODEL = process.env.GOOGLE_MODEL || 'gemini-2.0-flash'
const GOOGLE_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GOOGLE_MODEL}:generateContent`

const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || 'support@cytroksys.in'
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.office365.com'
const SMTP_PORT = Number(process.env.SMTP_PORT || 587)
const SMTP_USER = process.env.SMTP_USER || ''
const SMTP_PASS = process.env.SMTP_PASS || ''
const SMTP_FROM = process.env.SMTP_FROM || SUPPORT_EMAIL
const GRAPH_TENANT_ID = process.env.GRAPH_TENANT_ID || ''
const GRAPH_CLIENT_ID = process.env.GRAPH_CLIENT_ID || ''
const GRAPH_CLIENT_SECRET = process.env.GRAPH_CLIENT_SECRET || ''
const GRAPH_SENDER_UPN = process.env.GRAPH_SENDER_UPN || SUPPORT_EMAIL
const COMPANY_WEBSITE_URL = process.env.COMPANY_WEBSITE_URL || 'https://cytroksys.in'
const OTP_TTL_MS = Number(process.env.CUSTOMER_OTP_TTL_MS || 10 * 60 * 1000)
const CUSTOMER_SESSION_TTL_MS = Number(process.env.CUSTOMER_SESSION_TTL_MS || 24 * 60 * 60 * 1000)
const MAX_OTP_ATTEMPTS = Number(process.env.CUSTOMER_OTP_MAX_ATTEMPTS || 5)

const otpStore = new Map()
const customerSessionStore = new Map()
const smtpEnabled = Boolean(SMTP_USER && SMTP_PASS)
const graphEnabled = Boolean(GRAPH_TENANT_ID && GRAPH_CLIENT_ID && GRAPH_CLIENT_SECRET && GRAPH_SENDER_UPN)

const graphTokenCache = {
  accessToken: '',
  expiresAt: 0,
}

const mailTransporter = smtpEnabled
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })
  : null

const SUPPORT_DOCUMENT = [
  `Company: ${companyProfile.name}`,
  `Tagline: ${companyProfile.tagline}`,
  `Mission: ${companyProfile.mission}`,
  '',
  'Support Knowledge Base (Services):',
  ...services.map((service) => `- ${service.title}: ${service.summary}`),
].join('\n')

app.use(express.json({ limit: '1mb' }))

function cleanupAuthStores() {
  const now = Date.now()

  for (const [email, value] of otpStore.entries()) {
    if (!value || value.expiresAt <= now) {
      otpStore.delete(email)
    }
  }

  for (const [token, value] of customerSessionStore.entries()) {
    if (!value || value.expiresAt <= now) {
      customerSessionStore.delete(token)
    }
  }
}

setInterval(cleanupAuthStores, 5 * 60 * 1000).unref()

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase()
}

function isValidEmail(email) {
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i.test(email)
}

function sanitizeText(value) {
  return String(value || '').replace(/[\r\n]+/g, ' ').trim()
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function money(value) {
  const amount = Number(value || 0)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number.isFinite(amount) ? amount : 0)
}

function formatDateTime(value) {
  if (!value) return '—'
  const asDate = value?.toDate ? value.toDate() : new Date(value)
  if (Number.isNaN(asDate.getTime())) return '—'
  return asDate.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function renderEmailShell({ title, subtitle, badge, sections = [], accent = '#06b6d4', footerNote = '' }) {
  const renderedSections = sections
    .map((section) => {
      const rows = (section.rows || [])
        .map((row) => `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;width:38%;font-size:12px;color:#6b7280;vertical-align:top;">${escapeHtml(row.label)}</td>
            <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:13px;color:#111827;vertical-align:top;">${escapeHtml(row.value)}</td>
          </tr>
        `)
        .join('')

      return `
        <div style="margin-top:16px;border:1px solid #dbeafe;border-radius:14px;background:#ffffff;overflow:hidden;">
          <div style="padding:10px 14px;background:#eff6ff;border-bottom:1px solid #dbeafe;font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:#1d4ed8;">${escapeHtml(section.title)}</div>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:0 14px 4px;">
            ${rows}
          </table>
        </div>
      `
    })
    .join('')

  return `
    <!doctype html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          @media (prefers-reduced-motion: no-preference) {
            .pulse-badge { animation: pulseGlow 2.4s ease-in-out infinite; }
            @keyframes pulseGlow {
              0%, 100% { box-shadow: 0 0 0 0 rgba(6,182,212,.15); }
              50% { box-shadow: 0 0 0 8px rgba(6,182,212,0); }
            }
          }
        </style>
      </head>
      <body style="margin:0;padding:0;background:#f3f6fb;font-family:Segoe UI,Arial,sans-serif;color:#111827;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:28px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;border-collapse:separate;border-spacing:0;background:#ffffff;border:1px solid #dbe7ff;border-radius:18px;overflow:hidden;">
                <tr>
                  <td style="background:linear-gradient(120deg,#0f172a 0%,#164e63 52%,#0f172a 100%);padding:22px 22px 16px;">
                    <div style="display:inline-block;background:rgba(6,182,212,.14);border:1px solid rgba(6,182,212,.35);border-radius:999px;padding:6px 11px;font-size:11px;color:#67e8f9;letter-spacing:.08em;text-transform:uppercase;font-weight:700;" class="pulse-badge">${escapeHtml(badge || 'Cytroksys Notification')}</div>
                    <h1 style="margin:14px 0 0;color:#f8fafc;font-size:24px;line-height:1.25;">${escapeHtml(title)}</h1>
                    <p style="margin:8px 0 0;color:#cbd5e1;font-size:13px;line-height:1.5;">${escapeHtml(subtitle)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 18px 6px;">
                    ${renderedSections}
                    <div style="margin:18px 0 0;padding:14px;border-radius:12px;background:${accent}14;border:1px solid ${accent}44;color:#0f172a;font-size:13px;line-height:1.55;">
                      Need help? Reply to this email or write to <a href="mailto:${escapeHtml(SUPPORT_EMAIL)}" style="color:#0c4a6e;text-decoration:none;font-weight:600;">${escapeHtml(SUPPORT_EMAIL)}</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 18px 20px;color:#64748b;font-size:11px;line-height:1.55;border-top:1px solid #e5e7eb;">
                    ${escapeHtml(footerNote || 'This is an automated transactional email from Cytroksys Infotech.')}
                    <br />
                    <a href="${escapeHtml(COMPANY_WEBSITE_URL)}" style="color:#0369a1;text-decoration:none;">${escapeHtml(COMPANY_WEBSITE_URL)}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

function getBearerToken(req) {
  const authHeader = String(req.headers?.authorization || '')
  if (!authHeader.toLowerCase().startsWith('bearer ')) {
    return ''
  }
  return authHeader.slice(7).trim()
}

function getValidatedCustomerSession(req) {
  cleanupAuthStores()

  const token = sanitizeText(getBearerToken(req) || req.body?.token)
  if (!token) return null

  const entry = customerSessionStore.get(token)
  if (!entry) return null

  if (entry.expiresAt <= Date.now()) {
    customerSessionStore.delete(token)
    return null
  }

  return { token, ...entry }
}

function parseEmailList(value) {
  if (!value) return []

  if (Array.isArray(value)) {
    return value.map((entry) => normalizeEmail(entry)).filter(Boolean)
  }

  return String(value)
    .split(',')
    .map((entry) => normalizeEmail(entry))
    .filter(Boolean)
}

async function getGraphAccessToken() {
  const now = Date.now()
  if (graphTokenCache.accessToken && graphTokenCache.expiresAt > now) {
    return graphTokenCache.accessToken
  }

  const tokenUrl = `https://login.microsoftonline.com/${encodeURIComponent(GRAPH_TENANT_ID)}/oauth2/v2.0/token`
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: GRAPH_CLIENT_ID,
    client_secret: GRAPH_CLIENT_SECRET,
    scope: 'https://graph.microsoft.com/.default',
  })

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Graph token request failed (${response.status}): ${errorText}`)
  }

  const payload = await response.json()
  const accessToken = String(payload?.access_token || '')
  const expiresInSeconds = Number(payload?.expires_in || 3600)

  if (!accessToken) {
    throw new Error('Graph token response is missing access_token.')
  }

  graphTokenCache.accessToken = accessToken
  graphTokenCache.expiresAt = Date.now() + Math.max(60, expiresInSeconds - 120) * 1000
  return accessToken
}

async function sendGraphMail(payload) {
  const toRecipients = parseEmailList(payload?.to)
  if (toRecipients.length === 0) {
    throw new Error('Graph email requires at least one "to" recipient.')
  }

  const ccRecipients = parseEmailList(payload?.cc)
  const bccRecipients = parseEmailList(payload?.bcc)
  const replyToRecipients = parseEmailList(payload?.replyTo)
  const accessToken = await getGraphAccessToken()
  const graphUrl = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(GRAPH_SENDER_UPN)}/sendMail`

  const content = payload?.html || payload?.text || ''
  const graphPayload = {
    message: {
      subject: sanitizeText(payload?.subject),
      body: {
        contentType: payload?.html ? 'HTML' : 'Text',
        content,
      },
      toRecipients: toRecipients.map((address) => ({ emailAddress: { address } })),
      ccRecipients: ccRecipients.map((address) => ({ emailAddress: { address } })),
      bccRecipients: bccRecipients.map((address) => ({ emailAddress: { address } })),
      replyTo: replyToRecipients.map((address) => ({ emailAddress: { address } })),
    },
    saveToSentItems: true,
  }

  const response = await fetch(graphUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(graphPayload),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Graph sendMail failed (${response.status}): ${errorText}`)
  }

  return { ok: true }
}

async function sendMail(payload) {
  if (graphEnabled) {
    try {
      return await sendGraphMail(payload)
    } catch (error) {
      if (!mailTransporter) {
        throw new Error(`Graph email failed: ${error.message}`)
      }
      console.error('Graph email failed. Falling back to SMTP.', error)
    }
  }

  if (!mailTransporter) {
    throw new Error('Email is not configured. Set Graph or SMTP credentials in environment.')
  }

  return mailTransporter.sendMail({
    from: SMTP_FROM,
    ...payload,
  })
}

function buildOrderPlacedEmail(order) {
  const productLine = [
    sanitizeText(order.productNameSnapshot),
    sanitizeText(order.productDurationSnapshot),
    order.productDeviceCountSnapshot ? `${order.productDeviceCountSnapshot} device(s)` : '',
  ]
    .filter(Boolean)
    .join(' | ')

  const subject = `Order Received: ${sanitizeText(order.orderNumber)}`

  const text = [
    `Hello ${sanitizeText(order.customerFirstName || 'Customer')},`,
    '',
    'Your order request has been received successfully.',
    `Order Number: ${sanitizeText(order.orderNumber)}`,
    `Product: ${productLine || 'N/A'}`,
    `Price: ${money(order.productPriceSnapshot)}`,
    '',
    'Our admin team will confirm your order and send your key shortly.',
    '',
    `For support: ${SUPPORT_EMAIL}`,
  ].join('\n')

  const html = renderEmailShell({
    title: 'Order Received Successfully',
    subtitle: `Hi ${sanitizeText(order.customerFirstName || 'Customer')}, your request is now in our priority queue.`,
    badge: 'Order Confirmation',
    accent: '#0891b2',
    sections: [
      {
        title: 'Order Details',
        rows: [
          { label: 'Order Number', value: sanitizeText(order.orderNumber) },
          { label: 'Product', value: productLine || 'N/A' },
          { label: 'Price', value: money(order.productPriceSnapshot) },
          { label: 'Estimated Delivery', value: 'Within 1 hour' },
        ],
      },
    ],
    footerNote: 'Please keep this order number for support and tracking.',
  })

  return { subject, text, html }
}

function buildOrderStatusEmail(order, newStatus, note, deliveryKey, deliveryNote) {
  const cleanStatus = sanitizeText(newStatus)
  const cleanKey = sanitizeText(deliveryKey)
  const cleanDeliveryNote = sanitizeText(deliveryNote)
  const cleanAdminNote = sanitizeText(note)

  const subject = `Order ${sanitizeText(order.orderNumber)}: ${cleanStatus}`

  const lines = [
    `Hello ${sanitizeText(order.customerFirstName || 'Customer')},`,
    '',
    `Your order status has been updated to: ${cleanStatus}`,
    `Order Number: ${sanitizeText(order.orderNumber)}`,
    `Product: ${sanitizeText(order.productNameSnapshot)}`,
  ]

  if (cleanStatus.toLowerCase() === 'key sent' && cleanKey) {
    lines.push(`Activation Key: ${cleanKey}`)
  }

  if (cleanDeliveryNote) {
    lines.push(`Delivery Note: ${cleanDeliveryNote}`)
  }

  if (cleanAdminNote) {
    lines.push(`Admin Note: ${cleanAdminNote}`)
  }

  lines.push('', `Updated At: ${formatDateTime(new Date())}`)
  lines.push(`Support: ${SUPPORT_EMAIL}`)

  const text = lines.join('\n')

  const statusColor = cleanStatus.toLowerCase() === 'cancelled'
    ? '#e11d48'
    : cleanStatus.toLowerCase() === 'key sent'
      ? '#059669'
      : '#2563eb'

  const statusRows = [
    { label: 'Order Number', value: sanitizeText(order.orderNumber) },
    { label: 'Product', value: sanitizeText(order.productNameSnapshot) },
    { label: 'Updated Status', value: cleanStatus },
    { label: 'Updated At', value: formatDateTime(new Date()) },
  ]

  if (cleanStatus.toLowerCase() === 'key sent' && cleanKey) {
    statusRows.push({ label: 'Activation Key', value: cleanKey })
  }

  if (cleanDeliveryNote) {
    statusRows.push({ label: 'Delivery Note', value: cleanDeliveryNote })
  }

  if (cleanAdminNote) {
    statusRows.push({ label: 'Admin Note', value: cleanAdminNote })
  }

  const html = renderEmailShell({
    title: `Order Status: ${cleanStatus}`,
    subtitle: `Hi ${sanitizeText(order.customerFirstName || 'Customer')}, we have updated your order with the latest progress.`,
    badge: 'Status Update',
    accent: statusColor,
    sections: [
      {
        title: 'Latest Update',
        rows: statusRows,
      },
    ],
    footerNote: 'If you have questions about this update, reply directly to this email.',
  })

  return { subject, text, html }
}

function buildFallbackReply(input) {
  const value = String(input || '').toLowerCase()

  const formatResponse = (title, bullets, nextStep) => {
    return `${title}\n\nSupport Notes:\n- ${bullets.join('\n- ')}\n\nNext Step:\n${nextStep}`
  }

  if (value.includes('ai') || value.includes('rag') || value.includes('agent')) {
    return formatResponse(
      'Vyana RAG Support: AI Agent Workflow',
      [
        'Define business objective and escalation boundaries.',
        'Connect document sources for retrieval and grounding.',
        'Add observability for answer quality and latency.',
      ],
      'Share your use case and expected daily queries. We will prepare an implementation plan.'
    )
  }

  if (value.includes('price') || value.includes('cost') || value.includes('quote')) {
    return formatResponse(
      'Vyana Support: Quotation Preparation',
      [
        'Collect requirements, timeline, and expected user load.',
        'Define phased delivery with security and QA milestones.',
        'Map budget to scope with optional scale-up paths.',
      ],
      'Use the Contact form or ask me for a project checklist before requesting a quote.'
    )
  }

  if (value.includes('cloud') || value.includes('migration') || value.includes('aws') || value.includes('azure') || value.includes('gcp')) {
    return formatResponse(
      'Vyana Support: Cloud Migration',
      [
        'Start with inventory and dependency mapping.',
        'Run staged migration with rollback and health checks.',
        'Enable ongoing cost and performance governance.',
      ],
      'Tell me your current platform and target cloud. I will suggest a practical migration sequence.'
    )
  }

  if (value.includes('security') || value.includes('audit') || value.includes('firewall')) {
    return formatResponse(
      'Vyana Support: Security and Audit',
      [
        'Perform vulnerability and access posture review.',
        'Harden firewall policy and segmentation controls.',
        'Generate compliance-ready audit documentation.',
      ],
      'Share your compliance target and environment size to receive a tailored audit checklist.'
    )
  }

  return formatResponse(
    'Vyana Support: General Guidance',
    [
      'AI agent delivery and support automation.',
      'Cloud operations and migration planning.',
      'Security hardening and audit readiness.',
    ],
    'Ask a specific question and I will respond with structured support steps.'
  )
}

function extractAssistantText(payload) {
  const parts = payload?.candidates?.[0]?.content?.parts || []
  const merged = parts
    .map((part) => part?.text)
    .filter(Boolean)
    .join('\n')
    .trim()

  return merged || null
}

async function buildGoogleReply(input, conversation) {
  if (!GOOGLE_API_KEY) {
    return null
  }

  const conversationText = conversation
    .slice(-8)
    .map((message) => `${message.from === 'assistant' ? 'Assistant' : 'User'}: ${message.text}`)
    .join('\n')

  const prompt = [
    'You are Vyana Cytroksys Assistant, a RAG-style support assistant.',
    'Use only the support knowledge provided below.',
    'If user asks outside support scope, politely redirect to Cytroksys services/support.',
    'Always respond in this exact structure:',
    'Title',
    '',
    'Support Notes:',
    '- bullet 1',
    '- bullet 2',
    '- bullet 3',
    '',
    'Next Step:',
    'one practical next action.',
    '',
    SUPPORT_DOCUMENT,
    '',
    `Conversation:\n${conversationText}`,
    '',
    `Latest User Query: ${input}`,
  ].join('\n')

  const response = await fetch(`${GOOGLE_API_URL}?key=${encodeURIComponent(GOOGLE_API_KEY)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.25,
        topP: 0.9,
        maxOutputTokens: 420,
      },
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Google API error ${response.status}: ${errorText}`)
  }

  const payload = await response.json()
  return extractAssistantText(payload)
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'vyana-api' })
})

app.post('/api/auth/customer/request-otp', async (req, res) => {
  const email = normalizeEmail(req.body?.email)

  if (!email || !isValidEmail(email)) {
    res.status(400).json({ error: 'A valid email is required.' })
    return
  }

  const code = generateOtp()
  otpStore.set(email, {
    code,
    expiresAt: Date.now() + OTP_TTL_MS,
    attempts: 0,
  })

  const subject = 'Your Cytroksys Login OTP'
  const text = [
    'Your OTP for Cytroksys customer login is:',
    '',
    `OTP: ${code}`,
    '',
    `This OTP will expire in ${Math.floor(OTP_TTL_MS / 60000)} minutes.`,
    '',
    `If you did not request this OTP, contact ${SUPPORT_EMAIL}.`,
  ].join('\n')

  const html = `
    <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.6;color:#1f2937">
      <h2 style="margin:0 0 12px">Customer Login OTP</h2>
      <p>Your OTP for Cytroksys customer login is:</p>
      <p style="font-size:24px;font-weight:700;letter-spacing:3px">${code}</p>
      <p>This OTP will expire in ${Math.floor(OTP_TTL_MS / 60000)} minutes.</p>
      <p>If you did not request this OTP, contact <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>.</p>
    </div>
  `

  try {
    await sendMail({ to: email, subject, text, html, replyTo: SUPPORT_EMAIL })
    res.json({ ok: true, expiresInSeconds: Math.floor(OTP_TTL_MS / 1000) })
  } catch (error) {
    console.error('Failed to send OTP email', error)
    res.status(500).json({ error: 'Failed to send OTP email. Check Graph/SMTP configuration.' })
  }
})

app.post('/api/auth/customer/verify-otp', (req, res) => {
  cleanupAuthStores()

  const email = normalizeEmail(req.body?.email)
  const otp = sanitizeText(req.body?.otp)

  if (!email || !isValidEmail(email) || !otp) {
    res.status(400).json({ error: 'Email and OTP are required.' })
    return
  }

  const record = otpStore.get(email)
  if (!record) {
    res.status(400).json({ error: 'OTP not found. Request a new OTP.' })
    return
  }

  if (record.expiresAt <= Date.now()) {
    otpStore.delete(email)
    res.status(400).json({ error: 'OTP expired. Request a new OTP.' })
    return
  }

  if (record.attempts >= MAX_OTP_ATTEMPTS) {
    otpStore.delete(email)
    res.status(429).json({ error: 'Too many invalid attempts. Request a new OTP.' })
    return
  }

  if (record.code !== otp) {
    record.attempts += 1
    otpStore.set(email, record)
    res.status(401).json({ error: 'Invalid OTP.' })
    return
  }

  otpStore.delete(email)
  const token = crypto.randomBytes(24).toString('hex')
  customerSessionStore.set(token, {
    email,
    expiresAt: Date.now() + CUSTOMER_SESSION_TTL_MS,
  })

  res.json({
    ok: true,
    email,
    token,
    expiresInSeconds: Math.floor(CUSTOMER_SESSION_TTL_MS / 1000),
  })
})

app.post('/api/auth/customer/validate', (req, res) => {
  const session = getValidatedCustomerSession(req)

  if (!session) {
    res.status(401).json({ error: 'Invalid or expired customer session.' })
    return
  }

  res.json({
    ok: true,
    email: session.email,
    expiresInSeconds: Math.floor((session.expiresAt - Date.now()) / 1000),
  })
})

app.post('/api/email/order-placed', async (req, res) => {
  const order = req.body?.order || {}
  const customerEmail = normalizeEmail(order.customerEmail)

  if (!customerEmail || !isValidEmail(customerEmail)) {
    res.status(400).json({ error: 'order.customerEmail is required.' })
    return
  }

  if (!sanitizeText(order.orderNumber)) {
    res.status(400).json({ error: 'order.orderNumber is required.' })
    return
  }

  try {
    const payload = buildOrderPlacedEmail(order)
    await sendMail({
      to: customerEmail,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
      replyTo: SUPPORT_EMAIL,
    })

    if (SUPPORT_EMAIL && SUPPORT_EMAIL.toLowerCase() !== customerEmail) {
      await sendMail({
        to: SUPPORT_EMAIL,
        subject: `New Customer Order: ${sanitizeText(order.orderNumber)}`,
        text: payload.text,
        html: payload.html,
        replyTo: customerEmail,
      })
    }

    res.json({ ok: true })
  } catch (error) {
    console.error('Failed to send order placed email', error)
    res.status(500).json({ error: 'Failed to send order confirmation email.' })
  }
})

app.post('/api/email/order-status', async (req, res) => {
  const order = req.body?.order || {}
  const customerEmail = normalizeEmail(order.customerEmail)
  const newStatus = sanitizeText(req.body?.newStatus)
  const note = sanitizeText(req.body?.note)
  const deliveryKey = sanitizeText(req.body?.deliveryKey || order.deliveryKey)
  const deliveryNote = sanitizeText(req.body?.deliveryNote || order.deliveryNote)

  if (!customerEmail || !isValidEmail(customerEmail)) {
    res.status(400).json({ error: 'order.customerEmail is required.' })
    return
  }

  if (!sanitizeText(order.orderNumber) || !newStatus) {
    res.status(400).json({ error: 'order.orderNumber and newStatus are required.' })
    return
  }

  try {
    const payload = buildOrderStatusEmail(order, newStatus, note, deliveryKey, deliveryNote)

    await sendMail({
      to: customerEmail,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
      replyTo: SUPPORT_EMAIL,
    })

    if (SUPPORT_EMAIL && SUPPORT_EMAIL.toLowerCase() !== customerEmail) {
      await sendMail({
        to: SUPPORT_EMAIL,
        subject: `Order Update (${newStatus}): ${sanitizeText(order.orderNumber)}`,
        text: payload.text,
        html: payload.html,
        replyTo: customerEmail,
      })
    }

    res.json({ ok: true })
  } catch (error) {
    console.error('Failed to send order status email', error)
    res.status(500).json({ error: 'Failed to send order status email.' })
  }
})

app.post('/api/vyana', async (req, res) => {
  const input = String(req.body?.input || '').trim()
  const conversation = Array.isArray(req.body?.conversation) ? req.body.conversation : []

  if (!input) {
    res.status(400).json({ error: 'input is required' })
    return
  }

  try {
    const googleReply = await buildGoogleReply(input, conversation)
    const reply = googleReply || buildFallbackReply(input)
    const mode = googleReply ? 'google' : 'fallback'

    res.json({ reply, mode })
  } catch (error) {
    console.error('Vyana API error, sending fallback response.', error)
    res.json({ reply: buildFallbackReply(input), mode: 'fallback' })
  }
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Vyana API running on port ${port}`)
})
