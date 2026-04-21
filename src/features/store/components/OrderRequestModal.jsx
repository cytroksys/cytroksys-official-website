import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { X, ShieldCheck, CheckCircle2, Clock } from 'lucide-react'
import { useOrderSubmit } from '../hooks/useOrderSubmit'
import {
  requestCustomerOtp,
  verifyCustomerOtp,
  validateCustomerSession,
  clearCustomerSession,
  getStoredCustomerSession,
} from '../../../services/emailService'
import { useToast } from '../../../context/ToastContext'

export default function OrderRequestModal({ product, isOpen, onClose }) {
  const { submitOrder, submitting, success, orderResult, reset } = useOrderSubmit()
  const { toast } = useToast()
  const [requestingOtp, setRequestingOtp] = useState(false)
  const [verifyingOtp, setVerifyingOtp] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpValue, setOtpValue] = useState('')
  const [emailVerified, setEmailVerified] = useState(false)
  const [verifiedEmail, setVerifiedEmail] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
    reset: resetForm,
  } = useForm({ mode: 'onTouched' })

  const currentEmail = watch('email')

  const normalizeEmail = (value) => String(value || '').trim().toLowerCase()

  // Reset state when modal opens with a new product
  useEffect(() => {
    if (isOpen) {
      reset()
      resetForm()
      setRequestingOtp(false)
      setVerifyingOtp(false)
      setOtpSent(false)
      setOtpValue('')
      setEmailVerified(false)
      setVerifiedEmail('')

      const existing = getStoredCustomerSession()
      if (existing?.email && existing?.token) {
        setValue('email', existing.email, { shouldValidate: true })
        validateCustomerSession(existing.token)
          .then(() => {
            setEmailVerified(true)
            setVerifiedEmail(normalizeEmail(existing.email))
          })
          .catch(() => {
            clearCustomerSession()
          })
      }
    }
  }, [isOpen, reset, resetForm, setValue])

  useEffect(() => {
    const normalizedCurrent = normalizeEmail(currentEmail)
    if (!normalizedCurrent) {
      setEmailVerified(false)
      setVerifiedEmail('')
      setOtpSent(false)
      setOtpValue('')
      return
    }

    if (emailVerified && normalizedCurrent !== verifiedEmail) {
      setEmailVerified(false)
      setVerifiedEmail('')
      setOtpSent(false)
      setOtpValue('')
      clearCustomerSession()
    }
  }, [currentEmail, emailVerified, verifiedEmail])

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const onSubmit = async (values) => {
    if (!product) return

    const normalizedEmail = normalizeEmail(values.email)
    if (!emailVerified || normalizedEmail !== verifiedEmail) {
      toast('Please verify your email with OTP before placing the order.', 'warning')
      return
    }

    try {
      await submitOrder(product, values)
    } catch {
      // Error handled by hook toast
    }
  }

  const handleRequestOtp = async () => {
    const isEmailValid = await trigger('email')
    if (!isEmailValid) {
      toast('Enter a valid email first.', 'warning')
      return
    }

    const email = normalizeEmail(currentEmail)
    setRequestingOtp(true)
    try {
      await requestCustomerOtp(email)
      setOtpSent(true)
      setOtpValue('')
      setEmailVerified(false)
      setVerifiedEmail('')
      toast('OTP sent to your email.', 'success')
    } catch (error) {
      toast(error.message || 'Failed to send OTP.', 'error')
    } finally {
      setRequestingOtp(false)
    }
  }

  const handleVerifyOtp = async () => {
    const email = normalizeEmail(currentEmail)
    if (!email) {
      toast('Enter email first.', 'warning')
      return
    }

    if (!otpValue.trim()) {
      toast('Enter OTP to verify.', 'warning')
      return
    }

    setVerifyingOtp(true)
    try {
      const result = await verifyCustomerOtp(email, otpValue.trim())
      await validateCustomerSession(result.token)
      setEmailVerified(true)
      setVerifiedEmail(normalizeEmail(result.email))
      setOtpSent(false)
      setOtpValue('')
      toast('Email verified successfully.', 'success')
    } catch (error) {
      toast(error.message || 'OTP verification failed.', 'error')
    } finally {
      setVerifyingOtp(false)
    }
  }

  if (!isOpen || !product) return null

  return (
    <AnimatePresence>
      <Motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        <Motion.div
          key="modal"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-cyber-line bg-cyber-ink p-6 shadow-2xl md:p-8"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1 text-cyber-muted transition hover:text-cyber-text"
          >
            <X className="h-5 w-5" />
          </button>

          {success ? (
            /* Success state */
            <div className="flex flex-col items-center py-8 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="font-display text-xl text-cyber-text">Order Placed Successfully!</h3>
              <p className="mt-3 text-sm text-cyber-muted">
                Order <span className="font-mono text-cyber-cyan">{orderResult?.orderNumber}</span>
              </p>
              <div className="mt-6 space-y-2 text-sm text-cyber-muted">
                <p>Our team will deliver your digital key within 1 hour.</p>
                <p>We may contact you through your email or phone if needed.</p>
              </div>
              <button
                onClick={onClose}
                className="mt-8 rounded-full bg-cyber-cyan/10 px-8 py-2.5 text-sm font-semibold text-cyber-cyan transition hover:bg-cyber-cyan/20"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            /* Order form */
            <>
              <h2 className="font-display text-lg text-cyber-text">Place Order Request</h2>
              <p className="mt-1 text-xs text-cyber-muted">No payment required — we&apos;ll deliver your key within 1 hour</p>

              {/* Product summary */}
              <div className="mt-5 flex items-center gap-4 rounded-xl border border-cyber-line/50 bg-cyber-panel/40 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyber-ink">
                  <ShieldCheck className="h-6 w-6 text-cyber-cyan/30" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-cyber-text">{product.name}</p>
                  <div className="mt-0.5 flex items-center gap-3 text-xs text-cyber-muted">
                    <span>{product.duration}</span>
                    <span>{product.deviceCount} {product.deviceCount === 1 ? 'Device' : 'Devices'}</span>
                  </div>
                </div>
                <p className="shrink-0 font-display text-lg font-bold text-cyber-text">
                  ₹{product.price?.toLocaleString('en-IN')}
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="First Name" error={errors.firstName?.message}>
                    <input
                      {...register('firstName', { required: 'First name is required' })}
                      className="input-control"
                      placeholder="John"
                      autoComplete="given-name"
                    />
                  </Field>
                  <Field label="Last Name" error={errors.lastName?.message}>
                    <input
                      {...register('lastName', { required: 'Last name is required' })}
                      className="input-control"
                      placeholder="Doe"
                      autoComplete="family-name"
                    />
                  </Field>
                </div>

                <Field label="Email" error={errors.email?.message}>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: 'Enter a valid email address',
                      },
                    })}
                    type="email"
                    className="input-control"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </Field>

                <div className="rounded-lg border border-cyber-cyan/20 bg-cyber-cyan/5 p-3">
                  <p className="text-[10px] uppercase tracking-[0.13em] text-cyber-cyan">Customer Login (Email OTP)</p>

                  {emailVerified ? (
                    <p className="mt-2 text-xs text-emerald-400">
                      Email verified: {verifiedEmail}
                    </p>
                  ) : (
                    <>
                      <p className="mt-2 text-xs text-cyber-muted">
                        Verify your email to place order securely.
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={handleRequestOtp}
                          disabled={requestingOtp || verifyingOtp}
                          className="rounded-lg border border-cyber-cyan/40 px-3 py-1.5 text-xs font-semibold text-cyber-cyan transition hover:bg-cyber-cyan/10 disabled:opacity-50"
                        >
                          {requestingOtp ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                      </div>

                      {otpSent && (
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <input
                            value={otpValue}
                            onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            inputMode="numeric"
                            className="input-control w-40"
                            placeholder="Enter 6-digit OTP"
                          />
                          <button
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={verifyingOtp || requestingOtp}
                            className="rounded-lg border border-emerald-500/40 px-3 py-1.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/10 disabled:opacity-50"
                          >
                            {verifyingOtp ? 'Verifying...' : 'Verify OTP'}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <Field label="Phone" error={errors.phone?.message}>
                  <input
                    {...register('phone', { required: 'Phone number is required' })}
                    type="tel"
                    className="input-control"
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                  />
                </Field>

                <Field label="Request / Note (Optional)" error={errors.request?.message}>
                  <textarea
                    {...register('request')}
                    className="input-control min-h-[72px] resize-y"
                    placeholder="Any special instructions or questions..."
                  />
                </Field>

                <div className="flex items-center gap-2 rounded-lg border border-cyber-cyan/15 bg-cyber-cyan/5 p-3">
                  <Clock className="h-4 w-4 shrink-0 text-cyber-cyan" />
                  <p className="text-xs text-cyber-cyan">
                    Your digital key will be delivered within 1 hour of order confirmation.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting || !emailVerified}
                  className="contact-submit-btn mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Placing Order...
                    </>
                  ) : (
                    'Place Order Request'
                  )}
                </button>
              </form>
            </>
          )}
        </Motion.div>
      </Motion.div>
    </AnimatePresence>
  )
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.13em] text-cyber-muted">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-rose-400">{error}</span>}
    </label>
  )
}
