import { motion as Motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import { companyProfile, founder, valueProps } from '../data/company'
import { IconResolver } from '../components/IconResolver'

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Built by Engineers. Trusted by Operators."
        description="Cytroksys Infotech was founded to bridge startup velocity with enterprise-grade engineering discipline."
      />

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1.1fr_1fr] md:px-6">
        <Motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl border border-cyber-line bg-cyber-panel p-7"
        >
          <h2 className="font-display text-2xl text-cyber-text">Our Story</h2>
          <p className="mt-4 text-sm leading-relaxed text-cyber-muted">{companyProfile.intro}</p>
          <p className="mt-4 text-sm leading-relaxed text-cyber-muted">Mission: {companyProfile.mission}</p>
          <p className="mt-4 text-sm leading-relaxed text-cyber-muted">Vision: {companyProfile.vision}</p>
        </Motion.div>

        <Motion.article
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="rounded-3xl border border-cyber-line bg-cyber-panel p-7"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyber-cyan/30 to-cyber-violet/40 font-display text-xl text-cyber-text">
              SP
            </div>
            <div>
              <h2 className="font-display text-xl text-cyber-text">{founder.name}</h2>
              <p className="text-sm text-cyber-cyan">{founder.role}</p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-cyber-muted">{founder.bio}</p>
        </Motion.article>
      </section>

      <section className="border-y border-cyber-line/60 bg-cyber-panel/40 py-16">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <h2 className="font-display text-3xl text-cyber-text">What Sets Us Apart</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((value, index) => (
              <Motion.article
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="rounded-2xl border border-cyber-line bg-cyber-panel p-6"
              >
                <IconResolver name={value.icon} className="h-5 w-5 text-cyber-cyan" />
                <h3 className="mt-4 font-display text-lg text-cyber-text">{value.title}</h3>
                <p className="mt-2 text-sm text-cyber-muted">{value.description}</p>
              </Motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

