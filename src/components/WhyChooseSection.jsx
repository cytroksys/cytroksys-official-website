import { motion as Motion } from 'framer-motion'
import { valueProps } from '../data/company'
import { IconResolver } from './IconResolver'
import SectionHeading from './SectionHeading'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export default function WhyChooseSection() {
  return (
    <section className="cyber-noise border-y border-cyber-line/60 bg-cyber-panel/45 py-20" aria-labelledby="why-title">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Why Cytroksys"
          title="Secure. Scale. Succeed."
          description="Our delivery model combines proactive security with engineering execution so your roadmap stays fast, compliant, and resilient."
          align="center"
        />

        <Motion.div
          className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {valueProps.map((value) => (
            <Motion.article
              key={value.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="rounded-2xl border border-cyber-line bg-cyber-panel p-6"
            >
              <div
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyber-ink"
                style={{ color: value.accent }}
              >
                <IconResolver name={value.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg text-cyber-text">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cyber-muted/95">{value.description}</p>
            </Motion.article>
          ))}
        </Motion.div>
      </div>
    </section>
  )
}

