import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { services } from '../data/company'
import { IconResolver } from './IconResolver'
import SectionHeading from './SectionHeading'

const gridSpans = [
  'md:col-span-2',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-2',
  'md:col-span-1',
  'md:col-span-2',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
  },
}

export default function ServicesSection() {
  return (
    <section id="services" className="cyber-noise mx-auto w-full max-w-7xl px-4 py-24 md:px-6 md:py-32" aria-labelledby="services-title">
      <SectionHeading
        eyebrow="Our Expertise"
        title="AI-Powered Services, Built for Scale"
        description="From product engineering to zero-trust security, our teams deliver measurable outcomes with speed, transparency, and enterprise-grade reliability."
      />

      <Motion.div
        className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {services.map((service, index) => (
          <Motion.article
            key={service.key}
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className={`group glass-card relative flex flex-col overflow-hidden rounded-[2rem] border border-cyber-line/60 p-8 transition-all duration-300 hover:border-cyber-cyan/50 hover:shadow-glow/20 ${gridSpans[index]}`}
            style={{ '--service-accent': service.accent }}
          >
            <div
              className="absolute -right-20 -top-20 h-44 w-44 rounded-full blur-[80px] transition-opacity duration-500 group-hover:opacity-100 opacity-40"
              style={{ background: service.accent }}
            />
            
            <div className="relative z-10 flex h-full flex-col">
              <div
                className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-cyber-line bg-cyber-panel-soft shadow-inner transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110"
                style={{ color: service.accent }}
              >
                <IconResolver name={service.icon} className="h-6 w-6" />
              </div>
              
              <h3 className="mt-8 font-display text-2xl font-bold text-cyber-text tracking-tight">{service.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-cyber-muted/90">{service.summary}</p>
              
              <div className="mt-auto pt-8">
                <ul className="flex flex-wrap gap-2">
                  {service.bullets.map((item) => (
                    <li 
                      key={item} 
                      className="rounded-full border border-cyber-line bg-cyber-ink/40 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyber-muted transition-colors group-hover:border-cyber-cyan/30 group-hover:text-cyber-text"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Motion.article>
        ))}
      </Motion.div>

      <div className="mt-10 flex justify-center md:justify-start">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 rounded-full border border-cyber-line bg-cyber-panel px-6 py-3 text-sm font-semibold text-cyber-text transition hover:border-cyber-cyan"
        >
          Book a Free Audit
          <IconResolver name="ArrowRight" className="h-4 w-4 text-cyber-cyan" />
        </Link>
      </div>
    </section>
  )
}

