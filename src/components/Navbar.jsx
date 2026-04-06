import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { navItems } from '../data/company'
import { IconResolver } from './IconResolver'

const linkClass = ({ isActive }) =>
  `relative text-sm font-medium transition ${
    isActive ? 'text-cyber-cyan' : 'text-cyber-muted hover:text-cyber-text'
  }`

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-cyber-line/70 bg-cyber-ink/75 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" aria-label="Go to Cytroksys homepage" className="group inline-flex items-center gap-3">
          <div className="relative">
            <img 
              src="/logo.png" 
              alt="Cytroksys Logo" 
              className="h-10 w-10 object-contain rounded-full shadow-glow"
            />
            <span className="absolute -inset-1 -z-10 rounded-full bg-cyber-cyan/20 blur-md transition group-hover:bg-cyber-violet/30" />
          </div>
          <div className="hidden sm:block">
            <p className="font-display text-sm uppercase tracking-[0.16em] text-cyber-text">Cytroksys</p>
            <p className="text-xs text-cyber-muted">Infotech</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyber-line bg-cyber-panel text-cyber-text transition hover:border-cyber-cyan"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <IconResolver name={theme === 'dark' ? 'Sun' : 'Moon'} className="h-4 w-4" />
          </button>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-violet px-5 py-2.5 text-sm font-semibold text-cyber-ink transition hover:brightness-110"
          >
            Get a Quote
            <IconResolver name="ArrowRight" className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyber-line bg-cyber-panel text-cyber-text md:hidden"
        >
          <IconResolver name={open ? 'X' : 'Menu'} className="h-4 w-4" />
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <Motion.nav
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="overflow-hidden border-t border-cyber-line bg-cyber-panel/95 px-4 pb-4 pt-3 md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyber-line bg-cyber-ink text-cyber-text"
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  <IconResolver name={theme === 'dark' ? 'Sun' : 'Moon'} className="h-4 w-4" />
                </button>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-violet px-5 py-2.5 text-sm font-semibold text-cyber-ink"
                >
                  Get a Quote
                  <IconResolver name="ArrowRight" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

