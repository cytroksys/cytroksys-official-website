import { motion as Motion } from 'framer-motion'
import { IconResolver } from './IconResolver'

const techStack = [
  { name: 'Generative AI', icon: 'Bot', color: '#7B2FFF' },
  { name: 'AWS Cloud', icon: 'CloudCog', color: '#00F0FF' },
  { name: 'Kubernetes', icon: 'Network', color: '#326CE5' },
  { name: 'Edge Computing', icon: 'Scaling', color: '#FF8A3D' },
  { name: 'DevSecOps', icon: 'ShieldCheck', color: '#10B981' },
  { name: 'Scalable Engineering', icon: 'Code2', color: '#F59E0B' },
]

export default function TrustSection() {
  return (
    <section className="theme-sheen-cyan relative overflow-hidden border-y border-cyber-line/50 bg-cyber-panel/38 py-10">
      <div className="cyber-grid-overlay absolute inset-0 z-0 opacity-40" />
      
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-display text-[10px] uppercase tracking-[0.3em] text-cyber-muted/90"
        >
          Powering Digital Transformation with Industry Leaders
        </Motion.p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
          {techStack.map((tech, i) => (
            <Motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="trust-pill group inline-flex items-center gap-3 rounded-full px-4 py-3 transition duration-300"
              style={{ '--trust-accent': tech.color }}
            >
              <span className="trust-pill-icon inline-flex h-9 w-9 items-center justify-center rounded-full">
                <IconResolver name={tech.icon} className="h-4.5 w-4.5" style={{ color: tech.color }} />
              </span>
              <span className="font-display text-sm font-semibold tracking-wide text-cyber-text transition">
                {tech.name}
              </span>
            </Motion.div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-cyber-panel to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-cyber-panel to-transparent" />
    </section>
  )
}
