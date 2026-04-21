import { STATUS_COLORS } from '../../../lib/constants'

export default function StatusBadge({ status }) {
  const colors = STATUS_COLORS[status] || {
    bg: 'bg-gray-500/15',
    text: 'text-gray-400',
    border: 'border-gray-500/30',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${colors.bg} ${colors.text} ${colors.border}`}
    >
      {status}
    </span>
  )
}
