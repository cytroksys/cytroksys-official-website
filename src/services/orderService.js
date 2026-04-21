import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  onSnapshot,
  limit,
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import { ORDER_STATUSES } from '../lib/constants'

const COLLECTION = 'orders'

function orderRef(id) {
  return doc(db, COLLECTION, id)
}

function ordersCollection() {
  return collection(db, COLLECTION)
}

/** Generate a unique order number: CYT-YYYYMMDD-XXXX */
function generateOrderNumber() {
  const now = new Date()
  const date = now.toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `CYT-${date}-${rand}`
}

/** Public: create an order with product snapshot */
export async function createOrder(product, customerData) {
  const orderData = {
    orderNumber: generateOrderNumber(),
    productId: product.id,
    productNameSnapshot: product.name,
    productPriceSnapshot: product.price,
    productDurationSnapshot: product.duration,
    productDeviceCountSnapshot: product.deviceCount,
    brandSnapshot: product.brand,
    customerFirstName: customerData.firstName,
    customerLastName: customerData.lastName,
    customerEmail: customerData.email,
    customerPhone: customerData.phone,
    customerRequest: customerData.request || '',
    status: ORDER_STATUSES.PLACED,
    adminNote: '',
    deliveryNote: '',
    deliveryKey: '',
    keySentAt: null,
    source: 'store',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  const docRef = await addDoc(ordersCollection(), orderData)
  return { id: docRef.id, orderNumber: orderData.orderNumber }
}

/** Admin: get all orders with optional filters */
export async function getOrders(filters = {}) {
  const constraints = [orderBy('createdAt', 'desc')]

  if (filters.status) {
    constraints.unshift(where('status', '==', filters.status))
  }

  if (filters.brand) {
    constraints.unshift(where('brandSnapshot', '==', filters.brand))
  }

  const q = query(ordersCollection(), ...constraints)
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
}

/** Admin: realtime subscription to orders */
export function subscribeToOrders(callback, filters = {}) {
  const constraints = [orderBy('createdAt', 'desc')]

  if (filters.status) {
    constraints.unshift(where('status', '==', filters.status))
  }

  const q = query(ordersCollection(), ...constraints)
  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    callback(orders)
  })
}

/** Admin: get single order */
export async function getOrderById(id) {
  const snap = await getDoc(orderRef(id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}

/** Admin: realtime single order */
export function subscribeToOrderById(id, callback) {
  return onSnapshot(orderRef(id), (snap) => {
    if (snap.exists()) {
      callback({ id: snap.id, ...snap.data() })
    } else {
      callback(null)
    }
  })
}

/** Admin: update order status with history */
export async function updateOrderStatus(id, newStatus, adminUid, note = '') {
  const order = await getOrderById(id)
  if (!order) throw new Error('Order not found')

  const fromStatus = order.status
  const updateData = {
    status: newStatus,
    updatedAt: serverTimestamp(),
  }

  if (newStatus === ORDER_STATUSES.KEY_SENT) {
    updateData.keySentAt = serverTimestamp()
  }

  await updateDoc(orderRef(id), updateData)

  // Add to status history subcollection
  await addDoc(collection(db, COLLECTION, id, 'statusHistory'), {
    orderId: id,
    fromStatus,
    toStatus: newStatus,
    note,
    changedBy: adminUid,
    changedAt: serverTimestamp(),
  })
}

/** Admin: update order fields (notes, delivery key, etc.) */
export async function updateOrderFields(id, fields) {
  await updateDoc(orderRef(id), {
    ...fields,
    updatedAt: serverTimestamp(),
  })
}

/** Admin: get order status history */
export async function getOrderStatusHistory(orderId) {
  const q = query(
    collection(db, COLLECTION, orderId, 'statusHistory'),
    orderBy('changedAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
}

/** Admin: get recent orders for dashboard */
export async function getRecentOrders(count = 10) {
  const q = query(ordersCollection(), orderBy('createdAt', 'desc'), limit(count))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
}
