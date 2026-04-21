const CUSTOMER_AUTH_STORAGE_KEY = 'cytroksys-customer-auth'

async function postJson(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body || {}),
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(payload.error || 'Request failed')
  }

  return payload
}

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase()
}

export function saveCustomerSession(session) {
  const token = String(session?.token || '').trim()
  const email = normalizeEmail(session?.email)
  const expiresInSeconds = Number(session?.expiresInSeconds || 0)

  if (!token || !email || !Number.isFinite(expiresInSeconds) || expiresInSeconds <= 0) {
    return
  }

  const expiresAt = Date.now() + expiresInSeconds * 1000
  const value = JSON.stringify({ token, email, expiresAt })
  localStorage.setItem(CUSTOMER_AUTH_STORAGE_KEY, value)
}

export function getStoredCustomerSession() {
  const raw = localStorage.getItem(CUSTOMER_AUTH_STORAGE_KEY)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw)
    if (!parsed?.token || !parsed?.email || !parsed?.expiresAt) {
      return null
    }

    if (parsed.expiresAt <= Date.now()) {
      clearCustomerSession()
      return null
    }

    return parsed
  } catch {
    clearCustomerSession()
    return null
  }
}

export function clearCustomerSession() {
  localStorage.removeItem(CUSTOMER_AUTH_STORAGE_KEY)
}

export async function requestCustomerOtp(email) {
  const normalizedEmail = normalizeEmail(email)
  if (!normalizedEmail) {
    throw new Error('Email is required')
  }

  return postJson('/api/auth/customer/request-otp', { email: normalizedEmail })
}

export async function verifyCustomerOtp(email, otp) {
  const normalizedEmail = normalizeEmail(email)
  const cleanOtp = String(otp || '').trim()

  if (!normalizedEmail || !cleanOtp) {
    throw new Error('Email and OTP are required')
  }

  const payload = await postJson('/api/auth/customer/verify-otp', {
    email: normalizedEmail,
    otp: cleanOtp,
  })

  saveCustomerSession(payload)
  return payload
}

export async function validateCustomerSession(token) {
  const cleanToken = String(token || '').trim()
  if (!cleanToken) {
    throw new Error('Token is required')
  }

  return postJson('/api/auth/customer/validate', { token: cleanToken })
}

export async function sendOrderPlacedEmail(order) {
  return postJson('/api/email/order-placed', { order })
}

export async function sendOrderStatusEmail({ order, newStatus, note = '', deliveryKey = '', deliveryNote = '' }) {
  return postJson('/api/email/order-status', {
    order,
    newStatus,
    note,
    deliveryKey,
    deliveryNote,
  })
}
