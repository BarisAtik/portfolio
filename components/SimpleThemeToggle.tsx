'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function SimpleThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage and system preference
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = stored || systemPreference
    setTheme(initialTheme)
    document.documentElement.classList.toggle('light', initialTheme === 'light')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('light', newTheme === 'light')
  }

  if (!mounted) {
    return <div className="w-10 h-10 sm:w-12 sm:h-12" /> // Placeholder to prevent layout shift
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-10 h-10 sm:w-12 sm:h-12 glass-strong rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group overflow-hidden flex-shrink-0"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Sun Icon */}
      <motion.svg
        className="absolute w-5 h-5 text-warm-white"
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
        className="absolute w-5 h-5 text-warm-white"
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
    </motion.button>
  )
}
