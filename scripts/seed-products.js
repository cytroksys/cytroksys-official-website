/**
 * seed-products.js
 * Seeds the Kaspersky product catalog into Firestore.
 *
 * Prerequisites:
 *   1. npm install firebase-admin (dev dependency)
 *   2. Download your Firebase service account JSON from:
 *      Firebase Console → Project Settings → Service Accounts → Generate new private key
 *   3. Set env var: GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
 *      OR set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
 *   4. Run: node scripts/seed-products.js
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// Initialise Admin SDK
const serviceAccountPath = resolve(process.cwd(), 'serviceAccountKey.json')
if (!getApps().length) {
  if (existsSync(serviceAccountPath)) {
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'))
    initializeApp({ credential: cert(serviceAccount) })
  } else {
    initializeApp()
  }
}

const db = getFirestore()
const now = Timestamp.now()

const products = [
  {
    name: 'Kaspersky Standard — 1 Device 1 Year',
    slug: 'kaspersky-standard-1-device-1-year',
    brand: 'Kaspersky',
    category: 'Antivirus',
    shortDescription: 'Essential antivirus protection for 1 device with real-time threat defense and secure browsing.',
    fullDescription: 'Kaspersky Standard provides essential protection against viruses, malware, ransomware, and phishing for a single device. Includes real-time scanning, secure browsing, and automatic updates.',
    features: [
      'Real-time antivirus & malware protection',
      'Anti-phishing and safe browsing',
      'Ransomware protection',
      'Automatic security updates',
      'Performance optimization tools',
    ],
    duration: '1 Year',
    deviceCount: 1,
    licenseType: 'New License',
    deliveryType: 'Digital Key',
    deliveryTime: 'Within 1 hour',
    price: 799,
    oldPrice: 1299,
    currency: 'INR',
    imageUrl: '',
    isActive: true,
    isFeatured: false,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
    createdBy: 'seed-script',
    updatedBy: 'seed-script',
  },
  {
    name: 'Kaspersky Standard — 3 Devices 1 Year',
    slug: 'kaspersky-standard-3-devices-1-year',
    brand: 'Kaspersky',
    category: 'Antivirus',
    shortDescription: 'Essential antivirus protection for up to 3 devices — perfect for families.',
    fullDescription: 'Kaspersky Standard 3-device plan protects up to 3 PCs, Macs, or mobile devices with full antivirus, anti-phishing, and ransomware protection.',
    features: [
      'Covers up to 3 devices',
      'Cross-platform: Windows, Mac, Android',
      'Real-time antivirus & malware protection',
      'Anti-phishing and safe browsing',
      'Ransomware protection',
    ],
    duration: '1 Year',
    deviceCount: 3,
    licenseType: 'New License',
    deliveryType: 'Digital Key',
    deliveryTime: 'Within 1 hour',
    price: 1199,
    oldPrice: 1999,
    currency: 'INR',
    imageUrl: '',
    isActive: true,
    isFeatured: false,
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
    createdBy: 'seed-script',
    updatedBy: 'seed-script',
  },
  {
    name: 'Kaspersky Plus — 1 Device 1 Year',
    slug: 'kaspersky-plus-1-device-1-year',
    brand: 'Kaspersky',
    category: 'Internet Security',
    shortDescription: 'Advanced protection with VPN, password manager, and privacy tools for 1 device.',
    fullDescription: 'Kaspersky Plus offers enhanced protection including a built-in VPN, password manager, and privacy cleaner on top of core antivirus features.',
    features: [
      'All Standard features included',
      'Unlimited VPN for private browsing',
      'Password Manager',
      'Privacy Cleaner',
      'Data leak checker',
    ],
    duration: '1 Year',
    deviceCount: 1,
    licenseType: 'New License',
    deliveryType: 'Digital Key',
    deliveryTime: 'Within 1 hour',
    price: 1099,
    oldPrice: 1799,
    currency: 'INR',
    imageUrl: '',
    isActive: true,
    isFeatured: true,
    sortOrder: 3,
    createdAt: now,
    updatedAt: now,
    createdBy: 'seed-script',
    updatedBy: 'seed-script',
  },
  {
    name: 'Kaspersky Plus — 3 Devices 1 Year',
    slug: 'kaspersky-plus-3-devices-1-year',
    brand: 'Kaspersky',
    category: 'Internet Security',
    shortDescription: 'Advanced protection with VPN and privacy tools for up to 3 devices.',
    fullDescription: 'Kaspersky Plus 3-device plan covers up to 3 devices with advanced security features including VPN, password manager, and data leak checker.',
    features: [
      'Covers up to 3 devices',
      'All Standard features included',
      'Unlimited VPN',
      'Password Manager',
      'Privacy Cleaner & Data leak checker',
    ],
    duration: '1 Year',
    deviceCount: 3,
    licenseType: 'New License',
    deliveryType: 'Digital Key',
    deliveryTime: 'Within 1 hour',
    price: 1599,
    oldPrice: 2699,
    currency: 'INR',
    imageUrl: '',
    isActive: true,
    isFeatured: true,
    sortOrder: 4,
    createdAt: now,
    updatedAt: now,
    createdBy: 'seed-script',
    updatedBy: 'seed-script',
  },
  {
    name: 'Kaspersky Premium — 5 Devices 1 Year',
    slug: 'kaspersky-premium-5-devices-1-year',
    brand: 'Kaspersky',
    category: 'Total Security',
    shortDescription: 'Complete security suite with identity protection and premium support for 5 devices.',
    fullDescription: 'Kaspersky Premium is the top-tier plan offering identity protection, premium tech support, and all Plus features across up to 5 devices.',
    features: [
      'Covers up to 5 devices',
      'All Plus features included',
      'Identity theft protection',
      'Premium 24/7 tech support',
      'Kids safety & parental controls',
    ],
    duration: '1 Year',
    deviceCount: 5,
    licenseType: 'New License',
    deliveryType: 'Digital Key',
    deliveryTime: 'Within 1 hour',
    price: 2299,
    oldPrice: 3999,
    currency: 'INR',
    imageUrl: '',
    isActive: true,
    isFeatured: true,
    sortOrder: 5,
    createdAt: now,
    updatedAt: now,
    createdBy: 'seed-script',
    updatedBy: 'seed-script',
  },
  {
    name: 'Kaspersky Renewal — 1 Year',
    slug: 'kaspersky-renewal-1-year',
    brand: 'Kaspersky',
    category: 'Renewal',
    shortDescription: 'Renew your existing Kaspersky subscription and stay protected for another year.',
    fullDescription: 'Keep your Kaspersky protection active with a renewal key. Compatible with Standard, Plus, and Premium plans. Simply enter the renewal key in your existing Kaspersky application.',
    features: [
      'Compatible with all Kaspersky plans',
      'Extends current subscription by 1 year',
      'No reinstallation required',
      'Instant digital key delivery',
      'Maintains all existing settings',
    ],
    duration: '1 Year',
    deviceCount: 1,
    licenseType: 'Renewal',
    deliveryType: 'Digital Key',
    deliveryTime: 'Within 1 hour',
    price: 699,
    oldPrice: 999,
    currency: 'INR',
    imageUrl: '',
    isActive: true,
    isFeatured: false,
    sortOrder: 6,
    createdAt: now,
    updatedAt: now,
    createdBy: 'seed-script',
    updatedBy: 'seed-script',
  },
]

async function seed() {
  console.log('🌱 Starting product seed...\n')

  for (const product of products) {
    const docRef = db.collection('products').doc()
    await docRef.set(product)
    console.log(`✅ Created: ${product.name}`)
  }

  console.log(`\n✨ Seeded ${products.length} products successfully.`)
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
