import { motion as Motion, useReducedMotion } from 'framer-motion'
import { FaAndroid, FaApple, FaAws, FaLinux, FaWindows } from 'react-icons/fa6'
import {
  SiCloudflare,
  SiDocker,
  SiGooglecloud,
  SiNodedotjs,
  SiReact,
  SiTypescript,
} from 'react-icons/si'
import { TbBrandAzure } from 'react-icons/tb'

const orbitItems = [
  { label: 'React', icon: SiReact, color: '#61DAFB', angle: -90 },
  { label: 'Node.js', icon: SiNodedotjs, color: '#339933', angle: -60 },
  { label: 'TypeScript', icon: SiTypescript, color: '#3178C6', angle: -30 },
  { label: 'Docker', icon: SiDocker, color: '#2496ED', angle: 0 },
  { label: 'Google Cloud', icon: SiGooglecloud, color: '#4285F4', angle: 30 },
  { label: 'Cloudflare Zero Trust', icon: SiCloudflare, color: '#F38020', angle: 60 },
  { label: 'Azure', icon: TbBrandAzure, color: '#0078D4', angle: 90 },
  { label: 'AWS', icon: FaAws, color: '#FF9900', angle: 120 },
  { label: 'Android', icon: FaAndroid, color: '#3DDC84', angle: 150 },
  { label: 'iOS', icon: FaApple, color: '#111827', angle: 180 },
  { label: 'Windows', icon: FaWindows, color: '#2563EB', angle: 210 },
  { label: 'Linux', icon: FaLinux, color: '#F59E0B', angle: 240 },
]

export default function HeroVisual() {
  const prefersReducedMotion = useReducedMotion()
  const orbitRadius = 240

  return (
    <div className="hero-visual-container relative flex h-[500px] w-full items-center justify-center overflow-visible sm:h-[550px] lg:h-[580px] lg:-mt-96">
      <Motion.div
        className="absolute h-96 w-96 rounded-full bg-cyber-cyan/15 blur-[100px]"
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.35, 0.6, 0.35] }}
        transition={prefersReducedMotion ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Motion.div
        className="absolute h-[30rem] w-[28rem] rounded-full bg-cyber-aurora/12 blur-[120px]"
        animate={prefersReducedMotion ? undefined : { scale: [1.06, 0.98, 1.06], opacity: [0.24, 0.45, 0.24] }}
        transition={prefersReducedMotion ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="hero-orbit-ring absolute h-[480px] w-[480px] rounded-full border border-cyber-line/70" />
        <div className="hero-orbit-ring-outer absolute h-[620px] w-[620px] rounded-full border border-cyber-line/45" />
      </div>

      <Motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={prefersReducedMotion ? undefined : { duration: 45, repeat: Infinity, ease: 'linear' }}
      >
        {orbitItems.map((item, index) => {
          const angle = (item.angle * Math.PI) / 180
          const x = Math.cos(angle) * orbitRadius
          const y = Math.sin(angle) * orbitRadius
          const Icon = item.icon

          return (
            <Motion.div
              key={item.label}
              className="absolute"
              initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
              animate={{ opacity: 1, scale: 1, x, y }}
              transition={{ duration: 0.55, delay: 0.12 + index * 0.05, ease: 'easeOut' }}
            >
              <div
                className="hero-tech-logo flex items-center justify-center"
                style={{ '--logo-color': item.color }}
                title={item.label}
                aria-label={item.label}
              >
                <Icon className="hero-tech-logo-icon" aria-hidden="true" />
              </div>
            </Motion.div>
          )
        })}
      </Motion.div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="hero-logo-aura absolute h-[20rem] w-[20rem] rounded-full md:h-[26rem] md:w-[26rem]" />
        <div className="hero-logo-aura hero-logo-aura-secondary absolute h-[24rem] w-[24rem] rounded-full md:h-[30rem] md:w-[30rem]" />
        <div className="relative z-20 flex flex-col items-center">
          <div className="hero-logo-core flex h-56 w-56 items-center justify-center rounded-full border-4 border-white bg-white/95 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.22)] ring-1 ring-cyber-cyan/20 sm:h-64 sm:w-64 sm:p-6 lg:h-[17rem] lg:w-[17rem] lg:p-7">
            <img
              src="/logo-hero.png"
              srcSet="/logo-hero.png 1x, /logo.png 2x"
              sizes="(min-width: 1024px) 400px, 300px"
              alt="Cytroksys"
              className="hero-logo-image h-full w-full rounded-full object-contain"
              style={{ animation: prefersReducedMotion ? 'none' : undefined }}
            />
          </div>
          {/* Tagline below logo */}
          <Motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-4 text-center"
          >
            <p className="hero-visual-tagline font-display text-lg font-bold tracking-tight text-slate-800 sm:text-xl lg:text-[1.35rem]">
              <span className="text-slate-900">Innovate</span>
              <span className="hero-title-gradient ml-1">Securely.</span>
              <span className="hero-title-gradient ml-1">Scale</span>
              <span className="hero-title-gradient ml-1">Faster.</span>
            </p>
          </Motion.div>
        </div>
      </div>
    </div>
  )
}
