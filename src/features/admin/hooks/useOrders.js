import { useEffect, useState, useMemo } from 'react'
import { subscribeToOrders } from '../../../services/orderService'

export function useOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const unsub = subscribeToOrders((data) => {
      setOrders(data)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const filteredOrders = useMemo(() => {
    let result = orders

    if (statusFilter) {
      result = result.filter((o) => o.status === statusFilter)
    }

    if (brandFilter) {
      result = result.filter((o) => o.brandSnapshot === brandFilter)
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (o) =>
          o.customerFirstName?.toLowerCase().includes(q) ||
          o.customerLastName?.toLowerCase().includes(q) ||
          o.customerEmail?.toLowerCase().includes(q) ||
          o.customerPhone?.includes(q) ||
          o.orderNumber?.toLowerCase().includes(q) ||
          o.productNameSnapshot?.toLowerCase().includes(q)
      )
    }

    return result
  }, [orders, statusFilter, brandFilter, searchQuery])

  return {
    orders: filteredOrders,
    allOrders: orders,
    loading,
    statusFilter,
    setStatusFilter,
    brandFilter,
    setBrandFilter,
    searchQuery,
    setSearchQuery,
  }
}
