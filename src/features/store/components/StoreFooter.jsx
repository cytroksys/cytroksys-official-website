import { Link } from 'react-router-dom'
import { Mail, Phone, ShieldCheck } from 'lucide-react'

export default function StoreFooter() {
  return (
    <footer className="border-t border-cyber-line bg-cyber-panel/60">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <Link to="/" className="inline-flex items-center gap-2">
              <img src="/logo.png" alt="Cytroksys" className="h-8 w-8 rounded-full" />
              <span className="font-display text-sm tracking-tight text-cyber-text">
                Cytroksys Store
              </span>
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-cyber-muted">
              Authorized digital reseller for premium cybersecurity software and license keys.
            </p>
          </div>

          <div>
            <h4 className="font-display text-xs uppercase tracking-[0.2em] text-cyber-cyan">
              Quick Links
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link to="/store" className="text-cyber-muted transition hover:text-cyber-text">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/" className="text-cyber-muted transition hover:text-cyber-text">
                  Main Website
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cyber-muted transition hover:text-cyber-text">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs uppercase tracking-[0.2em] text-cyber-cyan">
              Support
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li className="flex items-center gap-2 text-cyber-muted">
                <Mail className="h-3 w-3" />
                contact@cytroksys.in
              </li>
              <li className="flex items-center gap-2 text-cyber-muted">
                <Phone className="h-3 w-3" />
                +91 9489868842
              </li>
              <li className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="h-3 w-3" />
                Authorized Reseller
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-cyber-line/50 pt-4 text-center text-[10px] text-cyber-muted">
          © 2026 Cytroksys Infotech. All rights reserved. | Digital Software Store
        </div>
      </div>
    </footer>
  )
}
