/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        cyber: {
          ink: 'var(--color-ink)',
          panel: 'var(--color-panel)',
          panelSoft: 'var(--color-panel-soft)',
          line: 'var(--color-line)',
          cyan: 'var(--color-cyan)',
          violet: 'var(--color-violet)',
          text: 'var(--color-text)',
          muted: 'var(--color-muted)',
        },
      },
      boxShadow: {
        glow: '0 0 24px rgba(0, 240, 255, 0.35)',
        violet: '0 0 30px rgba(123, 47, 255, 0.35)',
      },
      backgroundImage: {
        'cyber-grid':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
    },
  },
}
