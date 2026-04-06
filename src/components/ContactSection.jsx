import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion as Motion } from 'framer-motion'
import { contactDetails } from '../data/company'
import { IconResolver } from './IconResolver'
import SectionHeading from './SectionHeading'

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: 'onTouched' })

  const onSubmit = async (values) => {
    console.info('Inquiry submitted', values)
    await new Promise((resolve) => {
      setTimeout(resolve, 500)
    })
    setSubmitted(true)
    reset()
  }

  return (
    <section id="contact" className="mx-auto w-full max-w-7xl px-4 py-20 md:px-6" aria-labelledby="contact-title">
      <div className="grid gap-8 md:grid-cols-[1fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let Us Build Something Incredible"
            description="Tell us your goals and we will design a practical, security-first plan to move your roadmap forward."
          />

          <div className="mt-8 space-y-4">
            <Detail icon="Mail" label="Email" value={contactDetails.email} />
            <Detail icon="Phone" label="Call" value={contactDetails.phone} />
            <Detail icon="MapPin" label="Location" value={contactDetails.location} />
          </div>
        </div>

        <Motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-3xl border border-cyber-line bg-cyber-panel p-6 md:p-8"
          noValidate
          aria-label="Contact Cytroksys"
        >
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
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-violet px-5 py-3 text-sm font-semibold text-cyber-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Sending...' : 'Send Inquiry'}
          </button>

          {submitted ? (
            <p className="mt-4 text-sm text-emerald-300" role="status">
              Your request has been captured. Our team will reach out shortly.
            </p>
          ) : null}
        </Motion.form>
      </div>
    </section>
  )
}

function Detail({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-cyber-line bg-cyber-panel p-4">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-cyber-ink text-cyber-cyan">
        <IconResolver name={icon} className="h-4 w-4" />
      </span>
      <span>
        <p className="text-xs uppercase tracking-[0.14em] text-cyber-muted">{label}</p>
        <p className="mt-1 text-sm text-cyber-text">{value}</p>
      </span>
    </div>
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

