import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-7xl flex-col items-center justify-center px-4 text-center md:px-6">
      <p className="font-display text-sm uppercase tracking-[0.2em] text-cyber-cyan">404</p>
      <h1 className="mt-3 font-display text-4xl text-cyber-text">Page not found</h1>
      <p className="mt-4 max-w-lg text-sm text-cyber-muted">
        The page you are trying to access is not available. Navigate back to the homepage to continue exploring Cytroksys services.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-violet px-6 py-3 text-sm font-semibold text-cyber-ink"
      >
        Return Home
      </Link>
    </section>
  )
}

