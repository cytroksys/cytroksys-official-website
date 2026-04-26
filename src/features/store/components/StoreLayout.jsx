import { Outlet } from 'react-router-dom'
import StoreHeader from './StoreHeader'
import StoreFooter from './StoreFooter'
import ScrollToTop from '../../../components/ScrollToTop'
import { useForceLightTheme } from '../../../hooks/useForceLightTheme'

export default function StoreLayout() {
  useForceLightTheme()

  return (
    <div className="store-theme-shell relative min-h-screen overflow-x-clip bg-cyber-ink text-cyber-text">
      <div className="mesh-grid-light pointer-events-none absolute inset-0 z-0 opacity-[0.15]" />
      <ScrollToTop />
      <StoreHeader />
      <main className="relative z-10">
        <Outlet />
      </main>
      <StoreFooter />
    </div>
  )
}
