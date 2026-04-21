import { useEffect, useState, useCallback } from 'react'
import {
  subscribeToProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductActive,
  updateProductPrice,
  getProductById,
} from '../../../services/productService'
import { useAuth } from '../../../context/AuthContext'
import { useToast } from '../../../context/ToastContext'

export function useAdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const unsub = subscribeToProducts((data) => {
      setProducts(data)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const addProduct = useCallback(async (data) => {
    try {
      const id = await createProduct(data, user.uid)
      toast('Product created successfully', 'success')
      return id
    } catch (err) {
      toast(err.message || 'Failed to create product', 'error')
      throw err
    }
  }, [user, toast])

  const editProduct = useCallback(async (id, data) => {
    try {
      await updateProduct(id, data, user.uid)
      toast('Product updated successfully', 'success')
    } catch (err) {
      toast(err.message || 'Failed to update product', 'error')
      throw err
    }
  }, [user, toast])

  const removeProduct = useCallback(async (id) => {
    try {
      await deleteProduct(id)
      toast('Product deleted', 'success')
    } catch (err) {
      toast(err.message || 'Failed to delete product', 'error')
      throw err
    }
  }, [toast])

  const toggleActive = useCallback(async (id, isActive) => {
    try {
      await toggleProductActive(id, isActive, user.uid)
      toast(`Product ${isActive ? 'activated' : 'deactivated'}`, 'success')
    } catch (err) {
      toast(err.message || 'Failed to toggle product', 'error')
      throw err
    }
  }, [user, toast])

  const quickPriceUpdate = useCallback(async (id, price, oldPrice) => {
    try {
      await updateProductPrice(id, price, oldPrice, user.uid)
      toast('Price updated', 'success')
    } catch (err) {
      toast(err.message || 'Failed to update price', 'error')
      throw err
    }
  }, [user, toast])

  const fetchProduct = useCallback(async (id) => {
    return getProductById(id)
  }, [])

  return { products, loading, addProduct, editProduct, removeProduct, toggleActive, quickPriceUpdate, fetchProduct }
}
