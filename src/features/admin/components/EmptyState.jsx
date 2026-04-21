import { Inbox } from 'lucide-react'

export default function EmptyState({ title = 'No data found', description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyber-line/20">
        <Inbox className="h-7 w-7 text-cyber-muted/50" />
      </div>
      <p className="text-sm font-medium text-cyber-muted">{title}</p>
      {description && (
        <p className="mt-1 text-xs text-cyber-muted/60">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
