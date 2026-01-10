'use client'

import { motion } from 'framer-motion'
import NeuralNetwork from './NeuralNetwork'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Neural Network Background */}
      <div className="absolute inset-0">
        <NeuralNetwork />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.02]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-8 text-center relative"
        >
          {/* Frosted glass backdrop - mobile only */}
          <div className="absolute inset-0 md:hidden backdrop-blur-md bg-black/30 rounded-3xl -z-10" />

          <h1 className="font-playfair font-bold text-4xl md:text-7xl lg:text-8xl leading-tight">
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="block"
            >
              Securing the
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="block"
            >
              Future of AI
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="hero-description text-base md:text-2xl md:text-steel-gray max-w-2xl mx-auto leading-relaxed font-space font-semibold"
          >
            Master's student in Cyber Security & Artificial Intelligence combining deep knowledge of AI systems with
            specialized expertise in cybersecurity. Focused on AI security, specifically protecting systems against adversarial
            threats like inference attacks on MAMBA architectures.
          </motion.p>

          {/* Desktop notice - mobile only */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="md:hidden text-sm text-black/80 dark:text-white/90 italic font-space mt-4"
          >
            For the complete experience, visit on desktop
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a
              href="#projects"
              className="glass-strong px-8 py-4 rounded-lg font-space text-sm tracking-wide hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="glass-strong px-8 py-4 rounded-lg font-space text-sm tracking-wide hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
