import { Link } from 'react-router-dom'
import { ShieldCheck, Store } from 'lucide-react'

export default function StoreHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-sky-100 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="group inline-flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Cytroksys Logo"
            className="site-logo-clean h-9 w-9 rounded-full object-contain"
          />
          <div className="hidden sm:block">
            <p className="font-display text-sm uppercase tracking-[0.16em] text-slate-900">
              Cytroksys
            </p>
            <p className="text-[10px] text-sky-700">Infotech</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-sky-200 bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 sm:inline-flex">
            <Store className="h-3 w-3" />
            Digital Store
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            <ShieldCheck className="h-3 w-3" />
            Authorized Reseller
          </span>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm text-slate-600 transition hover:text-slate-900">
            Home
          </Link>
          <Link to="/store" className="text-sm font-semibold text-sky-600">
            Store
          </Link>
          <Link to="/contact" className="text-sm text-slate-600 transition hover:text-slate-900">
            Support
          </Link>
        </nav>
      </div>
    </header>
  )
}
