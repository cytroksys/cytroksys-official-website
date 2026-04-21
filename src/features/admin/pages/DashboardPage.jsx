import { createElement } from 'react'
import { Link } from 'react-router-dom'
import { Package, ShoppingCart, CheckCircle2, XCircle, Key, TrendingUp, AlertCircle, Plus, ArrowRight, BadgeIndianRupee, ShieldAlert, Activity } from 'lucide-react'
import DashboardStatCard from '../components/DashboardStatCard'
import StatusBadge from '../components/StatusBadge'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { useDashboardStats } from '../hooks/useDashboardStats'

export default function DashboardPage() {
  const { stats, recentOrders, loading } = useDashboardStats()

  if (loading) {
    return <div className="space-y-6"><LoadingSkeleton rows={3} cols={4} /><LoadingSkeleton rows={5} cols={4} /></div>
  }

  const todayLabel = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-xl text-slate-900">Dashboard</h1>
          <p className="text-xs text-slate-500">Operational snapshot • {todayLabel}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/admin/products/new" className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50">
            <Plus className="h-3.5 w-3.5 text-sky-600" />
            Add Product
          </Link>
          <Link to="/admin/orders" className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-2 text-xs font-semibold text-white shadow-[0_10px_18px_rgba(59,130,246,0.25)] transition hover:brightness-105">
            Review Orders
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard icon={Package} label="Total Products" value={stats.totalProducts} accent="text-violet-400" subtext={`${stats.activeProducts} active`} />
        <DashboardStatCard icon={ShoppingCart} label="Total Orders" value={stats.totalOrders} accent="text-cyber-cyan" subtext={`${stats.ordersToday} today`} />
        <DashboardStatCard icon={AlertCircle} label="Pending" value={stats.placed} accent="text-amber-400" subtext="Awaiting action" />
        <DashboardStatCard icon={TrendingUp} label="Revenue Est." value={`₹${stats.revenueEstimate.toLocaleString('en-IN')}`} accent="text-emerald-400" subtext="Confirmed + completed" />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard icon={CheckCircle2} label="Confirmed" value={stats.confirmed} accent="text-blue-400" />
        <DashboardStatCard icon={Key} label="Key Sent" value={stats.keySent} accent="text-violet-400" />
        <DashboardStatCard icon={CheckCircle2} label="Completed" value={stats.completed} accent="text-emerald-400" />
        <DashboardStatCard icon={XCircle} label="Cancelled" value={stats.cancelled} accent="text-rose-400" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <InsightCard
          icon={BadgeIndianRupee}
          label="Average Order Value"
          value={stats.averageOrderValue > 0 ? `₹${stats.averageOrderValue.toLocaleString('en-IN')}` : '—'}
          tone="sky"
          hint="Based on confirmed + delivered orders"
        />
        <InsightCard
          icon={Activity}
          label="Fulfilment Rate"
          value={`${stats.fulfilmentRate}%`}
          tone="emerald"
          hint="Completed and key-sent share"
        />
        <InsightCard
          icon={ShieldAlert}
          label="Pending > 1 hour"
          value={stats.pendingOverdue}
          tone={stats.pendingOverdue > 0 ? 'amber' : 'slate'}
          hint={stats.pendingOverdue > 0 ? 'Needs immediate follow-up' : 'No overdue pending orders'}
        />
      </div>

      {/* Recent Orders */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-sm text-slate-900">Recent Orders</h2>
          <Link to="/admin/orders" className="text-xs font-semibold text-sky-600 hover:underline">View all</Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">No orders yet</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-sky-100 bg-white shadow-[0_8px_20px_rgba(14,165,233,0.08)]">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-indigo-50">
                  <th className="px-4 py-3 font-semibold text-slate-600">Order</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Customer</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Product</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Amount</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b border-sky-50 transition hover:bg-sky-50/60">
                    <td className="px-4 py-3">
                      <Link to={`/admin/orders/${o.id}`} className="font-mono text-sky-600 hover:underline">{o.orderNumber}</Link>
                    </td>
                    <td className="px-4 py-3 text-slate-900">{o.customerFirstName} {o.customerLastName}</td>
                    <td className="px-4 py-3 text-slate-600">{o.productNameSnapshot}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">₹{o.productPriceSnapshot?.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function InsightCard({ icon, label, value, hint, tone = 'sky' }) {
  const toneMap = {
    sky: 'border-sky-100 bg-gradient-to-br from-sky-50 to-white text-sky-600',
    emerald: 'border-emerald-100 bg-gradient-to-br from-emerald-50 to-white text-emerald-600',
    amber: 'border-amber-100 bg-gradient-to-br from-amber-50 to-white text-amber-600',
    slate: 'border-slate-200 bg-gradient-to-br from-slate-50 to-white text-slate-500',
  }

  return (
    <div className={`rounded-xl border p-4 shadow-[0_8px_20px_rgba(14,165,233,0.08)] ${toneMap[tone] || toneMap.sky}`}>
      <div className="flex items-center gap-2">
        {createElement(icon, { className: 'h-4 w-4' })}
        <p className="text-xs font-semibold uppercase tracking-[0.08em]">{label}</p>
      </div>
      <p className="mt-3 font-display text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-[11px] text-slate-500">{hint}</p>
    </div>
  )
}
