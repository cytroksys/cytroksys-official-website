import { ORDER_STATUS_LIST, BRAND_LIST } from '../../../lib/constants'

export default function FilterBar({ statusFilter, onStatusChange, brandFilter, onBrandChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-sky-100 bg-white p-2">
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="input-control min-w-[150px] appearance-none pr-8 text-xs"
      >
        <option value="">All Statuses</option>
        {ORDER_STATUS_LIST.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {onBrandChange && (
        <select
          value={brandFilter}
          onChange={(e) => onBrandChange(e.target.value)}
          className="input-control min-w-[130px] appearance-none pr-8 text-xs"
        >
          <option value="">All Brands</option>
          {BRAND_LIST.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      )}
    </div>
  )
}
