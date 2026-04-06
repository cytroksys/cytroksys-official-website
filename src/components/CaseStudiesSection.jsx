import { motion as Motion } from 'framer-motion'
import { caseStudies } from '../data/company'
import SectionHeading from './SectionHeading'

export default function CaseStudiesSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 md:px-6" aria-labelledby="case-studies-title">
      <SectionHeading
        eyebrow="Case Studies"
        title="Proof in Production"
        description="A snapshot of how Cytroksys teams help organizations modernize faster while improving security posture and reliability."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {caseStudies.map((item, index) => (
          <Motion.article
            key={item.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.07 }}
            className="rounded-3xl border border-cyber-line bg-cyber-panel p-6"
          >
            <p className="font-display text-lg text-cyber-text">{item.title}</p>
            <p className="mt-4 text-sm leading-relaxed text-cyber-muted">{item.outcome}</p>
            <p className="mt-6 inline-flex rounded-full border border-cyber-cyan/40 bg-cyber-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-cyber-cyan">
              {item.metrics}
            </p>
          </Motion.article>
        ))}
      </div>
    </section>
  )
}

