import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion as Motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { contactDetails } from '../data/company'
import { IconResolver } from './IconResolver'
import SectionHeading from './SectionHeading'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const canUseEmailJs =
  Boolean(EMAILJS_SERVICE_ID) && Boolean(EMAILJS_TEMPLATE_ID) && Boolean(EMAILJS_PUBLIC_KEY)

const contactHighlights = ['Reply within 1 business day', 'Security-first planning', 'Founder-led consultation']

export default function ContactSection() {
  const [submitFeedback, setSubmitFeedback] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: 'onTouched' })

  const onSubmit = async (values) => {
    setSubmitFeedback(null)

    const openMailDraft = () => {
      const subject = encodeURIComponent(`New Website Query - ${values.service}`)
      const body = encodeURIComponent(
        `Name: ${values.name}\nEmail: ${values.email}\nService: ${values.service}\n\nMessage:\n${values.message}`
      )

      window.location.href = `mailto:${contactDetails.email}?subject=${subject}&body=${body}`
    }

    try {
      if (canUseEmailJs) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: values.name,
            reply_to: values.email,
            service_needed: values.service,
            message: values.message,
            to_email: contactDetails.email,
          },
          {
            publicKey: EMAILJS_PUBLIC_KEY,
          }
        )

        setSubmitFeedback({
          type: 'success',
          message: 'Query sent successfully. Our team will contact you shortly.',
        })
      } else {
        openMailDraft()
        setSubmitFeedback({
          type: 'warning',
          message: 'Email app opened. Send the draft to submit your query.',
        })
      }
    } catch (error) {
      console.error('Email send failed. Falling back to mail app.', error)
      openMailDraft()
      setSubmitFeedback({
        type: 'warning',
        message: 'Auto-send failed, so your email app was opened instead.',
      })
    }

    reset()
  }

  return (
    <section id="contact" className="theme-sheen-violet mx-auto w-full max-w-7xl scroll-mt-28 px-4 py-20 md:px-6" aria-labelledby="contact-title">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Contact"
            title="Let Us Build Something Incredible"
            description="Tell us your goals and we will design a practical, security-first plan to move your roadmap forward."
          />

          <div className="contact-intro-panel rounded-[2rem] border border-cyber-line/70 p-6 md:p-7">
            <div className="flex flex-wrap gap-2">
              {contactHighlights.map((item) => (
                <span key={item} className="contact-highlight-pill rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyber-text">
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <Detail icon="Mail" label="Email" value={contactDetails.email} href={`mailto:${contactDetails.email}`} />
              <Detail
                icon="Phone"
                label="Call"
                value={contactDetails.phone}
                href={`tel:${contactDetails.phone.replace(/\s+/g, '')}`}
              />
              <Detail icon="MapPin" label="Location" value={contactDetails.location} />
            </div>
          </div>
        </div>

        <Motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          onSubmit={handleSubmit(onSubmit)}
          className="glass-card contact-form-card rounded-[2rem] border border-cyber-line bg-cyber-panel p-6 md:p-8"
          noValidate
          aria-label="Contact Cytroksys"
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyber-cyan">Project Brief</p>
              <h3 className="mt-2 font-display text-2xl text-cyber-text">Tell us what you&apos;re building</h3>
            </div>
            <span className="contact-form-badge rounded-full px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyber-text">
              Fast response
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Name" error={errors.name?.message}>
              <input
                {...register('name', { required: 'Name is required' })}
                className="input-control"
                placeholder="John Doe"
                autoComplete="name"
              />
            </FormField>

            <FormField label="Email" error={errors.email?.message}>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: 'Enter a valid email address',
                  },
                })}
                className="input-control"
                placeholder="you@company.com"
                autoComplete="email"
              />
            </FormField>
          </div>

          <div className="mt-4">
            <FormField label="Service Needed" error={errors.service?.message}>
              <select
                {...register('service', { required: 'Select a service' })}
                className="input-control"
                defaultValue=""
              >
                <option value="" disabled>
                  Select service
                </option>
                <option value="web-app">Website & App Development</option>
                <option value="ai-agent">AI Agent Management</option>
                <option value="firewall">Firewall Management</option>
                <option value="cloud-mgmt">Cloud Management</option>
                <option value="migration">Cloud Migration</option>
                <option value="hybrid">Hybrid Cloud Solutions</option>
                <option value="security-audit">Security Audits</option>
              </select>
            </FormField>
          </div>

          <div className="mt-4">
            <FormField label="Message" error={errors.message?.message}>
              <textarea
                {...register('message', {
                  required: 'Share a short project brief',
                  minLength: {
                    value: 20,
                    message: 'Message should be at least 20 characters',
                  },
                })}
                className="input-control min-h-32 resize-y"
                placeholder="Tell us about your project goals, timeline, and challenges."
              />
            </FormField>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="contact-submit-btn mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Sending...' : 'Send Query'}
          </button>

          {submitFeedback ? (
            <p
              className={`mt-4 text-sm ${submitFeedback.type === 'success' ? 'text-emerald-400' : 'text-amber-400'}`}
              role="status"
            >
              {submitFeedback.message}
            </p>
          ) : null}
        </Motion.form>
      </div>
    </section>
  )
}

function Detail({ icon, label, value, href }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg'])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    x.set(mouseX / rect.width - 0.5)
    y.set(mouseY / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <Motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="perspective-1000 group relative overflow-hidden contact-detail-card flex items-start gap-3 rounded-2xl border border-cyber-line bg-cyber-panel p-4 transition-all hover:shadow-xl hover:shadow-cyber-cyan/10"
    >
      <span style={{ transform: 'translateZ(20px)' }} className="contact-detail-icon inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyber-ink text-cyber-cyan">
        <IconResolver name={icon} className="h-4 w-4" />
      </span>
      <span style={{ transform: 'translateZ(20px)' }}>
        <p className="text-xs uppercase tracking-[0.14em] text-cyber-muted">{label}</p>
        {href ? (
          <a href={href} className="mt-1 inline-block text-sm text-cyber-text transition hover:text-cyber-cyan">
            {value}
          </a>
        ) : (
          <p className="mt-1 text-sm text-cyber-text">{value}</p>
        )}
      </span>

      <div
        className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-0 blur-3xl transition-all group-hover:opacity-20"
        style={{ background: 'var(--color-cyan)', transform: 'translateZ(-20px)' }}
      />
    </Motion.div>
  )
}

function FormField({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.13em] text-cyber-muted">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-rose-300">{error}</span> : null}
    </label>
  )
}

