export const ORDER_STATUSES = {
  PLACED: 'Placed',
  CONFIRMED: 'Confirmed',
  KEY_SENT: 'Key Sent',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
}

export const ORDER_STATUS_LIST = [
  ORDER_STATUSES.PLACED,
  ORDER_STATUSES.CONFIRMED,
  ORDER_STATUSES.KEY_SENT,
  ORDER_STATUSES.COMPLETED,
  ORDER_STATUSES.CANCELLED,
]

export const STATUS_COLORS = {
  [ORDER_STATUSES.PLACED]: { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30' },
  [ORDER_STATUSES.CONFIRMED]: { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30' },
  [ORDER_STATUSES.KEY_SENT]: { bg: 'bg-violet-500/15', text: 'text-violet-400', border: 'border-violet-500/30' },
  [ORDER_STATUSES.COMPLETED]: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  [ORDER_STATUSES.CANCELLED]: { bg: 'bg-rose-500/15', text: 'text-rose-400', border: 'border-rose-500/30' },
}

export const PRODUCT_CATEGORIES = {
  ANTIVIRUS: 'Antivirus',
  INTERNET_SECURITY: 'Internet Security',
  TOTAL_SECURITY: 'Total Security',
  RENEWAL: 'Renewal',
}

export const PRODUCT_CATEGORY_LIST = Object.values(PRODUCT_CATEGORIES)

export const BRANDS = {
  KASPERSKY: 'Kaspersky',
}

export const BRAND_LIST = Object.values(BRANDS)

export const DELIVERY_TYPES = {
  DIGITAL_KEY: 'Digital Key',
}

export const LICENSE_TYPES = {
  NEW: 'New License',
  RENEWAL: 'Renewal',
}

export const CURRENCIES = {
  INR: 'INR',
}
