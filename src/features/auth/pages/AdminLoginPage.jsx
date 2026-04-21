import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import { ShieldCheck, LogIn, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'
import { useForceLightTheme } from '../../../hooks/useForceLightTheme'

export default function AdminLoginPage() {
  useForceLightTheme()

  const { isAdmin, loading, login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onTouched' })

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cyber-ink">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyber-cyan border-t-transparent" />
      </div>
    )
  }

  if (isAdmin) {
    return <Navigate to="/admin" replace />
  }

  const onSubmit = async (values) => {
    setAuthError('')
    try {
      await login(values.email, values.password)
    } catch (err) {
      const code = err?.code || ''
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        setAuthError('Invalid email or password.')
      } else if (err?.message?.includes('not authorized')) {
        setAuthError('You are not authorized as an admin.')
      } else {
        setAuthError('Login failed. Please try again.')
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cyber-ink p-4">
      <Motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="glass-card rounded-2xl border border-cyber-line p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyber-cyan/10 text-cyber-cyan">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h1 className="font-display text-2xl text-cyber-text">Admin Login</h1>
            <p className="mt-2 text-sm text-cyber-muted">Cytroksys Infotech — Control Panel</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.13em] text-cyber-muted">
                  Email
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: 'Enter a valid email',
                    },
                  })}
                  type="email"
                  className="input-control"
                  placeholder="admin@cytroksys.in"
                  autoComplete="email"
                />
                {errors.email && (
                  <span className="mt-1 block text-xs text-rose-400">{errors.email.message}</span>
                )}
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.13em] text-cyber-muted">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register('password', { required: 'Password is required' })}
                    type={showPassword ? 'text' : 'password'}
                    className="input-control pr-10"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cyber-muted transition hover:text-cyber-text"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <span className="mt-1 block text-xs text-rose-400">{errors.password.message}</span>
                )}
              </div>
            </div>

            {authError && (
              <div className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-400">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="contact-submit-btn mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>
      </Motion.div>
    </div>
  )
}
