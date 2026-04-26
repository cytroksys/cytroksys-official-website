import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { services } from '../data/company'
import { IconResolver } from './IconResolver'
import SectionHeading from './SectionHeading'

const deliveryPrinciples = [
  'Founder-led architecture',
  'Zero-trust security protocol',
  'Automated delivery pipelines',
  'Proactive system hardening',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function ServicesSection() {
  return (
    <section id="services" className="mx-auto w-full max-w-7xl px-4 py-28 md:px-6 lg:py-40" aria-labelledby="expertise-title">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        {/* Left Side: Manifesto */}
        <div className="lg:col-span-4">
          <div className="sticky top-28">
            <SectionHeading
              eyebrow="Our Expertise"
              title="Architecting Resilient Digital Systems"
              description="We specialize in the intersection of engineering and security. Our delivery tracks are designed for speed without sacrificing structural integrity."
              align="left"
            />

            <div className="mt-12 space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-sky-600/80">Engineering Core</p>
              {deliveryPrinciples.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
                  <span className="text-sm font-bold text-slate-700 tracking-tight">{item}</span>
                </div>
              ))}
            </div>

            <Link
              to="/services"
              className="brand-cta mt-12 inline-flex items-center gap-3"
            >
              Explore All Solutions
              <IconResolver name="ArrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Right Side: Expertise Grid */}
        <Motion.div
          className="grid gap-6 sm:grid-cols-2 lg:col-span-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
            <Motion.article
              key={service.key}
              variants={itemVariants}
              whileHover={{ y: -12, scale: 1.02 }}
              className="expertise-card vibrant-card-fill group cursor-pointer"
              style={{ '--service-accent': service.accent }}
            >
              <div className="flex h-full flex-col relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="track-index group-hover:text-slate-900 group-hover:opacity-100 transition-colors">TRACK_{String(index + 1).padStart(2, '0')}</span>
                    <div className="tech-spec-line mt-2" />
                  </div>
                  <Motion.div 
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-md ring-1 ring-slate-200/50 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.8)] group-hover:ring-offset-4" 
                    style={{ color: service.accent }}
                  >
                    <IconResolver name={service.icon} className="h-7 w-7" />
                  </Motion.div>
                </div>

                <h3 className="mt-8 font-display text-2xl font-black leading-tight text-slate-900 transition-colors">
                  {service.title}
                </h3>
                
                <p className="mt-4 text-sm font-medium leading-relaxed text-slate-500 group-hover:text-slate-700 transition-colors">
                  {service.summary}
                </p>

                <div className="mt-8 space-y-3 border-t border-slate-200/60 pt-8">
                  {service.bullets?.map((bullet) => (
                    <div key={bullet} className="flex items-center gap-3">
                      <Motion.div 
                        whileHover={{ scale: 2 }}
                        className="h-1.5 w-1.5 rounded-full bg-slate-300 transition-all group-hover:bg-[var(--service-accent)] group-hover:shadow-[0_0_8px_var(--service-accent)]" 
                      />
                      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider group-hover:text-slate-900 transition-colors">{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-10 flex items-center justify-between opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Technical Track Active</span>
                    <div className="h-1 w-1 animate-pulse rounded-full bg-[var(--service-accent)]" />
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg">
                    <IconResolver name="Plus" className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Motion.article>
          ))}
        </Motion.div>
      </div>
    </section>
  )
}
