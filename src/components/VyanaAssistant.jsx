import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { IconResolver } from './IconResolver'

const VYANA_LOGO = '/vyana-logo.png'

const useFallbackLogo = (event) => {
  event.currentTarget.onerror = null
  event.currentTarget.src = '/logo.png'
}

const seedMessages = [
  {
    from: 'assistant',
    text: 'Hello, I am Vyana. Your Google API based RAG personal assistant for Cytroksys.',
  },
]

const quickPrompts = [
  'Need AI agent for support',
  'Cloud migration plan',
  'Security audit checklist',
]

function buildReply(input) {
  const value = input.toLowerCase()

  if (value.includes('ai') || value.includes('rag') || value.includes('agent')) {
    return 'We build production AI agents with retrieval pipelines, governance, and measurable business workflows.'
  }

  if (value.includes('price') || value.includes('cost') || value.includes('quote')) {
    return 'Share your scope, timeline, and expected users. Our team will prepare a practical quote with phased delivery options.'
  }

  if (value.includes('cloud') || value.includes('migration') || value.includes('aws') || value.includes('azure') || value.includes('gcp')) {
    return 'Cytroksys handles cloud migration, cloud operations, and hybrid architecture with security-first implementation.'
  }

  if (value.includes('security') || value.includes('audit') || value.includes('firewall')) {
    return 'Our security services include zero-trust hardening, firewall governance, penetration testing, and compliance-ready audits.'
  }

  return 'I can help with AI, cloud, security, and product engineering queries. Ask me your requirement and I will guide the next step.'
}

export default function VyanaAssistant() {
  const [open, setOpen] = useState(false)
  const [awake, setAwake] = useState(false)
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(seedMessages)

  const statusText = useMemo(() => (typing ? 'Vyana is thinking...' : 'Google API based RAG assistant'), [typing])

  useEffect(() => {
    const openFromAnywhere = () => {
      setOpen(true)
      setAwake(true)
      window.setTimeout(() => setAwake(false), 900)
    }

    window.addEventListener('open-vyana-chat', openFromAnywhere)
    return () => {
      window.removeEventListener('open-vyana-chat', openFromAnywhere)
    }
  }, [])

  const toggleOpen = () => {
    setOpen((prev) => {
      const next = !prev
      if (next) {
        setAwake(true)
        window.setTimeout(() => setAwake(false), 900)
      }
      return next
    })
  }

  const handleSend = (event) => {
    event.preventDefault()
    const value = input.trim()
    if (!value) {
      return
    }

    setMessages((prev) => [...prev, { from: 'user', text: value }])
    setInput('')
    setTyping(true)

    window.setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'assistant', text: buildReply(value) }])
      setTyping(false)
    }, 650)
  }

  const sendQuickPrompt = (prompt) => {
    setInput(prompt)
    setMessages((prev) => [...prev, { from: 'user', text: prompt }])
    setTyping(true)

    window.setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'assistant', text: buildReply(prompt) }])
      setTyping(false)
      setInput('')
    }, 600)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open ? (
          <Motion.section
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-[min(92vw,360px)] overflow-hidden rounded-2xl border border-cyber-line bg-cyber-panel/95 shadow-2xl backdrop-blur"
            aria-label="Vyana assistant chatbox"
          >
            <div className="flex items-center justify-between border-b border-cyber-line/70 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <img
                  src={VYANA_LOGO}
                  alt="Vyana logo"
                  onError={useFallbackLogo}
                  className="h-8 w-8 rounded-full border border-cyber-line/80 object-cover shadow-glow"
                />
                <div>
                  <p className="font-display text-sm tracking-wide text-cyber-text">Vyana AI Assistant</p>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-cyber-cyan/85">{statusText}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleOpen}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-cyber-line bg-cyber-ink/70 text-cyber-text transition hover:border-cyber-cyan"
                aria-label="Close assistant"
              >
                <IconResolver name="X" className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendQuickPrompt(prompt)}
                    className="rounded-full border border-cyber-line bg-cyber-ink/60 px-2.5 py-1 text-[11px] tracking-wide text-cyber-muted transition hover:border-cyber-cyan/60 hover:text-cyber-text"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {messages.map((message, index) => (
                <Motion.div
                  key={`${message.from}-${index}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[92%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    message.from === 'assistant'
                      ? 'mr-auto border border-cyber-line bg-cyber-ink/70 text-cyber-muted'
                      : 'ml-auto bg-gradient-to-r from-cyber-cyan to-cyber-violet text-cyber-ink'
                  }`}
                >
                  {message.text}
                </Motion.div>
              ))}

              {typing ? (
                <div className="mr-auto inline-flex items-center gap-1 rounded-xl border border-cyber-line bg-cyber-ink/70 px-3 py-2">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyber-cyan" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyber-cyan [animation-delay:120ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyber-cyan [animation-delay:240ms]" />
                </div>
              ) : null}
            </div>

            <form onSubmit={handleSend} className="border-t border-cyber-line/70 p-3">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  className="input-control h-10 px-3 py-2 text-sm"
                  placeholder="Ask Vyana about services..."
                  aria-label="Message Vyana"
                />
                <button
                  type="submit"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-violet text-cyber-ink transition hover:brightness-110"
                  aria-label="Send message"
                >
                  <IconResolver name="Send" className="h-4 w-4" />
                </button>
              </div>
            </form>
          </Motion.section>
        ) : null}
      </AnimatePresence>

      <Motion.button
        type="button"
        onClick={toggleOpen}
        whileTap={{ scale: 0.95 }}
        className="group relative inline-flex flex-col items-center gap-1 rounded-2xl border border-cyber-cyan/55 bg-cyber-panel/95 px-3 py-2 text-xs font-semibold text-cyber-text shadow-glow backdrop-blur transition hover:-translate-y-0.5 hover:border-cyber-cyan"
        aria-expanded={open}
        aria-label="Wake up Vyana bot"
      >
        <span
          className={`pointer-events-none absolute -inset-1 -z-10 rounded-full bg-cyber-cyan/25 blur-lg transition-opacity ${
            awake ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />
        <img
          src={VYANA_LOGO}
          alt="Vyana logo"
          onError={useFallbackLogo}
          className="h-7 w-7 rounded-full border border-cyber-line/80 object-cover"
        />
        <span>Vyana</span>
      </Motion.button>
    </div>
  )
}
