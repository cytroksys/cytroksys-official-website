import { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'How does the ordering process work?',
    a: 'Browse our catalog, select a product, and submit an order request with your details. Our team will process your order and deliver the digital key to your email within 1 hour.',
  },
  {
    q: 'Is payment required upfront?',
    a: 'No payment gateway is used on this platform. Once you place an order request, our team will contact you to arrange payment and deliver your product key.',
  },
  {
    q: 'How will I receive my product key?',
    a: 'Your digital product key will be delivered via email. We may also contact you via phone to ensure secure delivery.',
  },
  {
    q: 'Are these genuine product keys?',
    a: 'Yes. All keys are 100% genuine and sourced from authorized distribution channels. Each key comes with full activation support.',
  },
  {
    q: 'What if I face activation issues?',
    a: 'Our support team is available to help with activation. Contact us through email or phone and we will assist you immediately.',
  },
  {
    q: 'Can I purchase for multiple devices?',
    a: 'Yes. We offer multi-device plans. Select the plan that matches your device count requirement, or contact us for custom configurations.',
  },
]

export default function StoreFAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <Motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <p className="font-display text-xs uppercase tracking-[0.24em] text-cyber-cyan/80">FAQ</p>
        <h2 className="mt-3 font-display text-2xl text-cyber-text md:text-3xl">
          Frequently Asked Questions
        </h2>
      </Motion.div>

      <div className="mt-10 space-y-2">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index
          return (
            <div
              key={index}
              className="rounded-xl border border-cyber-line/50 bg-cyber-panel/30 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-cyber-text transition hover:text-cyber-cyan"
              >
                {faq.q}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-cyber-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-48 pb-4' : 'max-h-0'}`}
              >
                <p className="px-5 text-sm leading-relaxed text-cyber-muted">{faq.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
