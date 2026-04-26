import { motion as Motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { companyProfile, founder, contactDetails } from '../data/company'
import { IconResolver } from './IconResolver'
import SectionHeading from './SectionHeading'

export default function AboutSection() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX / rect.width - 0.5)
    y.set(e.clientY / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <section id="about" className="relative overflow-hidden bg-[#fdfeff] py-28 lg:py-40" aria-labelledby="about-title">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 relative z-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          
          {/* Left Side: Content */}
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="The Human Element"
              title="Small Team. Massive Digital Impact."
              description={companyProfile.intro}
              align="left"
            />
            
            <div className="mt-10 space-y-6 text-base font-medium leading-relaxed text-slate-500">
              <p>
                We believe that premium engineering shouldn't be gated by massive overhead. Our boutique model allows us to partner deeply with founders, providing the same technical rigour as a global firm with the agility of a startup.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {[
                { label: 'Mission', text: companyProfile.mission, icon: 'Target', color: '#0ea5e9' },
                { label: 'Vision', text: companyProfile.vision, icon: 'Eye', color: '#14b8a6' }
              ].map((item) => (
                <div key={item.label} className="group relative rounded-[2rem] border border-slate-100 bg-white p-7 shadow-sm transition-all hover:shadow-xl hover:shadow-sky-500/5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-900 ring-1 ring-slate-100 group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors">
                    <IconResolver name={item.icon} className="h-5 w-5" />
                  </div>
                  <h4 className="mt-5 font-display text-sm font-black uppercase tracking-widest text-slate-900">{item.label}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Founder Narrative */}
          <div className="lg:col-span-5">
            <Motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="perspective-1000 relative"
            >
              <article className="relative overflow-hidden rounded-[3rem] border border-slate-200 bg-white p-10 shadow-2xl shadow-slate-200/50 backdrop-blur-xl">
                {/* Visual Accent */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-100/40 blur-3xl" />
                
                <div className="relative z-10" style={{ transform: 'translateZ(60px)' }}>
                  <div className="flex items-center gap-6">
                    <div className="relative h-28 w-28 shrink-0">
                      <div className="absolute inset-0 animate-pulse rounded-full bg-sky-400/20 blur-xl" />
                      <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white shadow-xl ring-1 ring-slate-100">
                        {founder.photo ? (
                          <img src={founder.photo} alt={founder.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-slate-900 text-2xl font-black text-white">
                            {founder.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-black text-slate-900">{founder.name}</h3>
                      <p className="mt-1 text-sm font-bold uppercase tracking-[0.2em] text-sky-600">{founder.role}</p>
                      <div className="mt-3 flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/50 px-3 py-1">
                        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-black uppercase text-emerald-700">Verified Founder</span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-10 text-xl font-medium italic leading-relaxed text-slate-600">
                    "{founder.bio}"
                  </p>

                  <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-8">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Direct Contact</span>
                        <a href={`mailto:${contactDetails.email}`} className="text-sm font-bold text-slate-900 hover:text-sky-600 transition-colors">
                          {contactDetails.email}
                        </a>
                      </div>
                      {founder.website && (
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Website</span>
                          <a href={`https://${founder.website}`} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-slate-900 hover:text-sky-600 transition-colors">
                            {founder.website}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="h-12 w-12 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center shadow-inner">
                      <IconResolver name="Shield" className="h-5 w-5 text-sky-600" />
                    </div>
                  </div>
                </div>

                {/* Founder Signature Stamp */}
                <Motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-8 right-8 opacity-[0.03] pointer-events-none"
                >
                   <svg width="120" height="120" viewBox="0 0 100 100">
                     <path id="circlePath" fill="none" d="M 10, 50 a 40,40 0 1,1 80,0 40,40 0 1,1 -80,0" />
                     <text className="text-[10px] font-black uppercase tracking-widest fill-current">
                       <textPath href="#circlePath">Founder Led • Quality Guaranteed • Founder Led •</textPath>
                     </text>
                   </svg>
                </Motion.div>
              </article>
            </Motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
