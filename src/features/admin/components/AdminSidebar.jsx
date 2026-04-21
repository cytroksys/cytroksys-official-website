import { NavLink, Link } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingCart, LogOut, Store } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'

const navLinks = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
]

export default function AdminSidebar() {
  const { logout } = useAuth()

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
      isActive
        ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-[0_10px_18px_rgba(59,130,246,0.25)]'
        : 'text-slate-600 hover:bg-sky-50 hover:text-slate-900'
    }`

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-sky-100 bg-white/90 backdrop-blur-sm md:flex">
      {/* Logo */}
      <div className="border-b border-sky-100 px-4 py-5">
        <Link to="/admin" className="flex items-center gap-2">
          <img src="/logo.png" alt="Cytroksys" className="h-8 w-8 rounded-full" />
          <div>
            <p className="font-display text-xs uppercase tracking-[0.14em] text-slate-900">
              Cytroksys
            </p>
            <p className="text-[10px] font-medium text-sky-700">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Workspace</p>
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
            <link.icon className="h-4 w-4" />
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer actions */}
      <div className="space-y-1 border-t border-sky-100 px-3 py-4">
        <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Shortcuts</p>
        <Link
          to="/store"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-sky-50 hover:text-slate-900"
        >
          <Store className="h-4 w-4" />
          View Store
        </Link>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-rose-500/90 transition hover:bg-rose-50 hover:text-rose-600"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
