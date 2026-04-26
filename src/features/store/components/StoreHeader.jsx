import { Link } from 'react-router-dom'
import { ShieldCheck, Store } from 'lucide-react'

export default function StoreHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-sky-100/50 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" className="group inline-flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-sky-400/20 blur-md" />
            <img
              src="/logo.png"
              alt="Cytroksys Logo"
              className="site-logo-clean relative z-10 h-10 w-10 rounded-full object-contain transition-transform group-hover:scale-110"
            />
          </div>
          <div className="hidden sm:block">
            <p className="font-display text-base font-black uppercase tracking-tight text-slate-900">
              Cytroksys
            </p>
            <p className="text-[10px] font-bold text-sky-600 uppercase tracking-widest">Infotech</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 rounded-full border border-sky-200/60 bg-sky-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wide text-sky-700 sm:inline-flex shadow-sm">
            <Store className="h-3.5 w-3.5" />
            Digital Store
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700 shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5" />
            Authorized Partner
          </span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-xs font-bold uppercase tracking-widest text-slate-500 transition hover:text-sky-600">
            Home
          </Link>
          <Link to="/store" className="relative text-xs font-bold uppercase tracking-widest text-sky-600">
            Store
            <div className="absolute -bottom-1 left-0 h-0.5 w-full bg-sky-600" />
          </Link>
          <Link to="/contact" className="text-xs font-bold uppercase tracking-widest text-slate-500 transition hover:text-sky-600">
            Support
          </Link>
        </nav>
      </div>
    </header>
  )
}
