import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import { useForceLightTheme } from '../../../hooks/useForceLightTheme'

export default function AdminLayout() {
  useForceLightTheme()

  return (
    <div className="admin-theme-shell relative flex min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-sky-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 bottom-0 h-56 w-56 rounded-full bg-indigo-300/20 blur-3xl" />
      <AdminSidebar />
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
        <AdminHeader />
        <main className="admin-scroll flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
