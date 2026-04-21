import { useEffect, useState } from 'react'
import { getActiveProducts, getProductBySlug } from '../../../services/productService'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchProducts() {
      try {
        const data = await getActiveProducts()
        if (!cancelled) {
          setProducts(data)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) setError(err?.message || 'Failed to load products')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchProducts()
    return () => { cancelled = true }
  }, [])

  return { products, loading, error }
}

export function useProductBySlug(slug) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    let cancelled = false

    async function fetch() {
      setLoading(true)
      try {
        const data = await getProductBySlug(slug)
        if (!cancelled) {
          setProduct(data)
          setError(data ? null : 'Product not found')
        }
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetch()
    return () => { cancelled = true }
  }, [slug])

  return { product, loading, error }
}
