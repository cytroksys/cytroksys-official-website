import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { testimonials } from '../data/company'
import { IconResolver } from './IconResolver'
import SectionHeading from './SectionHeading'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: 'easeOut' },
  },
}

export default function TestimonialsSection() {
  return (
    <section className="cyber-noise border-y border-cyber-line/60 bg-cyber-panel/40 py-20" aria-labelledby="testimonials-title">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Voices of Success"
          title="Trusted by Teams That Move Fast"
          description="Our partners choose Cytroksys for clear communication, secure architecture, and dependable delivery under pressure."
          align="center"
        />

        <Motion.div
          className="mt-10 grid gap-5 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <Motion.article
              key={testimonial.name}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-3xl border border-cyber-line bg-cyber-panel p-6"
            >
              <span
                className="absolute bottom-0 left-0 top-0 w-1"
                style={{ background: testimonial.accent }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-45 blur-2xl"
                style={{ background: testimonial.accent }}
                aria-hidden="true"
              />
              <p className="relative text-3xl leading-none" style={{ color: testimonial.accent }}>
                "
              </p>
              <p className="relative mt-2 text-sm leading-relaxed text-cyber-muted/95">{testimonial.quote}</p>
              <div className="mt-6 border-t border-cyber-line pt-4">
                <p className="font-semibold text-cyber-text">{testimonial.name}</p>
                <p className="text-xs uppercase tracking-[0.14em] text-cyber-muted">{testimonial.role}</p>
              </div>
            </Motion.article>
          ))}
        </Motion.div>

        <div className="mt-12 rounded-3xl border border-cyber-cyan/40 bg-gradient-to-r from-cyber-panel to-cyber-panel-soft p-8 md:flex md:items-center md:justify-between">
          <div>
            <p className="font-display text-2xl text-cyber-text">Ready to Scale with Confidence?</p>
            <p className="mt-2 max-w-xl text-sm text-cyber-muted">
              Partner with Cytroksys to launch secure systems, streamline operations, and accelerate delivery across your digital roadmap.
            </p>
          </div>
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-violet px-6 py-3 text-sm font-semibold text-cyber-ink md:mt-0"
          >
            Get Started
            <IconResolver name="ArrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

