'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const hobbies = [
  {
    icon: '📚',
    title: 'Reading',
    description: 'Deep diving into AI research papers and behavioral psychology',
    details: 'Favorite: "The Laws of Human Nature"',
  },
  {
    icon: '🎮',
    title: 'Gaming',
    description: 'Strategy games and exploring game AI mechanics',
    details: 'Interested in procedural generation',
  },
  {
    icon: '✈️',
    title: 'Travel',
    description: 'Exploring new cultures and tech hubs around the world, up next: Japan🇯🇵',
    details: 'Visited 10+ countries',
  },
  {
    icon: '🏋️',
    title: 'HYROX',
    description: 'Fitness racing combining running and functional workouts',
    details: 'Training for competitive events',
  },
  {
    icon: '🏃',
    title: 'Running',
    description: 'Loving a jog through nature',
    details: 'Just enjoying the scenery and being outdoors',
  },
  {
    icon: '🥊',
    title: 'Boxing',
    description: 'Training in boxing for fitness and discipline',
    details: 'Building strength and focus',
  },
]

const interests = [
  'Open Source AI',
  'AI Safety & Ethics',
  'Sustainable Tech',
  'Philosophy of Mind',
  'Robotics',
]

export default function Personal() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="personal" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 noise-texture opacity-50" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-6xl font-playfair font-bold mb-4">
            Beyond the Code
          </h2>
          <p className="text-xl text-steel-gray font-space max-w-2xl">
            What drives me outside of engineering
          </p>
        </motion.div>

        {/* Hobbies Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-16">
          {hobbies.map((hobby, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              className="glass-strong p-3 sm:p-6 rounded-xl hover:bg-white/15 transition-all duration-300 group cursor-pointer"
            >
              <div className="text-3xl sm:text-5xl mb-2 sm:mb-4 group-hover:scale-110 transition-transform text-center sm:text-left">
                {hobby.icon}
              </div>
              <h3 className="text-sm sm:text-2xl font-playfair font-bold sm:mb-2 group-hover:text-warm-white transition-colors text-center sm:text-left">
                {hobby.title}
              </h3>
              <p className="text-steel-gray mb-3 leading-relaxed hidden sm:block">{hobby.description}</p>
              <p className="text-sm text-warm-white font-space hidden sm:block">{hobby.details}</p>
            </motion.div>
          ))}
        </div>

        {/* Interests Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="hidden md:block glass-strong p-8 md:p-12 rounded-2xl"
        >
          <h3 className="text-3xl font-playfair font-bold mb-8 text-center">
            Areas of Interest
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {interests.map((interest, index) => (
              <motion.div
                key={interest}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.2, delay: 0.1 + index * 0.02 }}
                className="glass px-6 py-3 rounded-full font-space text-sm hover:bg-white/10 hover:scale-105 transition-all cursor-default"
              >
                {interest}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Personal Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.2, delay: 0.15 }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <p className="text-xl md:text-2xl text-steel-gray leading-relaxed font-space italic">
            "I believe AI should augment human capabilities, not replace them.
            My goal is to build systems that empower people to achieve more than
            they thought possible."
          </p>
          <div className="mt-8 h-1 w-24 bg-gradient-to-r from-steel-gray to-warm-white mx-auto rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}
