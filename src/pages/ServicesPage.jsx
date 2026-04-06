import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { services } from '../data/company'
import { IconResolver } from '../components/IconResolver'

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Enterprise-Grade Services"
        description="From AI automation to zero-trust infrastructure, Cytroksys helps teams build, secure, and scale with operational confidence."
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service, index) => (
            <Motion.article
              key={service.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-3xl border border-cyber-line bg-cyber-panel p-7"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyber-line bg-cyber-ink text-cyber-cyan">
                <IconResolver name={service.icon} className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-2xl text-cyber-text">{service.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-cyber-muted">{service.summary}</p>
              <ul className="mt-5 space-y-2 text-sm text-cyber-text">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </Motion.article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-cyber-line bg-cyber-panel-soft p-8 text-center">
          <p className="font-display text-2xl text-cyber-text">Need a security-first implementation partner?</p>
          <p className="mt-3 text-sm text-cyber-muted">
            Let us map your current architecture, identify risk points, and design a phased action plan.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-violet px-6 py-3 text-sm font-semibold text-cyber-ink"
          >
            Book a Free Audit
            <IconResolver name="ArrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}

