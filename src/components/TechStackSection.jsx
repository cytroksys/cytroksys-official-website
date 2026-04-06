import { motion as Motion } from 'framer-motion'
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
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
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

export default function TechStackSection() {
  return (
    <section className="cyber-noise border-y border-cyber-line/60 py-20" aria-labelledby="stack-title">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
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
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {techStack.map((tool) => (
            <Motion.article
              key={tool.name}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="tech-tile group relative overflow-hidden rounded-2xl border border-cyber-line p-5"
              style={{ '--stack-color': tool.color }}
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-30 blur-2xl transition duration-300 group-hover:opacity-60" style={{ background: tool.color }} />
              <div className="relative flex items-center gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-cyber-line bg-cyber-panel-soft text-2xl">
                  <StackIcon name={tool.icon} color={tool.color} />
                </div>
                <div>
                  <p className="font-display text-base text-cyber-text">{tool.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-cyber-muted">{tool.category}</p>
                </div>
              </div>
            </Motion.article>
          ))}
        </Motion.div>
      </div>
    </section>
  )
}

function StackIcon({ name, color }) {
  const Icon = iconMap[name]

  if (!Icon) {
    return <span className="font-display text-xs text-cyber-text">TS</span>
  }

  return <Icon style={{ color }} aria-hidden="true" />
}

