import { motion as Motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'

export default function ConfirmDialog({ isOpen, title, message, confirmLabel = 'Confirm', onConfirm, onCancel, destructive = false }) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        onClick={(e) => { if (e.target === e.currentTarget) onCancel() }}
      >
        <Motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-sm rounded-xl border border-cyber-line bg-cyber-ink p-6"
        >
          <div className="flex items-start gap-3">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${destructive ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'}`}>
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-cyber-text">{title}</h3>
              <p className="mt-1 text-xs text-cyber-muted">{message}</p>
            </div>
            <button onClick={onCancel} className="text-cyber-muted hover:text-cyber-text">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 flex justify-end gap-2">
            <button
              onClick={onCancel}
              className="rounded-lg border border-cyber-line px-4 py-2 text-xs font-medium text-cyber-muted transition hover:bg-cyber-panel"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                destructive
                  ? 'bg-rose-500/15 text-rose-400 hover:bg-rose-500/25'
                  : 'bg-cyber-cyan/15 text-cyber-cyan hover:bg-cyber-cyan/25'
              }`}
            >
              {confirmLabel}
            </button>
          </div>
        </Motion.div>
      </Motion.div>
    </AnimatePresence>
  )
}
