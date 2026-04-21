import { useEffect, useState } from 'react'
import { subscribeToOrders } from '../../../services/orderService'
import { subscribeToProducts } from '../../../services/productService'
import { ORDER_STATUSES } from '../../../lib/constants'

export function useDashboardStats() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    totalOrders: 0,
    ordersToday: 0,
    placed: 0,
    confirmed: 0,
    keySent: 0,
    completed: 0,
    cancelled: 0,
    revenueEstimate: 0,
    averageOrderValue: 0,
    fulfilmentRate: 0,
    cancellationRate: 0,
    pendingOverdue: 0,
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const unsubOrders = subscribeToOrders((orders) => {
      const now = new Date()
      const placed = orders.filter((o) => o.status === ORDER_STATUSES.PLACED).length
      const confirmed = orders.filter((o) => o.status === ORDER_STATUSES.CONFIRMED).length
      const keySent = orders.filter((o) => o.status === ORDER_STATUSES.KEY_SENT).length
      const completed = orders.filter((o) => o.status === ORDER_STATUSES.COMPLETED).length
      const cancelled = orders.filter((o) => o.status === ORDER_STATUSES.CANCELLED).length

      const ordersToday = orders.filter((o) => {
        const d = o.createdAt?.toDate?.()
        return d && d >= today
      }).length

      const revenue = orders
        .filter((o) => o.status === ORDER_STATUSES.COMPLETED || o.status === ORDER_STATUSES.CONFIRMED || o.status === ORDER_STATUSES.KEY_SENT)
        .reduce((sum, o) => sum + (o.productPriceSnapshot || 0), 0)

      const fulfilmentBase = completed + keySent
      const cancelledRate = orders.length > 0 ? Math.round((cancelled / orders.length) * 100) : 0
      const fulfilmentRate = orders.length > 0 ? Math.round((fulfilmentBase / orders.length) * 100) : 0
      const avgOrderValue = fulfilmentBase > 0 ? Math.round(revenue / fulfilmentBase) : 0

      const pendingOverdue = orders.filter((o) => {
        if (o.status !== ORDER_STATUSES.PLACED) return false
        const created = o.createdAt?.toDate?.()
        if (!created) return false
        return now - created > 60 * 60 * 1000
      }).length

      setStats((prev) => ({
        ...prev,
        totalOrders: orders.length,
        ordersToday,
        placed,
        confirmed,
        keySent,
        completed,
        cancelled,
        revenueEstimate: revenue,
        averageOrderValue: avgOrderValue,
        fulfilmentRate,
        cancellationRate: cancelledRate,
        pendingOverdue,
      }))

      setRecentOrders(orders.slice(0, 10))
      setLoading(false)
    })

    const unsubProducts = subscribeToProducts((products) => {
      setStats((prev) => ({
        ...prev,
        totalProducts: products.length,
        activeProducts: products.filter((p) => p.isActive).length,
      }))
    })

    return () => {
      unsubOrders()
      unsubProducts()
    }
  }, [])

  return { stats, recentOrders, loading }
}
