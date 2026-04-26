import { Link } from 'react-router-dom'
import { contactDetails, navItems, socialLinks } from '../data/company'
import { IconResolver } from './IconResolver'

const footerCapabilities = ['React product builds', 'Node API delivery', 'Cloud operations', 'Zero-trust security']

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-slate-100 bg-[#fdfeff] pt-24 pb-12" aria-labelledby="footer-title">
      {/* Visual Background Elements */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-sky-200 to-transparent opacity-50" />
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-sky-50/50 blur-3xl" />
      
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 relative z-10">
        <div className="grid gap-16 lg:grid-cols-12">
          
          {/* Brand Manifesto Column */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-4">
              <div className="h-12 w-12 rounded-full border border-slate-100 bg-white p-2 shadow-sm ring-1 ring-slate-100">
                <img src="/logo-nav.png" alt="Logo" className="h-full w-full object-contain" />
              </div>
              <div>
                <span className="block font-display text-2xl font-black tracking-tight text-slate-900">Cytroksys</span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-sky-600">Digital Infotech</span>
              </div>
            </Link>
            
            <p className="mt-8 max-w-md text-lg font-medium leading-relaxed text-slate-500">
              Engineering the digital future with zero-trust standards and founder-led technical excellence.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {footerCapabilities.map((capability) => (
                <span key={capability} className="rounded-full border border-slate-100 bg-slate-50/50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {capability}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation & Contact Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:grid-cols-3">
            <div>
              <h4 className="font-display text-xs font-black uppercase tracking-[0.2em] text-slate-900">Platform</h4>
              <ul className="mt-8 space-y-4">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="text-sm font-bold text-slate-500 transition hover:text-sky-600">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xs font-black uppercase tracking-[0.2em] text-slate-900">Connect</h4>
              <ul className="mt-8 space-y-4">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm font-bold text-slate-500 transition hover:text-sky-600">
                      <IconResolver name={link.icon} className="h-4 w-4" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-display text-xs font-black uppercase tracking-[0.2em] text-slate-900">Inquiries</h4>
              <div className="mt-8 space-y-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Main Office</span>
                  <p className="mt-2 text-sm font-bold text-slate-700">Pudukkottai, India</p>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Digital Desk</span>
                  <a href={`mailto:${contactDetails.email}`} className="mt-2 block text-sm font-bold text-slate-900 hover:text-sky-600 transition-colors">
                    {contactDetails.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Meta */}
        <div className="mt-24 flex flex-col items-center justify-between border-t border-slate-100 pt-12 md:flex-row gap-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            © {currentYear} Cytroksys Infotech. Engineered with precision.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Privacy Protocol</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Security Standards</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
