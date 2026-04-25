import { motion as Motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { companyProfile } from '../data/company'
import { IconResolver } from './IconResolver'
import AnimatedCounter from './AnimatedCounter'

import HeroVisual from './HeroVisual'

const heroStats = [
  { icon: 'Code2', value: '25', suffix: '+', label: 'Projects', detail: 'Delivered', accent: '#2563EB' },
  { icon: 'Clock3', value: companyProfile.founded, label: 'Founded', detail: 'Built in India', staticValue: true, accent: '#0EA5E9' },
  { icon: 'CloudCog', value: '3', label: 'Cloud', detail: 'Platform Support', accent: '#0F766E' },
  { icon: 'ShieldCheck', value: '100', suffix: '%', label: 'Client', detail: 'Satisfaction Focus', accent: '#F97316' },
]

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  const orbX = useTransform(pointerX, [-300, 300], [-20, 20])
  const orbY = useTransform(pointerY, [-200, 200], [-18, 18])

  const onMove = (event) => {
    if (prefersReducedMotion) {
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set(event.clientX - (bounds.left + bounds.width / 2))
    pointerY.set(event.clientY - (bounds.top + bounds.height / 2))
  }

  const scrollToServices = () => {
    const section = document.getElementById('services')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const openVyana = () => {
    window.dispatchEvent(new CustomEvent('open-vyana-chat'))
  }

  return (
    <section
      onMouseMove={onMove}
      className="home-hero-stage hero-tone-sunset relative -mt-px overflow-hidden border-b border-cyber-line/55"
      aria-labelledby="hero-title"
    >
      <div className="hero-accent-line pointer-events-none absolute inset-x-0 top-0 h-px" aria-hidden="true" />

      <Motion.div
        style={{ x: orbX, y: orbY }}
        className="hero-accent-orb pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full blur-3xl"
        aria-hidden="true"
      />
      
      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-4 pb-14 pt-2 md:px-6 md:pb-20 md:pt-3 lg:grid lg:grid-cols-2 lg:items-start lg:gap-10 lg:pt-2">
        <div className="relative z-10 lg:pt-1">
          <Motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-eyebrow-chip inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 font-display text-[11px] uppercase tracking-[0.2em]"
          >
            <IconResolver name="Sparkles" className="h-3.5 w-3.5 text-cyber-cyan" />
            Web, AI, Cloud & Cybersecurity
          </Motion.p>

          <Motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 max-w-2xl font-display text-4xl leading-[1.02] tracking-tight text-cyber-text sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          >
            Build Secure
            <span className="hero-title-gradient block">Digital Products</span>
            Faster
          </Motion.h1>

          <Motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-cyber-muted/95 md:text-lg"
          >
            {companyProfile.name} designs websites, AI workflows, cloud platforms, and security systems for teams that need speed without fragile infrastructure.
          </Motion.p>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={scrollToServices}
              className="hero-cta brand-cta premium-shimmer inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-cyber-ink shadow-glow transition hover:scale-105 active:scale-95"
            >
              Explore Services
              <IconResolver name="ArrowRight" className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={openVyana}
              className="hero-secondary-cta surface-panel inline-flex items-center gap-2 rounded-full border border-cyber-line bg-cyber-panel/72 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-cyber-text transition"
            >
              Start with Vyana
              <IconResolver name="Bot" className="h-4 w-4" />
            </button>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs uppercase tracking-[0.16em] text-cyber-muted"
          >
            <span className="inline-flex items-center gap-2">
              <IconResolver name="BadgeCheck" className="hero-feature-icon h-4 w-4" />
              Fixed-Scope Builds
            </span>
            <span className="inline-flex items-center gap-2">
              <IconResolver name="Clock3" className="hero-feature-icon h-4 w-4" />
              Fast Turnaround
            </span>
            <span className="inline-flex items-center gap-2">
              <IconResolver name="ShieldCheck" className="hero-feature-icon h-4 w-4" />
              Security-First Delivery
            </span>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="hero-stat-grid mt-9 grid grid-cols-2 gap-3 sm:gap-4 md:max-w-2xl"
          >
            {heroStats.map((stat, index) => (
              <Stat key={`${stat.label}-${stat.detail}`} index={index} {...stat} />
            ))}
          </Motion.div>
        </div>

        <div className="mt-8 block lg:mt-2">
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}


function Stat({ icon, label, detail, value, suffix = '', staticValue = false, accent, index }) {
  return (
    <Motion.article
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: 0.36 + index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.015 }}
      className="stat-card hero-stat-card group relative overflow-hidden rounded-[1.65rem] border border-cyber-line/50 bg-cyber-panel p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all"
      style={{ '--stat-accent': accent }}
    >
      <div className="hero-stat-glow absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" aria-hidden="true" />
      <div className="relative z-10 flex items-start gap-3">
        <span className="hero-stat-icon inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
          <IconResolver name={icon} className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <span className="hero-stat-value block font-display text-[1.95rem] font-extrabold leading-none tracking-tight text-cyber-text">
            {staticValue ? value : <AnimatedCounter end={value} suffix={suffix} duration={1100} />}
          </span>
          <span className="mt-2 block text-[12px] font-bold uppercase tracking-[0.12em] text-cyber-text/90">{label}</span>
          <span className="hero-stat-detail mt-0.5 block text-[12px] font-medium text-cyber-muted">{detail}</span>
        </span>
      </div>
    </Motion.article>
  )
}
