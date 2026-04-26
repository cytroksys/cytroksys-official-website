import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { testimonials } from '../data/company'
import { IconResolver } from './IconResolver'
import SectionHeading from './SectionHeading'

const trustSignals = [
  'Clear delivery',
  'Security-first',
  'Fast support',
  'Operational clarity',
]

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

const vibrantColors = [
  '#6366f1', // Electric Indigo
  '#ec4899', // Vivid Pink
  '#06b6d4', // Neon Teal
  '#84cc16', // Lime Green
]

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden border-y border-slate-100 bg-[#fdfeff] py-24 lg:py-32" aria-labelledby="testimonials-title">
      {/* Background patterns */}
      <div className="mesh-grid-light absolute inset-0 opacity-20" />
      
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 relative z-10">
        <SectionHeading
          eyebrow="Voices of Success"
          title="Engineering Trusted Partnerships"
          description="We deliver more than just code; we provide the operational stability that allows our partners to focus on growth."
          align="center"
        />

        <Motion.div
          className="testimonial-grid mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {testimonials.map((testimonial, index) => {
            const color = vibrantColors[index % vibrantColors.length]
            return (
              <Motion.article
                key={testimonial.name}
                variants={itemVariants}
                className="testimonial-bubble group"
                style={{ '--testimonial-color': color }}
              >
                {/* Background watermarked quote */}
                <div className="absolute -right-6 -top-6 z-0 opacity-[0.03] transition-all duration-700 group-hover:-rotate-12 group-hover:scale-110 group-hover:opacity-[0.08]">
                  <IconResolver name="Quote" className="h-48 w-48 fill-current text-[var(--testimonial-color)]" />
                </div>

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-8 flex items-center justify-between">
                      <div className="testimonial-quote-icon transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                        <IconResolver name="Quote" className="h-5 w-5 fill-current" />
                      </div>
                      
                      {/* Animated rating stars */}
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 + i * 0.05, type: 'spring' }}
                          >
                            <IconResolver name="Star" className="h-4 w-4 fill-[#fbbf24] text-[#fbbf24] transition-transform duration-300 hover:scale-125" />
                          </Motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <p className="relative text-lg font-medium leading-relaxed text-slate-700 transition-colors group-hover:text-slate-900">
                      <span className="absolute -left-3 -top-2 text-3xl opacity-20 text-[var(--testimonial-color)]">"</span>
                      {testimonial.quote}
                      <span className="absolute -bottom-4 -right-1 text-3xl opacity-20 text-[var(--testimonial-color)]">"</span>
                    </p>
                  </div>

                  <div className="mt-10 flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 backdrop-blur-sm transition-all duration-500 group-hover:border-[var(--testimonial-color)]/30 group-hover:bg-white/80 group-hover:shadow-sm">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-800 to-slate-900 text-lg font-black text-white shadow-md ring-2 ring-white">
                      {testimonial.name.charAt(0)}
                      {/* Pulse ring on hover */}
                      <div className="absolute inset-0 -z-10 animate-ping rounded-full border-2 border-[var(--testimonial-color)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    </div>
                    <div>
                      <p className="font-display text-base font-black text-slate-900 transition-colors group-hover:text-[var(--testimonial-color)]">{testimonial.name}</p>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 opacity-80 transition-opacity group-hover:opacity-100">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </Motion.article>
            )
          })}
        </Motion.div>

        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="vibrant-glow-hover group relative mt-20 overflow-hidden rounded-[3rem] bg-slate-900 p-10 md:p-14 text-center md:text-left"
          style={{ '--fill-color': '#0ea5e9' }}
        >
          <div className="relative z-10 md:flex md:items-center md:justify-between gap-10">
            <div>
              <h3 className="font-display text-3xl font-black text-white md:text-4xl">Ready to architect your future?</h3>
              <p className="mt-4 max-w-xl text-lg text-slate-400 leading-relaxed">
                Join the network of high-growth companies leveraging our zero-trust engineering standards.
              </p>
            </div>
            <div className="mt-10 flex shrink-0 flex-wrap items-center justify-center gap-4 md:mt-0">
              <div className="hidden lg:flex -space-x-3 overflow-hidden">
                {vibrantColors.map((c, i) => (
                  <div key={i} className="inline-block h-10 w-10 rounded-full border-2 border-slate-900" style={{ backgroundColor: c }} />
                ))}
              </div>
              <Link
                to="/contact"
                className="group relative flex h-14 items-center gap-3 rounded-full bg-white px-8 text-sm font-bold text-slate-900 transition-transform hover:scale-105 active:scale-95"
              >
                Start Your Track
                <IconResolver name="ArrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          
          {/* Background light streak */}
          <div className="absolute -left-1/4 -top-1/2 h-full w-full rotate-45 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-3xl" />
        </Motion.div>
      </div>
    </section>
  )
}

