import { Clock, Mail, Headset } from 'lucide-react'

export default function DeliveryPromise() {
  return (
    <section className="border-y border-cyber-line/40 bg-gradient-to-b from-cyber-panel/30 to-cyber-ink">
      <div className="mx-auto max-w-7xl px-4 py-16 text-center md:px-6">
        <p className="font-display text-xs uppercase tracking-[0.24em] text-cyber-cyan/80">
          Our Promise
        </p>
        <h2 className="mt-3 font-display text-2xl text-cyber-text md:text-3xl">
          Digital Key Delivery Within 1 Hour
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cyber-muted">
          Once your order is confirmed, our team processes and delivers your genuine product key
          directly to your email — fast, secure, and hassle-free.
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-3">
          {[
            {
              icon: Clock,
              title: '1-Hour Delivery',
              desc: 'Digital keys delivered within 60 minutes of confirmation',
            },
            {
              icon: Mail,
              title: 'Email Delivery',
              desc: 'Keys sent directly to your registered email address',
            },
            {
              icon: Headset,
              title: 'Activation Support',
              desc: 'Free help with product activation and setup',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-cyber-line/40 bg-cyber-panel/30 p-6"
            >
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-cyber-cyan/10 text-cyber-cyan">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-cyber-text">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-cyber-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
