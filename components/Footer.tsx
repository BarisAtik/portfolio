'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 px-6 border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 noise-texture opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <p className="text-2xl font-playfair font-bold mb-2">
              AI Engineer
            </p>
            <p className="text-sm text-steel-gray font-space">
              Building intelligent systems that matter
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex gap-6"
          >
            <a
              href="#experience"
              className="text-steel-gray hover:text-warm-white transition-colors font-space text-sm"
            >
              Experience
            </a>
            <a
              href="#projects"
              className="text-steel-gray hover:text-warm-white transition-colors font-space text-sm"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="text-steel-gray hover:text-warm-white transition-colors font-space text-sm"
            >
              Skills
            </a>
            <a
              href="#contact"
              className="text-steel-gray hover:text-warm-white transition-colors font-space text-sm"
            >
              Contact
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <a
              href="https://linkedin.com/in/cagri-atik"
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-3 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-white/10 text-center"
        >
          <p className="text-sm text-steel-gray font-space">
            © {currentYear} AI Engineer Portfolio. Built with Next.js, TypeScript, and Framer Motion.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
