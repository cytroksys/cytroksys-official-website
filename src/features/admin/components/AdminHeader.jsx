import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, LogOut, LayoutDashboard, Package, ShoppingCart, Store } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'

export default function AdminHeader() {
  const { adminProfile, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="flex items-center justify-between border-b border-sky-100 bg-white/95 px-4 py-3 backdrop-blur-sm md:px-6">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(true)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-sky-200 text-slate-600 md:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="hidden md:block" />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-medium text-slate-900">
              {adminProfile?.displayName || adminProfile?.email || 'Admin'}
            </p>
            <p className="text-[10px] text-slate-500">Administrator</p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 text-xs font-semibold text-white shadow-[0_8px_14px_rgba(59,130,246,0.35)]">
            {(adminProfile?.displayName || adminProfile?.email || 'A')[0].toUpperCase()}
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-slate-900/35"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative flex h-full w-64 flex-col border-r border-sky-100 bg-white">
            <div className="flex items-center justify-between border-b border-sky-100 px-4 py-4">
              <Link to="/admin" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <img src="/logo.png" alt="Cytroksys" className="h-8 w-8 rounded-full" />
                <span className="font-display text-xs text-slate-900">Admin</span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="text-slate-500">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-4">
              {[
                { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
                { to: '/admin/products', label: 'Products', icon: Package },
                { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
              ].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white'
                        : 'text-slate-600 hover:bg-sky-50 hover:text-slate-900'
                    }`
                  }
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="space-y-1 border-t border-sky-100 px-3 py-4">
              <Link
                to="/store"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600"
              >
                <Store className="h-4 w-4" />
                View Store
              </Link>
              <button
                onClick={() => { logout(); setMobileOpen(false) }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-rose-500"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
