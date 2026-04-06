import { motion as Motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <Motion.header
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={align === 'center' ? 'text-center' : 'text-left'}
    >
      {eyebrow ? (
        <p className="font-display text-xs uppercase tracking-[0.24em] text-cyber-cyan/80">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 font-display text-3xl leading-tight text-cyber-text md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cyber-muted md:text-base">
          {description}
        </p>
      ) : null}
    </Motion.header>
  )
}

