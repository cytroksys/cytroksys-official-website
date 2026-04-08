import { useEffect, useState } from 'react'
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
    text:
      'Welcome to Vyana, the Cytroksys Assistant. I can guide you using our support knowledge base for AI, cloud, security, and deployment topics.',
  },
]

const quickPrompts = [
  'Show AI agent support workflow',
  'Cloud migration support steps',
  'Security audit support checklist',
]

function buildFallbackReply(input) {
  const value = input.toLowerCase()

  const formatResponse = (title, bullets, nextStep) => {
    return `${title}\n\nSupport Notes:\n- ${bullets.join('\n- ')}\n\nNext Step:\n${nextStep}`
  }

  if (value.includes('ai') || value.includes('rag') || value.includes('agent')) {
    return formatResponse(
      'Vyana RAG Support: AI Agent Workflow',
      [
        'Define business objective and escalation boundaries.',
        'Connect document sources for retrieval and grounding.',
        'Add observability for answer quality and latency.',
      ],
      'Share your use case and expected daily queries. We will prepare an implementation plan.'
    )
  }

  if (value.includes('price') || value.includes('cost') || value.includes('quote')) {
    return formatResponse(
      'Vyana Support: Quotation Preparation',
      [
        'Collect requirements, timeline, and expected user load.',
        'Define phased delivery with security and QA milestones.',
        'Map budget to scope with optional scale-up paths.',
      ],
      'Use the Contact form or ask me for a project checklist before requesting a quote.'
    )
  }

  if (value.includes('cloud') || value.includes('migration') || value.includes('aws') || value.includes('azure') || value.includes('gcp')) {
    return formatResponse(
      'Vyana Support: Cloud Migration',
      [
        'Start with inventory and dependency mapping.',
        'Run staged migration with rollback and health checks.',
        'Enable ongoing cost and performance governance.',
      ],
      'Tell me your current platform and target cloud. I will suggest a practical migration sequence.'
    )
  }

  if (value.includes('security') || value.includes('audit') || value.includes('firewall')) {
    return formatResponse(
      'Vyana Support: Security and Audit',
      [
        'Perform vulnerability and access posture review.',
        'Harden firewall policy and segmentation controls.',
        'Generate compliance-ready audit documentation.',
      ],
      'Share your compliance target and environment size to receive a tailored audit checklist.'
    )
  }

  return formatResponse(
    'Vyana Support: General Guidance',
    [
      'AI agent delivery and support automation.',
      'Cloud operations and migration planning.',
      'Security hardening and audit readiness.',
    ],
    'Ask a specific question and I will respond with structured support steps.'
  )
}

async function buildServerReply(input, conversation) {
  const response = await fetch('/api/vyana', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input,
      conversation,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Assistant API error ${response.status}: ${errorText}`)
  }

  const payload = await response.json()
  return payload?.reply || null
}

export default function VyanaAssistant() {
  const [open, setOpen] = useState(false)
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(seedMessages)

  useEffect(() => {
    const openFromAnywhere = () => {
      setOpen(true)
    }

    window.addEventListener('open-vyana-chat', openFromAnywhere)
    return () => {
      window.removeEventListener('open-vyana-chat', openFromAnywhere)
    }
  }, [])

  useEffect(() => {
    if (!open) {
      return
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  const sendPrompt = async (prompt) => {
    if (!prompt || typing) {
      return
    }

    const userMessage = { from: 'user', text: prompt }
    const conversation = [...messages, userMessage]

    setMessages((prev) => [...prev, userMessage])
    setTyping(true)

    try {
      const serverReply = await buildServerReply(prompt, conversation)
      const replyText = serverReply || buildFallbackReply(prompt)

      setMessages((prev) => [...prev, { from: 'assistant', text: replyText }])
    } catch (error) {
      console.error('Assistant API failed, falling back to local support response.', error)
      setMessages((prev) => [...prev, { from: 'assistant', text: buildFallbackReply(prompt) }])
    } finally {
      setTyping(false)
    }
  }

  const handleSend = async (event) => {
    event.preventDefault()
    const value = input.trim()
    if (!value) {
      return
    }

    setInput('')
    await sendPrompt(value)
  }

  const sendQuickPrompt = async (prompt) => {
    setInput('')
    await sendPrompt(prompt)
  }

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-cyber-ink/30 pointer-events-auto"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <Motion.section
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="pointer-events-auto absolute right-4 top-20 w-[min(94vw,420px)] overflow-hidden rounded-2xl border border-cyber-line bg-cyber-panel/95 shadow-2xl backdrop-blur md:right-6"
            aria-label="Vyana Cytroksys assistant"
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
                  <p className="font-display text-sm tracking-wide text-cyber-text">Vyana</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-cyber-line bg-cyber-ink/70 text-cyber-text transition hover:border-cyber-cyan"
                aria-label="Close assistant"
              >
                <IconResolver name="X" className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-80 space-y-3 overflow-y-auto px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendQuickPrompt(prompt)}
                    className="surface-panel rounded-full border border-cyber-line bg-cyber-ink/60 px-2.5 py-1 text-[11px] tracking-wide text-cyber-muted transition hover:border-cyber-cyan/60 hover:text-cyber-text"
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
                  className={`max-w-[96%] whitespace-pre-line rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    message.from === 'assistant'
                      ? 'mr-auto border border-cyber-line bg-cyber-ink/70 text-cyber-muted'
                      : 'brand-cta ml-auto text-cyber-ink'
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
                  placeholder="Ask support question..."
                  aria-label="Message Vyana"
                />
                <button
                  type="submit"
                  className="brand-cta premium-shimmer inline-flex h-10 w-10 items-center justify-center rounded-xl text-cyber-ink transition"
                  aria-label="Send message"
                >
                  <IconResolver name="Send" className="h-4 w-4" />
                </button>
              </div>
            </form>
          </Motion.section>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
