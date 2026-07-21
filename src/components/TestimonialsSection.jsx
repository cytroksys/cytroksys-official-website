import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { testimonials } from '../data/company'
import { IconResolver } from './IconResolver'
import SectionHeading from './SectionHeading'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden border-y border-cyber-line bg-cyber-ink py-24 lg:py-32" aria-labelledby="testimonials-title">
      <div className="mesh-grid-light absolute inset-0 opacity-20" />

      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 relative z-10">
        <SectionHeading
          eyebrow="Voices of Success"
          title="Engineering Trusted Partnerships"
          description="We deliver more than just code; we provide the operational stability that allows our partners to focus on growth."
          align="center"
        />

        <Motion.div
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="group relative mt-20 overflow-hidden rounded-[3rem] border border-cyber-line bg-gradient-to-br from-cyber-panel to-cyber-ink p-10 shadow-lg md:p-14 text-center md:text-left"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/[0.03] to-transparent pointer-events-none" />
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyber-cyan/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 md:flex md:items-center md:justify-between gap-10">
            <div>
              <h3 className="font-display text-3xl font-black text-cyber-text md:text-4xl">Ready to architect your future?</h3>
              <p className="mt-4 max-w-xl text-lg text-cyber-muted leading-relaxed">
                Join the network of high-growth companies leveraging our zero-trust engineering standards.
              </p>
            </div>
            <div className="mt-10 flex shrink-0 flex-wrap items-center justify-center gap-4 md:mt-0">
              <Link
                to="/contact"
                className="group relative inline-flex h-14 items-center gap-3 rounded-full bg-cyber-cyan px-8 text-sm font-bold text-white shadow-lg shadow-cyber-cyan/20 transition-all hover:scale-105 hover:shadow-xl hover:shadow-cyber-cyan/30 active:scale-95"
              >
                Start Your Track
                <IconResolver name="ArrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="absolute -left-1/4 -top-1/2 h-full w-full rotate-45 bg-gradient-to-r from-transparent via-cyber-cyan/[0.03] to-transparent blur-3xl pointer-events-none" />
        </Motion.div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial, index }) {
  const { name, role, accent, quote } = testimonial
  const initial = name.charAt(0)

  return (
    <Motion.article
      variants={itemVariants}
      className="group relative flex flex-col rounded-[2rem] border border-cyber-line bg-cyber-panel/50 p-6 shadow-sm backdrop-blur-xl transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
      style={{ '--card-accent': accent }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at 50% 0%, color-mix(in srgb, ${accent} 12%, transparent), transparent 50%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-5">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
            style={{ background: `color-mix(in srgb, ${accent} 15%, transparent)`, color: accent }}
          >
            <IconResolver name="Quote" className="h-4 w-4" />
          </div>

          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        <p className="text-base leading-relaxed text-cyber-text flex-1">
          <span className="text-[var(--card-accent)] opacity-40 text-lg leading-none">"</span>
          {quote}
          <span className="text-[var(--card-accent)] opacity-40 text-lg leading-none">"</span>
        </p>

        <div className="mt-6 pt-5 border-t border-cyber-line/50 flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black shadow-md"
            style={{
              background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 30%, transparent), color-mix(in srgb, ${accent} 10%, transparent))`,
              color: accent,
            }}
          >
            {initial}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-black text-cyber-text truncate">{name}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-cyber-muted truncate">{role}</p>
          </div>
        </div>
      </div>
    </Motion.article>
  )
}
