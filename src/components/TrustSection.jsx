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
    <section className="relative overflow-hidden border-y border-cyber-line/50 bg-cyber-ink py-10">
      <div className="absolute inset-0 z-0 bg-cyber-grid-overlay opacity-10" />
      
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-display text-[10px] uppercase tracking-[0.3em] text-cyber-muted/70"
        >
          Powering Digital Transformation with Industry Leaders
        </Motion.p>

        <div className="mt-8 flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 group">
          {techStack.map((tech, i) => (
            <Motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.1, opacity: 1 }}
              className="flex items-center gap-2 grayscale transition duration-300 hover:grayscale-0 hover:text-cyber-text"
            >
              <IconResolver name={tech.icon} className="h-5 w-5" style={{ color: tech.color }} />
              <span className="font-display text-sm font-semibold tracking-wide text-cyber-muted transition group-hover:text-cyber-muted hover:!text-cyber-text">
                {tech.name}
              </span>
            </Motion.div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-cyber-ink to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-cyber-ink to-transparent z-10" />
    </section>
  )
}
