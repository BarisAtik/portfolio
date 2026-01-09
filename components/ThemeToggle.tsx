'use client'

import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-14 glass-strong rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Sun Icon */}
      <motion.svg
        className="absolute w-6 h-6 text-soft-sand"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        initial={false}
        animate={{
          scale: theme === 'light' ? 1 : 0,
          rotate: theme === 'light' ? 0 : 180,
          opacity: theme === 'light' ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </motion.svg>

      {/* Moon Icon */}
      <motion.svg
        className="absolute w-6 h-6 text-soft-sand"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        initial={false}
        animate={{
          scale: theme === 'dark' ? 1 : 0,
          rotate: theme === 'dark' ? 0 : -180,
          opacity: theme === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </motion.svg>

      {/* Animated glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: theme === 'light'
            ? 'radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  )
}
