import { useState, useCallback } from 'react'
import { createOrder } from '../../../services/orderService'
import { sendOrderPlacedEmail } from '../../../services/emailService'
import { useToast } from '../../../context/ToastContext'

export function useOrderSubmit() {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [orderResult, setOrderResult] = useState(null)
  const { toast } = useToast()

  const submitOrder = useCallback(async (product, customerData) => {
    if (submitting) return
    setSubmitting(true)
    setSuccess(false)

    try {
      const result = await createOrder(product, customerData)

      const emailPayload = {
        orderNumber: result.orderNumber,
        productNameSnapshot: product.name,
        productPriceSnapshot: product.price,
        productDurationSnapshot: product.duration,
        productDeviceCountSnapshot: product.deviceCount,
        customerFirstName: customerData.firstName,
        customerLastName: customerData.lastName,
        customerEmail: customerData.email,
      }

      try {
        await sendOrderPlacedEmail(emailPayload)
      } catch (emailError) {
        console.error('Order placed but confirmation email failed:', emailError)
        toast('Order placed, but email delivery failed. Our team will still contact you.', 'warning')
      }

      setOrderResult(result)
      setSuccess(true)
      toast('Order placed successfully!', 'success')
      return result
    } catch (err) {
      toast(err.message || 'Failed to place order. Please try again.', 'error')
      throw err
    } finally {
      setSubmitting(false)
    }
  }, [submitting, toast])

  const reset = useCallback(() => {
    setSuccess(false)
    setOrderResult(null)
  }, [])

  return { submitOrder, submitting, success, orderResult, reset }
}
