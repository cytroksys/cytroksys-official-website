import { Link } from 'react-router-dom'
import { companyProfile, contactDetails, navItems, socialLinks } from '../data/company'
import { IconResolver } from './IconResolver'

export default function Footer() {
  return (
    <footer className="border-t border-cyber-line bg-cyber-panel/80">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-6">
        <div>
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <img src="/logo.png" alt="Cytroksys Logo" className="h-10 w-10 rounded-full" />
            <span className="font-display text-xl tracking-tight text-cyber-text">Cytroksys</span>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-cyber-muted">
            Enterprise-grade digital solutions for teams that need to ship fast without compromising reliability or security.
          </p>
          <div className="mt-6 flex flex-col gap-1 text-sm text-cyber-text">
            <span>{contactDetails.email}</span>
            <span>{contactDetails.phone}</span>
          </div>
        </div>

        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-cyber-cyan">Navigation</p>
          <ul className="mt-4 space-y-3 text-sm">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-cyber-muted transition hover:text-cyber-text">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-cyber-cyan">Follow</p>
          <div className="mt-4 flex items-center gap-3">
            {socialLinks.map((link) => {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${link.label}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyber-line bg-cyber-ink text-cyber-muted transition hover:border-cyber-cyan hover:text-cyber-cyan"
                >
                  <IconResolver name={link.icon} className="h-4 w-4" />
                </a>
              )
            })}
          </div>
          <p className="mt-4 text-sm text-cyber-muted">Visit: suryaprakashinfo.in</p>
        </div>
      </div>

      <div className="border-t border-cyber-line/80 px-4 py-4 text-center text-xs text-cyber-muted md:px-6">
        © 2025 Cytroksys Infotech. All rights reserved.
      </div>
    </footer>
  )
}

