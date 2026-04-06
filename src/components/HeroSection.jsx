import { motion as Motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { companyProfile } from '../data/company'
import { IconResolver } from './IconResolver'

import HeroVisual from './HeroVisual'

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
      className="cyber-noise relative -mt-px overflow-hidden border-b border-cyber-line/70"
      aria-labelledby="hero-title"
    >
      <div className="hero-mesh pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="cyber-grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/70 to-transparent" aria-hidden="true" />

      <Motion.div
        style={{ x: orbX, y: orbY }}
        className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-cyber-cyan/20 blur-3xl"
        aria-hidden="true"
      />
      
      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-4 pb-14 pt-2 md:px-6 md:pb-20 md:pt-3 lg:grid lg:grid-cols-2 lg:items-start lg:gap-10 lg:pt-2">
        <div className="relative z-10 lg:pt-1">
          <Motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-cyber-line bg-cyber-panel/75 px-4 py-1.5 font-display text-[11px] uppercase tracking-[0.2em] text-cyber-cyan/90"
          >
            <IconResolver name="Sparkles" className="h-3.5 w-3.5" />
            Full-Service IT Solutions Company
          </Motion.p>

          <Motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 max-w-2xl font-display text-4xl leading-[1.05] tracking-tight text-cyber-text sm:text-5xl md:text-6xl lg:text-[4.1rem]"
          >
            Engineering the
            <span className="block bg-gradient-to-r from-cyber-cyan via-cyan-300 to-cyber-violet bg-clip-text text-transparent">
              Digital Future
            </span>
          </Motion.h1>

          <Motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-cyber-muted/95 md:text-lg"
          >
            {companyProfile.name} helps ambitious teams launch AI products, harden cloud systems, and scale faster with senior engineering support.
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
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-violet px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-cyber-ink shadow-glow transition hover:scale-105 hover:brightness-110 active:scale-95"
            >
              Explore Services
              <IconResolver name="ArrowRight" className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={openVyana}
              className="inline-flex items-center gap-2 rounded-full border border-cyber-line bg-cyber-panel/70 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-cyber-text transition hover:border-cyber-cyan/70 hover:bg-cyber-panel"
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
              <IconResolver name="BadgeCheck" className="h-4 w-4 text-cyber-cyan" />
              Dedicated Delivery Teams
            </span>
            <span className="inline-flex items-center gap-2">
              <IconResolver name="Clock3" className="h-4 w-4 text-cyber-cyan" />
              Fast Turnaround
            </span>
            <span className="inline-flex items-center gap-2">
              <IconResolver name="ShieldCheck" className="h-4 w-4 text-cyber-cyan" />
              Security-First Build
            </span>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 md:max-w-2xl"
          >
            <Stat label="Projects Delivered" value="50+" />
            <Stat label="Cloud Platforms" value="3" />
            <Stat label="Security Audit" value="100%" />
          </Motion.div>
        </div>

        <div className="mt-8 block lg:mt-2">
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}


function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-cyber-line bg-cyber-panel/75 p-4 backdrop-blur">
      <p className="font-display text-2xl text-cyber-text">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-cyber-muted">{label}</p>
    </div>
  )
}

