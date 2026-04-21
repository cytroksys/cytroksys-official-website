import { ShieldCheck, Clock, Award, Headset } from 'lucide-react'

const items = [
  { icon: ShieldCheck, text: 'Authorized Reseller', accent: 'text-emerald-400' },
  { icon: Clock, text: 'Digital Key Within 1 Hour', accent: 'text-cyber-cyan' },
  { icon: Award, text: '100% Genuine Products', accent: 'text-amber-400' },
  { icon: Headset, text: 'Dedicated Support', accent: 'text-violet-400' },
]

export default function TrustBanner() {
  return (
    <div className="border-b border-cyber-line/40 bg-cyber-panel/30">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-4 py-3 md:gap-10 md:px-6">
        {items.map((item) => (
          <div key={item.text} className="flex items-center gap-2">
            <item.icon className={`h-4 w-4 ${item.accent}`} />
            <span className="text-xs font-medium text-cyber-muted">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
