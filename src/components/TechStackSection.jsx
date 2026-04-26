import { motion as Motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  Atom,
  BrainCircuit,
  Braces,
  Boxes,
  Cloud,
  Cpu,
  Database,
  FileCode2,
  Globe,
  Layers,
  Server,
  Workflow,
} from 'lucide-react'
import { techStack } from '../data/company'
import SectionHeading from './SectionHeading'

const iconMap = {
  Atom,
  Server,
  Braces,
  Globe,
  Cloud,
  Layers,
  Boxes,
  Workflow,
  BrainCircuit,
  Database,
  Cpu,
  FileCode2,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: 'easeOut' },
  },
}

const stackDescriptions = {
  Frontend: 'Responsive, conversion-aware UI systems built for fast iteration and clean handoff.',
  Backend: 'Reliable service layers, APIs, and runtime foundations designed to stay maintainable under growth.',
  Automation: 'Workflow scripting and operational tooling that remove repetitive work from delivery teams.',
  Cloud: 'Platform-ready cloud services for hosting, scaling, observability, and resilience.',
  Containers: 'Portable packaging for applications that need repeatable environments from local to production.',
  Orchestration: 'Cluster coordination and deployment automation for teams running modern distributed systems.',
  'AI/ML': 'Applied AI tooling for model workflows, experimentation, and production-ready intelligence features.',
  Database: 'Durable data layers built for query performance, reliability, and structured growth.',
  Caching: 'Latency reduction and workload smoothing for APIs, products, and session-heavy platforms.',
  Language: 'Strong typing and maintainable developer experience for product teams shipping at speed.',
}

export default function TechStackSection() {
  return (
    <section className="relative overflow-hidden border-y border-slate-100 bg-[#fdfeff] py-24 lg:py-32" aria-labelledby="stack-title">
      <div className="data-stream-bg absolute inset-0 opacity-[0.4]" />
      
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 relative z-10">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Modern Tools for Modern Problems"
          description="We combine proven frameworks with cloud-native tooling to ship secure systems that scale under real-world demand."
          align="center"
        />

        <Motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {techStack.map((tool) => (
            <TiltCard key={tool.name} tool={tool} />
          ))}
        </Motion.div>
      </div>
    </section>
  )
}

function TiltCard({ tool }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <Motion.article
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="perspective-1000 group relative flex min-h-[220px] flex-col overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur-md transition-colors hover:bg-white hover:border-[var(--stack-color)]"
    >
      <div 
        style={{ transform: "translateZ(50px)", "--stack-color": tool.color }} 
        className="relative z-10 flex h-full flex-col"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 shadow-inner ring-1 ring-slate-200/50 transition-transform group-hover:scale-110" style={{ color: tool.color }}>
              <StackIcon name={tool.icon} color={tool.color} />
            </div>
            <div>
              <p className="font-display text-lg font-black text-slate-900">{tool.name}</p>
              <div className="mt-1 flex items-center gap-1.5">
                <div className="h-1 w-1 rounded-full bg-emerald-500" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Production Ready</p>
              </div>
            </div>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:bg-[var(--stack-color)] group-hover:text-white transition-colors">
            {tool.category}
          </span>
        </div>

        <p className="mt-6 text-sm font-medium leading-relaxed text-slate-500 group-hover:text-slate-700">
          {stackDescriptions[tool.category] ?? 'Modern tooling selected for speed, reliability, and long-term maintainability.'}
        </p>

        <div className="mt-auto pt-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-100 group-hover:bg-[var(--stack-color)] opacity-30 transition-colors" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-900">Stack Active</span>
        </div>
      </div>

      {/* Decorative 3D elements */}
      <div 
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-10 blur-3xl transition-opacity group-hover:opacity-30" 
        style={{ background: tool.color, transform: "translateZ(-20px)" }} 
      />
    </Motion.article>
  )
}

function StackIcon({ name, color }) {
  const Icon = iconMap[name]
  if (!Icon) return <span className="font-display text-xs text-slate-900">TS</span>
  return <Icon size={28} style={{ color }} aria-hidden="true" />
}
