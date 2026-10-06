/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#08080a',
        surface: {
          50: '#1a1a1f',
          100: '#141418',
          200: '#101013',
          300: '#0c0c0e',
          DEFAULT: '#0f0f13',
        },
        border: {
          subtle: '#1f1f26',
          DEFAULT: '#272730',
          strong: '#3f3f4e',
        },
        accent: {
          gold: '#c5a059',
          goldLight: '#e4c382',
          goldDark: '#997633',
        },
        muted: {
          DEFAULT: '#71717a',
          foreground: '#a1a1aa',
        },
        status: {
          approved: '#10b981',
          pending: '#f59e0b',
          rejected: '#f43f5e',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Playfair Display"', 'Newsreader', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.18em',
        editorial: '0.25em',
      },
      lineHeight: {
        tightest: '1.05',
        relaxed: '1.7',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
        'editorial': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'panel': '0 10px 30px -10px rgba(0, 0, 0, 0.8)',
      },
      gridTemplateColumns: {
        'editorial-12': 'repeat(12, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}
