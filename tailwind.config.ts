import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark mode - professional monochrome
        'rich-black': '#0a0a0b',
        'charcoal': '#1a1a1a',
        'soft-white': '#f5f5f5',
        'warm-white': '#fafafa',
        'steel-gray': '#71717a',
        'subtle-gray': '#a1a1aa',
        // Light mode - clean whites
        'paper-white': '#ffffff',
        'off-white': '#fafaf9',
        'ink-black': '#18181b',
        'medium-gray': '#52525b',
        // Minimal accent
        'accent-line': '#27272a',
      },
      fontFamily: {
        'bricolage': ['Bricolage Grotesque', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
        'space': ['Space Grotesk', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.333rem', { lineHeight: '2rem' }],
        '2xl': ['1.777rem', { lineHeight: '2.25rem' }],
        '3xl': ['2.369rem', { lineHeight: '2.5rem' }],
        '4xl': ['3.157rem', { lineHeight: '3rem' }],
        '5xl': ['4.209rem', { lineHeight: '1' }],
        '6xl': ['5.61rem', { lineHeight: '1' }],
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-in': 'slideIn 0.7s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
