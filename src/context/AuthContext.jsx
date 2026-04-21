import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [adminProfile, setAdminProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)

      if (firebaseUser) {
        try {
          const adminDoc = await getDoc(doc(db, 'admins', firebaseUser.uid))
          if (adminDoc.exists() && adminDoc.data().isActive) {
            setAdminProfile({ id: adminDoc.id, ...adminDoc.data() })
          } else {
            setAdminProfile(null)
          }
        } catch (err) {
          console.error('Failed to fetch admin profile:', err)
          setAdminProfile(null)
        }
      } else {
        setAdminProfile(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = useCallback(async (email, password) => {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    const adminDoc = await getDoc(doc(db, 'admins', credential.user.uid))

    if (!adminDoc.exists() || !adminDoc.data().isActive) {
      await signOut(auth)
      throw new Error('You are not authorized as an admin.')
    }

    return credential.user
  }, [])

  const logout = useCallback(async () => {
    await signOut(auth)
    setAdminProfile(null)
  }, [])

  const value = {
    user,
    adminProfile,
    loading,
    isAdmin: Boolean(adminProfile),
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
