import { MessageCircle } from 'lucide-react'

export default function FloatingWhatsAppButton({ phone }) {
  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-20 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-cyber-cyan/50 bg-cyber-panel/95 px-4 py-3 text-sm font-semibold text-cyber-text shadow-glow backdrop-blur transition hover:-translate-y-0.5 hover:border-cyber-cyan hover:bg-cyber-panel"
      aria-label="Chat with Cytroksys on WhatsApp"
    >
      <MessageCircle className="h-4 w-4 text-cyber-cyan" />
      <span className="hidden sm:inline">Talk to an Expert</span>
    </a>
  )
}

