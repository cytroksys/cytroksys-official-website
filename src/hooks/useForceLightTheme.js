import { useEffect } from 'react'

const STORAGE_KEY = 'cytroksys-theme'

const isLightRoute = (pathname) => pathname.startsWith('/admin') || pathname.startsWith('/store')

const getStoredTheme = () => {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'dark' || stored === 'light' ? stored : 'light'
}

export function applyRouteTheme(pathname = window.location.pathname) {
  if (typeof window === 'undefined') return 'light'

  const theme = isLightRoute(pathname) ? 'light' : getStoredTheme()
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
  return theme
}

export function useForceLightTheme() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    document.documentElement.dataset.theme = 'light'
    document.documentElement.style.colorScheme = 'light'

    return () => {
      // Keep light mode while navigating between admin/store routes.
      if (isLightRoute(window.location.pathname)) return

      const nextTheme = getStoredTheme()
      document.documentElement.dataset.theme = nextTheme
      document.documentElement.style.colorScheme = nextTheme
    }
  }, [])
}