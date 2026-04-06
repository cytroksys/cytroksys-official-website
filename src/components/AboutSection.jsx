import { motion as Motion } from 'framer-motion'
import { companyProfile, founder } from '../data/company'
import SectionHeading from './SectionHeading'

export default function AboutSection() {
  return (
    <section id="about" className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 md:grid-cols-[1.2fr_1fr] md:px-6" aria-labelledby="about-title">
      <div>
        <SectionHeading
          eyebrow="About Us"
          title="Small Team. Big Impact."
          description={companyProfile.intro}
        />
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-cyber-muted md:text-base">
          <p>
            We partner with founders and IT leaders to build digital systems that are secure by design and optimized for growth. Every engagement is outcome-driven and engineered for long-term maintainability.
          </p>
          <p>
            Mission: {companyProfile.mission}
          </p>
          <p>
            Vision: {companyProfile.vision}
          </p>
        </div>
      </div>

      <Motion.article
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-3xl border border-cyber-line p-7"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-cyber-cyan/60 bg-gradient-to-br from-cyber-cyan/30 to-cyber-violet/40 font-display text-lg text-cyber-text">
            SP
          </div>
          <div>
            <p className="font-display text-xl text-cyber-text">{founder.name}</p>
            <p className="text-sm text-cyber-cyan">{founder.role}</p>
          </div>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-cyber-muted">{founder.bio}</p>
      </Motion.article>
    </section>
  )
}

