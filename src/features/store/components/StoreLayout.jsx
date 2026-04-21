import { Outlet } from 'react-router-dom'
import StoreHeader from './StoreHeader'
import StoreFooter from './StoreFooter'
import ScrollToTop from '../../../components/ScrollToTop'
import { useForceLightTheme } from '../../../hooks/useForceLightTheme'

export default function StoreLayout() {
  useForceLightTheme()

  return (
    <div className="store-theme-shell relative min-h-screen overflow-x-clip bg-cyber-ink text-cyber-text">
      <ScrollToTop />
      <StoreHeader />
      <main>
        <Outlet />
      </main>
      <StoreFooter />
    </div>
  )
}
