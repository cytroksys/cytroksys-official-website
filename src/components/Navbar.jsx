import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { navItems } from '../data/company'
import { IconResolver } from './IconResolver'

const linkClass = ({ isActive }) =>
  `navbar-link-pill relative inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
    isActive ? 'is-active text-white' : 'text-slate-500 hover:text-sky-600'
  }`

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Scrolled state for visual styling
      setScrolled(currentScrollY > 40)

      // Visibility state for hiding on scroll down, showing on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & not at the very top
        setIsVisible(false)
      } else {
        // Scrolling up
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <Motion.header
      initial={{ y: 0 }}
      animate={{ 
        y: isVisible ? 0 : -120,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ 
        duration: 0.4, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        {/* Brand Liquid Logo */}
        <Link 
          to="/" 
          className={`group flex items-center gap-4 rounded-[2rem] border border-slate-100 bg-white/80 p-2 pr-6 shadow-sm backdrop-blur-2xl transition-all duration-500 hover:shadow-xl hover:shadow-sky-500/10 ${scrolled ? 'scale-95' : 'scale-100'}`}
        >
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md ring-1 ring-slate-100">
            <div className="absolute inset-0 animate-pulse bg-sky-400/20" />
            <img 
              src="/logo-nav.png" 
              alt="Logo" 
              className="relative z-10 h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div>
            <p className="font-display text-sm font-black uppercase tracking-tight text-slate-900">
              Cytroksys
            </p>
            <div className="flex items-center gap-1.5">
              <div className="h-1 w-1 rounded-full bg-sky-500" />
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-sky-600">Infotech</p>
            </div>
          </div>
        </Link>

        {/* Floating Nav Shell */}
        <nav className={`navbar-nav-shell hidden items-center gap-2 rounded-full border border-slate-100 bg-white/60 p-1.5 backdrop-blur-2xl shadow-sm transition-all duration-500 md:flex ${scrolled ? 'translate-y-0 opacity-100' : 'translate-y-0 opacity-100'}`}>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {({ isActive }) => (
                <span className="relative z-10">
                  {item.label}
                  {isActive && (
                    <Motion.span
                      layoutId="nav-active-indicator"
                      className="absolute inset-0 -mx-5 -my-2.5 -z-10 rounded-full bg-slate-900 shadow-lg shadow-slate-900/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            className="group flex h-12 w-12 items-center justify-center rounded-[1.5rem] border border-slate-100 bg-white shadow-sm transition-all hover:bg-slate-50 hover:shadow-lg active:scale-95"
            aria-label="Toggle theme"
          >
            <Motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <IconResolver name={theme === 'dark' ? 'Sun' : 'Moon'} className="h-5 w-5 text-slate-700 group-hover:text-sky-600" />
            </Motion.div>
          </button>

          <Link
            to="/contact"
            className="group relative hidden h-12 items-center gap-3 overflow-hidden rounded-[1.5rem] bg-slate-900 px-6 text-xs font-black uppercase tracking-widest text-white shadow-lg transition-transform hover:scale-105 active:scale-95 sm:flex"
          >
            <span className="relative z-10">Get a Quote</span>
            <IconResolver name="ArrowRight" className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-sky-600 to-indigo-600 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>

          {/* Mobile Trigger */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-12 w-12 items-center justify-center rounded-[1.5rem] border border-slate-100 bg-white shadow-sm md:hidden"
          >
            <IconResolver name={open ? 'X' : 'Menu'} className="h-5 w-5 text-slate-900" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <Motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-x-4 top-full mt-4 rounded-[2.5rem] border border-slate-100 bg-white p-6 shadow-2xl backdrop-blur-3xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 text-sm font-black uppercase tracking-widest text-slate-900 transition-colors hover:bg-sky-50 hover:text-sky-600"
                >
                  {item.label}
                  <IconResolver name="ChevronRight" className="h-4 w-4 opacity-30" />
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-3 rounded-2xl bg-slate-900 p-4 text-xs font-black uppercase tracking-widest text-white"
              >
                Get a Quote
                <IconResolver name="ArrowRight" className="h-4 w-4" />
              </Link>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.header>
  )
}
