import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

const COLLECTION = 'products'

function productRef(id) {
  return doc(db, COLLECTION, id)
}

function productsCollection() {
  return collection(db, COLLECTION)
}

/** Public: get active products ordered by sortOrder */
export async function getActiveProducts() {
  const q = query(productsCollection(), where('isActive', '==', true))
  const snapshot = await getDocs(q)
  return snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => {
      const aSort = Number.isFinite(Number(a.sortOrder)) ? Number(a.sortOrder) : 0
      const bSort = Number.isFinite(Number(b.sortOrder)) ? Number(b.sortOrder) : 0

      if (aSort !== bSort) return aSort - bSort
      return String(a.name || '').localeCompare(String(b.name || ''))
    })
}

/** Public: get a single product by slug */
export async function getProductBySlug(slug) {
  const q = query(productsCollection(), where('slug', '==', slug))
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  const d = snapshot.docs[0]
  return { id: d.id, ...d.data() }
}

/** Admin: get all products */
export async function getAllProducts() {
  const q = query(productsCollection(), orderBy('sortOrder', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
}

/** Admin: realtime subscription to all products */
export function subscribeToProducts(callback) {
  const q = query(productsCollection(), orderBy('sortOrder', 'asc'))
  return onSnapshot(q, (snapshot) => {
    const products = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    callback(products)
  })
}

/** Admin: get single product by ID */
export async function getProductById(id) {
  const snap = await getDoc(productRef(id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}

/** Admin: create product */
export async function createProduct(data, adminUid) {
  const docRef = await addDoc(productsCollection(), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: adminUid,
    updatedBy: adminUid,
  })
  return docRef.id
}

/** Admin: update product */
export async function updateProduct(id, data, adminUid) {
  await updateDoc(productRef(id), {
    ...data,
    updatedAt: serverTimestamp(),
    updatedBy: adminUid,
  })
}

/** Admin: delete product */
export async function deleteProduct(id) {
  await deleteDoc(productRef(id))
}

/** Admin: toggle product active status */
export async function toggleProductActive(id, isActive, adminUid) {
  await updateDoc(productRef(id), {
    isActive,
    updatedAt: serverTimestamp(),
    updatedBy: adminUid,
  })
}

/** Admin: quick price update */
export async function updateProductPrice(id, price, oldPrice, adminUid) {
  await updateDoc(productRef(id), {
    price,
    oldPrice: oldPrice || null,
    updatedAt: serverTimestamp(),
    updatedBy: adminUid,
  })
}
