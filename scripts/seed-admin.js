/**
 * seed-admin.js
 * Registers an admin user in the Firestore `admins` collection.
 *
 * Prerequisites:
 *   1. Create a user in Firebase Console → Authentication → Add user
 *   2. Copy the UID of that user
 *   3. Set GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
 *   4. Run: ADMIN_UID=<your-uid> ADMIN_EMAIL=<email> node scripts/seed-admin.js
 *
 * Example:
 *   ADMIN_UID=abc123 ADMIN_EMAIL=admin@cytroksys.in node scripts/seed-admin.js
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

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

async function seedAdmin() {
  const uid = process.env.ADMIN_UID
  const email = process.env.ADMIN_EMAIL
  const displayName = process.env.ADMIN_NAME || 'Admin'

  if (!uid || !email) {
    console.error('❌ Missing required env vars: ADMIN_UID and ADMIN_EMAIL')
    console.error('   Usage: ADMIN_UID=xxx ADMIN_EMAIL=yyy node scripts/seed-admin.js')
    process.exit(1)
  }

  console.log(`\n🔐 Registering admin: ${email} (${uid})\n`)

  await db.collection('admins').doc(uid).set({
    uid,
    email,
    displayName,
    role: 'admin',
    isActive: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  })

  console.log(`✅ Admin registered: ${email}`)
  console.log('\n✨ Admin seed complete. You can now log in at /admin/login')
  process.exit(0)
}

seedAdmin().catch((err) => {
  console.error('❌ Admin seed failed:', err)
  process.exit(1)
})
