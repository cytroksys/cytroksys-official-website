import { useEffect, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { IconResolver } from './IconResolver'

const VYANA_LOGO = '/vyana-logo.png'
const AUTO_OPEN_DELAY_MS = 2 * 60 * 1000

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

function playOpenChime() {
  if (typeof window === 'undefined') {
    return
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) {
    return
  }

  let audioContext

  try {
    audioContext = new AudioContextClass()
  } catch (error) {
    return
  }

  const playTone = () => {
    const now = audioContext.currentTime
    const gain = audioContext.createGain()
    const oscillator = audioContext.createOscillator()

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(784, now)
    oscillator.frequency.exponentialRampToValueAtTime(1046, now + 0.12)

    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.028, now + 0.04)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22)

    oscillator.connect(gain)
    gain.connect(audioContext.destination)

    oscillator.start(now)
    oscillator.stop(now + 0.24)
    oscillator.onended = () => {
      audioContext.close().catch(() => {})
    }
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume().then(playTone).catch(() => {
      audioContext.close().catch(() => {})
    })
    return
  }

  playTone()
}

export default function VyanaAssistant() {
  const [open, setOpen] = useState(false)
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(seedMessages)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setOpen(true)
    }, AUTO_OPEN_DELAY_MS)

    return () => {
      window.clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!open) {
      return
    }

    playOpenChime()
  }, [open])

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
    <>
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
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="pointer-events-auto absolute bottom-24 right-4 w-[min(94vw,440px)] overflow-hidden rounded-3xl border border-cyber-line bg-cyber-panel/95 shadow-2xl backdrop-blur md:bottom-28 md:right-6"
              aria-label="Vyana Cytroksys assistant"
            >
              <div className="flex items-center justify-between border-b border-cyber-line/70 bg-gradient-to-r from-cyber-cyan/10 via-cyber-panel to-cyber-violet/10 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src={VYANA_LOGO}
                    alt="Vyana logo"
                    onError={useFallbackLogo}
                    className="h-9 w-9 rounded-full border border-cyber-line/80 object-cover"
                  />
                  <div>
                    <p className="font-display text-sm tracking-wide text-cyber-text">Vyana Assistant</p>
                    <p className="text-[11px] tracking-wide text-cyber-muted">Support Online</p>
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

              <div className="space-y-3 px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendQuickPrompt(prompt)}
                      className="surface-panel rounded-full border border-cyber-line bg-cyber-ink/60 px-3 py-1.5 text-[11px] tracking-wide text-cyber-muted transition hover:border-cyber-cyan/60 hover:text-cyber-text"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                <div className="max-h-[22rem] space-y-3 overflow-y-auto rounded-2xl border border-cyber-line/70 bg-cyber-ink/20 p-3">
                  {messages.map((message, index) => (
                    <Motion.div
                      key={`${message.from}-${index}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`max-w-[95%] whitespace-pre-line rounded-2xl px-3 py-2.5 text-sm leading-relaxed ${
                        message.from === 'assistant'
                          ? 'mr-auto border border-cyber-line bg-cyber-panel text-cyber-muted'
                          : 'ml-auto bg-gradient-to-r from-cyber-cyan to-cyber-violet text-white'
                      }`}
                    >
                      {message.text}
                    </Motion.div>
                  ))}

                  {typing ? (
                    <div className="mr-auto inline-flex items-center gap-1 rounded-xl border border-cyber-line bg-cyber-panel px-3 py-2">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyber-cyan" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyber-cyan [animation-delay:120ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyber-cyan [animation-delay:240ms]" />
                    </div>
                  ) : null}
                </div>
              </div>

              <form onSubmit={handleSend} className="border-t border-cyber-line/70 p-3">
                <div className="flex items-center gap-2 rounded-2xl border border-cyber-line bg-cyber-ink/55 p-2">
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    className="input-control h-11 border-0 bg-transparent px-3 py-2 text-sm shadow-none"
                    placeholder="Ask your support question..."
                    aria-label="Message Vyana"
                  />
                  <button
                    type="submit"
                    disabled={typing || !input.trim()}
                    className="inline-flex h-11 min-w-[96px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-violet px-4 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                    aria-label="Send message"
                  >
                    {typing ? 'Sending' : 'Send'}
                    <IconResolver name="Send" className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </Motion.section>
          </div>
        ) : null}
      </AnimatePresence>

      <Motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="fixed bottom-6 right-4 z-[56] h-14 w-14 overflow-hidden rounded-full border border-cyber-line bg-cyber-panel/95 p-0.5 shadow-[0_14px_35px_rgba(15,23,42,0.28)] backdrop-blur transition hover:scale-105 hover:border-cyber-cyan md:bottom-8 md:right-6"
        aria-label={open ? 'Close Vyana assistant' : 'Open Vyana assistant'}
      >
        <img
          src={VYANA_LOGO}
          alt="Vyana"
          onError={useFallbackLogo}
          className="h-full w-full rounded-full object-cover"
        />
      </Motion.button>
    </>
  )
}
