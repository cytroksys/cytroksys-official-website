import { motion as Motion } from 'framer-motion'
import { valueProps } from '../data/company'
import { IconResolver } from './IconResolver'
import SectionHeading from './SectionHeading'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function WhyChooseSection() {
  return (
    <section className="relative overflow-hidden border-y border-slate-100 bg-white py-28 lg:py-40" aria-labelledby="why-title">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="data-stream-bg absolute inset-0 opacity-[0.03]" />
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-50/50 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 relative z-10">
        <SectionHeading
          eyebrow="The Manifest"
          title="Secure. Scale. Succeed."
          description="Our delivery model combines proactive security with engineering execution so your roadmap stays fast, compliant, and resilient."
          align="center"
        />

        <Motion.div
          className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {valueProps.map((value, index) => (
            <Motion.article
              key={value.title}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              className="group relative flex flex-col items-center text-center"
              style={{ '--value-accent': value.accent }}
            >
              {/* Icon Orb */}
              <div className="relative mb-8">
                <div 
                  className="absolute inset-0 animate-ping rounded-full opacity-0 group-hover:opacity-20" 
                  style={{ backgroundColor: value.accent, animationDuration: '3s' }} 
                />
                <div 
                  className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 text-slate-900 shadow-sm ring-1 ring-slate-100 transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:shadow-xl group-hover:ring-offset-8" 
                  style={{ color: value.accent, ringColor: value.accent }}
                >
                  <IconResolver name={value.icon} className="h-8 w-8" />
                </div>
                <div className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[10px] font-black text-white shadow-lg">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              <h3 className="font-display text-xl font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                {value.title}
              </h3>
              
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-500 group-hover:text-slate-600 transition-colors">
                {value.description}
              </p>

              <div className="mt-8 h-1 w-12 rounded-full bg-slate-100 group-hover:w-full group-hover:bg-sky-400 transition-all duration-500" />
              <span className="mt-4 text-[9px] font-black uppercase tracking-[0.25em] text-slate-300 group-hover:text-slate-900 transition-colors">
                Engagement Standard
              </span>
            </Motion.article>
          ))}
        </Motion.div>
      </div>
    </section>
  )
}
