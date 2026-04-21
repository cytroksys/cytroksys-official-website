import { Link } from 'react-router-dom'
import { useOrders } from '../hooks/useOrders'
import StatusBadge from '../components/StatusBadge'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import LoadingSkeleton from '../components/LoadingSkeleton'
import EmptyState from '../components/EmptyState'
import { Copy, Download, RotateCcw } from 'lucide-react'
import { ORDER_STATUSES } from '../../../lib/constants'

export default function OrdersListPage() {
  const {
    orders,
    allOrders,
    loading,
    statusFilter,
    setStatusFilter,
    brandFilter,
    setBrandFilter,
    searchQuery,
    setSearchQuery,
  } = useOrders()

  const copyText = (text) => {
    navigator.clipboard.writeText(text).catch(() => {})
  }

  const formatDate = (ts) => {
    if (!ts) return '—'
    const d = ts.toDate ? ts.toDate() : new Date(ts)
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  const statusCounts = {
    [ORDER_STATUSES.PLACED]: allOrders.filter((o) => o.status === ORDER_STATUSES.PLACED).length,
    [ORDER_STATUSES.CONFIRMED]: allOrders.filter((o) => o.status === ORDER_STATUSES.CONFIRMED).length,
    [ORDER_STATUSES.KEY_SENT]: allOrders.filter((o) => o.status === ORDER_STATUSES.KEY_SENT).length,
    [ORDER_STATUSES.COMPLETED]: allOrders.filter((o) => o.status === ORDER_STATUSES.COMPLETED).length,
    [ORDER_STATUSES.CANCELLED]: allOrders.filter((o) => o.status === ORDER_STATUSES.CANCELLED).length,
  }

  const filteredRevenue = orders.reduce((sum, o) => sum + (o.productPriceSnapshot || 0), 0)

  const clearFilters = () => {
    setSearchQuery('')
    setStatusFilter('')
    setBrandFilter('')
  }

  const exportCsv = () => {
    if (orders.length === 0) return

    const header = [
      'Order Number',
      'Customer Name',
      'Email',
      'Phone',
      'Product',
      'Amount',
      'Status',
      'Brand',
      'Placed At',
    ]

    const rows = orders.map((o) => [
      o.orderNumber || '',
      `${o.customerFirstName || ''} ${o.customerLastName || ''}`.trim(),
      o.customerEmail || '',
      o.customerPhone || '',
      o.productNameSnapshot || '',
      o.productPriceSnapshot || 0,
      o.status || '',
      o.brandSnapshot || '',
      formatDate(o.createdAt),
    ])

    const escapedRows = [header, ...rows].map((row) =>
      row
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(',')
    )

    const blob = new Blob([escapedRows.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `orders-${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-xl text-slate-900">Orders</h1>
        <p className="text-xs text-slate-500">{orders.length} visible • Realtime updates active</p>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard label="Total Orders" value={allOrders.length} />
        <SummaryCard label="Awaiting Action" value={statusCounts[ORDER_STATUSES.PLACED]} tone="amber" />
        <SummaryCard label="Delivered/Completed" value={statusCounts[ORDER_STATUSES.KEY_SENT] + statusCounts[ORDER_STATUSES.COMPLETED]} tone="emerald" />
        <SummaryCard label="Filtered Revenue" value={`₹${filteredRevenue.toLocaleString('en-IN')}`} tone="sky" />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {Object.values(ORDER_STATUSES).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter((prev) => (prev === status ? '' : status))}
            className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition ${
              statusFilter === status
                ? 'border-sky-300 bg-sky-100 text-sky-700'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {status} ({statusCounts[status]})
          </button>
        ))}

      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search by name, email, phone, order #..." />
        </div>
        <FilterBar statusFilter={statusFilter} onStatusChange={setStatusFilter} brandFilter={brandFilter} onBrandChange={setBrandFilter} />
        <button onClick={clearFilters} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold text-slate-600 transition hover:bg-slate-50">
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
        <button onClick={exportCsv} disabled={orders.length === 0} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-2 text-[11px] font-semibold text-white shadow-[0_10px_18px_rgba(59,130,246,0.25)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60">
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </button>
      </div>

      {loading ? <LoadingSkeleton rows={8} cols={6} /> : orders.length === 0 ? (
        <EmptyState title="No orders found" description="Orders will appear here in realtime when customers place them." />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-sky-100 bg-white shadow-[0_8px_20px_rgba(14,165,233,0.08)]">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-indigo-50">
                <th className="px-4 py-3 font-medium text-slate-600">Order #</th>
                <th className="px-4 py-3 font-medium text-slate-600">Customer</th>
                <th className="px-4 py-3 font-medium text-slate-600">Product</th>
                <th className="px-4 py-3 font-medium text-slate-600">Amount</th>
                <th className="px-4 py-3 font-medium text-slate-600">Status</th>
                <th className="px-4 py-3 font-medium text-slate-600">Date</th>
                <th className="px-4 py-3 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-sky-50 transition hover:bg-sky-50/60">
                  <td className="px-4 py-3">
                    <Link to={`/admin/orders/${o.id}`} className="font-mono text-sky-600 hover:underline">{o.orderNumber}</Link>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-slate-900">{o.customerFirstName} {o.customerLastName}</p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      <span>{o.customerEmail}</span>
                      <button onClick={() => copyText(o.customerEmail)} title="Copy email"><Copy className="h-2.5 w-2.5" /></button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{o.productNameSnapshot}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">₹{o.productPriceSnapshot?.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                  <td className="px-4 py-3 text-slate-500">{formatDate(o.createdAt)}</td>
                  <td className="px-4 py-3">
                    <Link to={`/admin/orders/${o.id}`} className="rounded-md bg-sky-100 px-3 py-1 text-[10px] font-semibold text-sky-700 hover:bg-sky-200">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function SummaryCard({ label, value, tone = 'slate' }) {
  const toneMap = {
    slate: 'border-slate-200 bg-white',
    amber: 'border-amber-200 bg-amber-50/60',
    emerald: 'border-emerald-200 bg-emerald-50/60',
    sky: 'border-sky-200 bg-sky-50/60',
  }

  return (
    <div className={`rounded-xl border p-3 ${toneMap[tone] || toneMap.slate}`}>
      <p className="text-[10px] uppercase tracking-[0.08em] text-slate-500">{label}</p>
      <p className="mt-1 font-display text-xl text-slate-900">{value}</p>
    </div>
  )
}
