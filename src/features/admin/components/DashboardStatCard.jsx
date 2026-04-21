import { createElement } from 'react'

export default function DashboardStatCard({ icon, label, value, accent = 'text-cyber-cyan', subtext }) {
  return (
    <div className="rounded-xl border border-sky-100 bg-white p-4 shadow-[0_8px_18px_rgba(14,165,233,0.08)]">
      <div className="flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-current/15 ${accent}`}>
          {createElement(icon, { className: 'h-4 w-4' })}
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">{label}</p>
          <p className="font-display text-xl font-bold text-slate-900">{value}</p>
          {subtext && <p className="text-[10px] text-slate-500">{subtext}</p>}
        </div>
      </div>
    </div>
  )
}
