'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const contactMethods = [
  {
    icon: '📧',
    label: 'Email',
    value: 'bariscagriatik@gmail.com',
    link: 'mailto:bariscagriatik@gmail.com',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: 'linkedin.com/in/cagri-atik',
    link: 'https://linkedin.com/in/cagri-atik',
  },
  {
    icon: '📱',
    label: 'Phone',
    value: '+31 6 2616 6090',
    link: 'tel:+31626166090',
  },
  {
    icon: '📍',
    label: 'Location',
    value: 'Ede, Netherlands',
    link: 'https://www.google.com/maps/place/Ede,+Netherlands',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-emerald/5 to-transparent" />
      <div className="absolute inset-0 noise-texture opacity-50" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-6xl font-playfair font-bold mb-4">
            Let's Connect
          </h2>
          <p className="text-xl text-steel-gray font-space max-w-2xl mx-auto">
            Open to exciting opportunities in cybersecurity and AI security research
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-strong p-6 rounded-xl hover:bg-white/15 transition-all duration-300 group cursor-pointer hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl group-hover:scale-110 transition-transform">
                  {method.icon}
                </div>
                <div className="text-left">
                  <p className="text-sm text-steel-gray font-space mb-1">{method.label}</p>
                  <p className="text-lg font-space text-warm-white group-hover:text-warm-white transition-colors">
                    {method.value}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
