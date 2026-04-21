import { useEffect, useState, useCallback } from 'react'
import {
  subscribeToOrderById,
  updateOrderStatus,
  updateOrderFields,
  getOrderStatusHistory,
} from '../../../services/orderService'
import { sendOrderStatusEmail } from '../../../services/emailService'
import { useAuth } from '../../../context/AuthContext'
import { useToast } from '../../../context/ToastContext'

export function useOrderDetail(orderId) {
  const [order, setOrder] = useState(null)
  const [statusHistory, setStatusHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (!orderId) return

    const unsub = subscribeToOrderById(orderId, (data) => {
      setOrder(data)
      setLoading(false)
    })

    getOrderStatusHistory(orderId)
      .then(setStatusHistory)
      .catch(() => {})

    return () => unsub()
  }, [orderId])

  const changeStatus = useCallback(async (newStatus, note = '') => {
    try {
      await updateOrderStatus(orderId, newStatus, user.uid, note)

      if (order?.customerEmail && order?.orderNumber) {
        try {
          await sendOrderStatusEmail({
            order: {
              ...order,
              status: newStatus,
            },
            newStatus,
            note,
            deliveryKey: order.deliveryKey || '',
            deliveryNote: order.deliveryNote || '',
          })
        } catch (emailError) {
          console.error('Status updated but email failed:', emailError)
          toast('Status updated, but status email could not be sent.', 'warning')
        }
      }

      toast(`Order status changed to ${newStatus}`, 'success')
      // Refresh history
      const history = await getOrderStatusHistory(orderId)
      setStatusHistory(history)
    } catch (err) {
      toast(err.message || 'Failed to update status', 'error')
      throw err
    }
  }, [orderId, user, order, toast])

  const updateFields = useCallback(async (fields) => {
    try {
      await updateOrderFields(orderId, fields)
      toast('Order updated', 'success')
    } catch (err) {
      toast(err.message || 'Failed to update order', 'error')
      throw err
    }
  }, [orderId, toast])

  return { order, statusHistory, loading, changeStatus, updateFields }
}
