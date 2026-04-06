import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Preloader from './components/Preloader'

const HomePage = lazy(() => import('./pages/HomePage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

const PRELOADER_KEY = 'cytroksys-preloader-seen'

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cyber-ink text-cyber-muted">
      <p className="font-display text-sm uppercase tracking-[0.16em]">Loading secure modules...</p>
    </div>
  )
}

export default function App() {
  const [showPreloader, setShowPreloader] = useState(() => !window.sessionStorage.getItem(PRELOADER_KEY))

  useEffect(() => {
    if (!showPreloader) {
      return
    }

    const timeout = window.setTimeout(() => {
      window.sessionStorage.setItem(PRELOADER_KEY, 'true')
      setShowPreloader(false)
    }, 1500)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [showPreloader])

  return (
    <>
      <Suspense fallback={<RouteFallback />}>
        <RouterProvider router={router} />
      </Suspense>
      <AnimatePresence>{showPreloader ? <Preloader /> : null}</AnimatePresence>
    </>
  )
}

