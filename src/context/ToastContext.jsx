import { createContext, useContext, useState, useCallback } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { X, CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react'

const ToastContext = createContext(null)

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const STYLES = {
  success: 'border-emerald-500/40 bg-emerald-950/80 text-emerald-300',
  error: 'border-rose-500/40 bg-rose-950/80 text-rose-300',
  warning: 'border-amber-500/40 bg-amber-950/80 text-amber-300',
  info: 'border-blue-500/40 bg-blue-950/80 text-blue-300',
}

let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const toast = useCallback((message, type = 'info') => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9998] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = ICONS[t.type] || Info
            return (
              <Motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={`flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-md ${STYLES[t.type]}`}
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                <p className="text-sm leading-snug">{t.message}</p>
                <button
                  onClick={() => dismiss(t.id)}
                  className="ml-2 shrink-0 opacity-60 transition hover:opacity-100"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </Motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
