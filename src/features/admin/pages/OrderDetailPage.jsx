import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Copy, CheckCircle2, Key, Clock, User, Package } from 'lucide-react'
import { useOrderDetail } from '../hooks/useOrderDetail'
import StatusBadge from '../components/StatusBadge'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { ORDER_STATUSES, ORDER_STATUS_LIST } from '../../../lib/constants'

export default function OrderDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { order, statusHistory, loading, changeStatus, updateFields } = useOrderDetail(id)

  const [adminNote, setAdminNote] = useState('')
  const [deliveryNote, setDeliveryNote] = useState('')
  const [deliveryKey, setDeliveryKey] = useState('')
  const [savingNote, setSavingNote] = useState(false)
  const [changingStatus, setChangingStatus] = useState(false)

  const copy = (text) => navigator.clipboard.writeText(text).catch(() => {})

  const formatDate = (ts) => {
    if (!ts) return '—'
    const d = ts.toDate ? ts.toDate() : new Date(ts)
    return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  const handleStatusChange = async (newStatus) => {
    setChangingStatus(true)
    try {
      await changeStatus(newStatus, adminNote)
    } finally {
      setChangingStatus(false)
    }
  }

  const handleSaveFields = async () => {
    setSavingNote(true)
    const fields = {}
    if (adminNote) fields.adminNote = adminNote
    if (deliveryNote) fields.deliveryNote = deliveryNote
    if (deliveryKey) fields.deliveryKey = deliveryKey
    try {
      await updateFields(fields)
      setAdminNote('')
      setDeliveryNote('')
      setDeliveryKey('')
    } finally {
      setSavingNote(false)
    }
  }

  if (loading) {
    return <div className="max-w-4xl"><LoadingSkeleton rows={8} cols={3} /></div>
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <p className="text-cyber-muted">Order not found</p>
        <button onClick={() => navigate('/admin/orders')} className="mt-4 text-xs text-cyber-cyan hover:underline">Back to Orders</button>
      </div>
    )
  }

  const nextStatuses = ORDER_STATUS_LIST.filter((s) => s !== order.status && s !== ORDER_STATUSES.PLACED)

  return (
    <div className="mx-auto max-w-4xl">
      <button onClick={() => navigate('/admin/orders')} className="mb-4 inline-flex items-center gap-2 text-xs text-cyber-muted hover:text-cyber-cyan">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Orders
      </button>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-xl text-cyber-text">{order.orderNumber}</h1>
            <StatusBadge status={order.status} />
          </div>
          <p className="mt-1 text-xs text-cyber-muted">Placed {formatDate(order.createdAt)}</p>
        </div>
        <button onClick={() => copy(order.id)} className="inline-flex items-center gap-1 text-[10px] text-cyber-muted hover:text-cyber-cyan">
          <Copy className="h-3 w-3" /> Copy Order ID
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main content */}
        <div className="space-y-4">
          {/* Customer */}
          <div className="rounded-xl border border-cyber-line/40 bg-cyber-panel/30 p-5">
            <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyber-muted">
              <User className="h-3.5 w-3.5" /> Customer Details
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <Detail label="Name" value={`${order.customerFirstName} ${order.customerLastName}`} />
              <Detail label="Email" value={order.customerEmail} onCopy={() => copy(order.customerEmail)} />
              <Detail label="Phone" value={order.customerPhone} onCopy={() => copy(order.customerPhone)} />
              {order.customerRequest && <Detail label="Request" value={order.customerRequest} className="sm:col-span-2" />}
            </div>
          </div>

          {/* Product snapshot */}
          <div className="rounded-xl border border-cyber-line/40 bg-cyber-panel/30 p-5">
            <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyber-muted">
              <Package className="h-3.5 w-3.5" /> Product Snapshot
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <Detail label="Product" value={order.productNameSnapshot} className="sm:col-span-2" />
              <Detail label="Brand" value={order.brandSnapshot} />
              <Detail label="Price" value={`₹${order.productPriceSnapshot?.toLocaleString('en-IN')}`} />
              <Detail label="Duration" value={order.productDurationSnapshot} />
              <Detail label="Devices" value={`${order.productDeviceCountSnapshot} Device${order.productDeviceCountSnapshot !== 1 ? 's' : ''}`} />
            </div>
          </div>

          {/* Notes & Delivery */}
          <div className="rounded-xl border border-cyber-line/40 bg-cyber-panel/30 p-5">
            <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyber-muted">
              <Key className="h-3.5 w-3.5" /> Delivery & Notes
            </h3>

            {order.deliveryKey && (
              <div className="mb-4 flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
                <div>
                  <p className="text-[10px] uppercase text-cyber-muted">Delivery Key</p>
                  <p className="mt-0.5 font-mono text-xs text-emerald-400">{order.deliveryKey}</p>
                </div>
                <button onClick={() => copy(order.deliveryKey)} className="text-cyber-muted hover:text-cyber-cyan"><Copy className="h-3.5 w-3.5" /></button>
              </div>
            )}

            {order.adminNote && <div className="mb-3 rounded-lg bg-cyber-line/20 px-3 py-2"><p className="text-[10px] text-cyber-muted">Admin Note</p><p className="mt-0.5 text-xs text-cyber-text">{order.adminNote}</p></div>}
            {order.deliveryNote && <div className="mb-3 rounded-lg bg-cyber-line/20 px-3 py-2"><p className="text-[10px] text-cyber-muted">Delivery Note</p><p className="mt-0.5 text-xs text-cyber-text">{order.deliveryNote}</p></div>}
            {order.keySentAt && <p className="text-[10px] text-emerald-400">Key sent at {formatDate(order.keySentAt)}</p>}

            <div className="mt-4 space-y-3 border-t border-cyber-line/30 pt-4">
              <textarea value={adminNote} onChange={(e) => setAdminNote(e.target.value)} className="input-control resize-y text-xs" rows={2} placeholder="Add admin note..." />
              <textarea value={deliveryNote} onChange={(e) => setDeliveryNote(e.target.value)} className="input-control resize-y text-xs" rows={2} placeholder="Delivery note (sent to customer)..." />
              <input value={deliveryKey} onChange={(e) => setDeliveryKey(e.target.value)} className="input-control text-xs font-mono" placeholder="Digital key / activation code..." />
              <button onClick={handleSaveFields} disabled={savingNote || (!adminNote && !deliveryNote && !deliveryKey)} className="rounded-lg bg-cyber-panel px-4 py-2 text-xs font-semibold text-cyber-text transition hover:bg-cyber-panel/80 disabled:opacity-40">
                {savingNote ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Status workflow */}
          <div className="rounded-xl border border-cyber-line/40 bg-cyber-panel/30 p-5">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-cyber-muted">Update Status</h3>
            <div className="space-y-2">
              {nextStatuses.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  disabled={changingStatus}
                  className="flex w-full items-center justify-between rounded-lg border border-cyber-line/40 bg-cyber-ink px-3 py-2 text-xs transition hover:border-cyber-cyan/30 hover:text-cyber-cyan disabled:opacity-50"
                >
                  <span>{status}</span>
                  <CheckCircle2 className="h-3 w-3 text-cyber-muted" />
                </button>
              ))}
            </div>
          </div>

          {/* Status History */}
          {statusHistory.length > 0 && (
            <div className="rounded-xl border border-cyber-line/40 bg-cyber-panel/30 p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-cyber-muted">Status History</h3>
              <ol className="space-y-3">
                {statusHistory.map((h) => (
                  <li key={h.id} className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyber-cyan" />
                    <div>
                      <p className="text-[10px] text-cyber-text">{h.fromStatus} → {h.toStatus}</p>
                      {h.note && <p className="text-[10px] text-cyber-muted">{h.note}</p>}
                      <p className="text-[9px] text-cyber-muted/60">{formatDate(h.changedAt)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Detail({ label, value, onCopy, className = '' }) {
  return (
    <div className={className}>
      <p className="text-[10px] uppercase tracking-wider text-cyber-muted">{label}</p>
      <div className="mt-0.5 flex items-center gap-1">
        <p className="text-xs text-cyber-text">{value}</p>
        {onCopy && (
          <button onClick={onCopy} className="text-cyber-muted/50 hover:text-cyber-cyan">
            <Copy className="h-2.5 w-2.5" />
          </button>
        )}
      </div>
    </div>
  )
}
