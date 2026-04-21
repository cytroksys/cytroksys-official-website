import { Search, Filter } from 'lucide-react'
import { PRODUCT_CATEGORY_LIST, BRAND_LIST } from '../../../lib/constants'

export default function ProductFilterBar({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  brandFilter,
  onBrandChange,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyber-muted" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-control pl-10 text-sm"
        />
      </div>

      {/* Category filter */}
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-cyber-muted" />
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="input-control appearance-none pl-9 pr-8 text-sm"
        >
          <option value="">All Categories</option>
          {PRODUCT_CATEGORY_LIST.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Brand filter */}
      <div className="relative">
        <select
          value={brandFilter}
          onChange={(e) => onBrandChange(e.target.value)}
          className="input-control appearance-none pr-8 text-sm"
        >
          <option value="">All Brands</option>
          {BRAND_LIST.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
