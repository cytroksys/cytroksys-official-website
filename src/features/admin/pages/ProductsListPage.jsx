import { Link } from 'react-router-dom'
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight, Star } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useAdminProducts } from '../hooks/useAdminProducts'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'
import LoadingSkeleton from '../components/LoadingSkeleton'
import SearchBar from '../components/SearchBar'

export default function ProductsListPage() {
  const { products, loading, removeProduct, toggleActive, quickPriceUpdate } = useAdminProducts()
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [editingPrice, setEditingPrice] = useState(null)
  const [priceValue, setPriceValue] = useState('')

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [products]
  )

  const productStats = useMemo(() => ({
    active: products.filter((p) => p.isActive).length,
    inactive: products.filter((p) => !p.isActive).length,
    featured: products.filter((p) => p.isFeatured).length,
  }), [products])

  const filtered = useMemo(() => {
    let result = products

    if (search) {
      const q = search.toLowerCase()
      result = result.filter((p) =>
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q)
      )
    }

    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter)
    }

    if (statusFilter === 'active') {
      result = result.filter((p) => p.isActive)
    } else if (statusFilter === 'inactive') {
      result = result.filter((p) => !p.isActive)
    } else if (statusFilter === 'featured') {
      result = result.filter((p) => p.isFeatured)
    }

    return result
  }, [products, search, categoryFilter, statusFilter])

  const resetFilters = () => {
    setSearch('')
    setCategoryFilter('')
    setStatusFilter('all')
  }

  const handleDelete = async () => {
    if (deleteTarget) {
      await removeProduct(deleteTarget)
      setDeleteTarget(null)
    }
  }

  const handlePriceSave = async (productId) => {
    const price = Number(priceValue)
    if (price > 0) await quickPriceUpdate(productId, price, null)
    setEditingPrice(null)
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-xl text-slate-900">Products</h1>
          <p className="text-xs text-slate-500">{products.length} total • {filtered.length} visible</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Search products..." />
          <Link to="/admin/products/new" className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_18px_rgba(59,130,246,0.25)] transition hover:brightness-105">
            <Plus className="h-3.5 w-3.5" /> Add
          </Link>
        </div>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-sky-100 bg-white p-3">
          <p className="text-[10px] uppercase tracking-[0.08em] text-slate-500">Active Products</p>
          <p className="mt-1 font-display text-xl text-slate-900">{productStats.active}</p>
        </div>
        <div className="rounded-xl border border-sky-100 bg-white p-3">
          <p className="text-[10px] uppercase tracking-[0.08em] text-slate-500">Inactive Products</p>
          <p className="mt-1 font-display text-xl text-slate-900">{productStats.inactive}</p>
        </div>
        <div className="rounded-xl border border-sky-100 bg-white p-3">
          <p className="text-[10px] uppercase tracking-[0.08em] text-slate-500">Featured</p>
          <p className="mt-1 font-display text-xl text-slate-900">{productStats.featured}</p>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-2 rounded-xl border border-sky-100 bg-white p-3">
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="input-control w-full max-w-[220px] text-xs">
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-control w-full max-w-[180px] text-xs">
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="featured">Featured</option>
        </select>

        <button onClick={resetFilters} className="rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-semibold text-slate-600 transition hover:bg-slate-50">
          Reset Filters
        </button>
      </div>

      {loading ? <LoadingSkeleton rows={6} cols={5} /> : filtered.length === 0 ? (
        <EmptyState title="No products found" description={search || categoryFilter || statusFilter !== 'all' ? 'Try different filters' : 'Add your first product'} />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-sky-100 bg-white shadow-[0_8px_20px_rgba(14,165,233,0.08)]">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-indigo-50">
                <th className="px-4 py-3 font-semibold text-slate-600">Product</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Category</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Price</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Type</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Status</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-sky-50 transition hover:bg-sky-50/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.imageUrl ? <img src={p.imageUrl} alt="" className="h-8 w-8 rounded-md border border-sky-100 bg-slate-50 object-contain" /> : <div className="h-8 w-8 rounded-md bg-slate-100" />}
                      <div>
                        <p className="font-semibold text-slate-900">{p.name}</p>
                        <p className="text-[10px] text-slate-500">{p.brand} • {p.duration}</p>
                      </div>
                      {p.isFeatured && <Star className="h-3 w-3 text-amber-400" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{p.category}</td>
                  <td className="px-4 py-3">
                    {editingPrice === p.id ? (
                      <div className="flex items-center gap-1">
                        <input type="number" value={priceValue} onChange={(e) => setPriceValue(e.target.value)} className="input-control w-20 px-2 py-1 text-xs" autoFocus onKeyDown={(e) => { if (e.key === 'Enter') handlePriceSave(p.id); if (e.key === 'Escape') setEditingPrice(null) }} />
                        <button onClick={() => handlePriceSave(p.id)} className="text-[10px] font-semibold text-sky-600">Save</button>
                      </div>
                    ) : (
                      <div>
                        <button onClick={() => { setEditingPrice(p.id); setPriceValue(String(p.price || '')) }} className="font-semibold text-slate-900 hover:text-sky-600" title="Click to edit">
                          ₹{p.price?.toLocaleString('en-IN')}
                        </button>
                        {p.compareAtPrice > p.price && (
                          <p className="text-[10px] text-slate-400 line-through">₹{p.compareAtPrice?.toLocaleString('en-IN')}</p>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-sky-100 bg-sky-50 px-2 py-1 text-[10px] font-semibold text-sky-700">
                      {p.deliveryType || 'Digital'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(p.id, !p.isActive)} className={`inline-flex items-center gap-1 text-[10px] font-medium ${p.isActive ? 'text-emerald-600' : 'text-slate-500'}`}>
                      {p.isActive ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                      {p.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Link to={`/admin/products/${p.id}/edit`} className="rounded-md p-1.5 text-slate-500 hover:bg-sky-50 hover:text-sky-600"><Edit2 className="h-3.5 w-3.5" /></Link>
                      <button onClick={() => setDeleteTarget(p.id)} className="rounded-md p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-500"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ConfirmDialog isOpen={Boolean(deleteTarget)} title="Delete Product" message="This cannot be undone." confirmLabel="Delete" destructive onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
    </div>
  )
}
