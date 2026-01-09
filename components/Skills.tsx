'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const skillCategories = [
  {
    category: 'Programming Languages',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'C++', level: 85 },
      { name: 'Java', level: 82 },
      { name: 'Haskell', level: 75 },
    ],
  },
  {
    category: 'Security Tools',
    skills: [
      { name: 'Kali Linux', level: 90 },
      { name: 'Penetration Testing', level: 88 },
      { name: 'Cryptography', level: 85 },
      { name: 'ISO 21434', level: 80 },
    ],
  },
  {
    category: 'AI & Machine Learning',
    skills: [
      { name: 'PyTorch', level: 90 },
      { name: 'TensorFlow', level: 88 },
      { name: 'MAMBA Architecture', level: 85 },
      { name: 'AI Security', level: 92 },
    ],
  },
  {
    category: 'Systems & Platforms',
    skills: [
      { name: 'Linux', level: 93 },
      { name: 'Windows', level: 85 },
      { name: 'MacOS', level: 88 },
      { name: 'Git', level: 90 },
    ],
  },
  {
    category: 'Web Technologies',
    skills: [
      { name: 'HTML/CSS', level: 82 },
      { name: 'JavaScript', level: 78 },
      { name: 'React/Next.js', level: 75 },
      { name: 'Web Security', level: 88 },
    ],
  },
  {
    category: 'CTF & Hacking',
    skills: [
      { name: 'Hack The Box', level: 85 },
      { name: 'CTF Challenges', level: 88 },
      { name: 'Ethical Hacking', level: 90 },
      { name: 'Vulnerability Research', level: 87 },
    ],
  },
]

function SkillBar({ skill, index }: { skill: { name: string; level: number }, index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-space text-sm text-warm-white">{skill.name}</span>
        <span className="font-space text-xs text-steel-gray">{skill.level}%</span>
      </div>
      <div className="h-2 glass rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 0.3, delay: index * 0.02, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-steel-gray to-warm-white rounded-full"
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 noise-texture opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-steel-gray font-space max-w-2xl">
            Expertise in cybersecurity, AI systems, and penetration testing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.2, delay: categoryIndex * 0.03 }}
              className="glass-strong p-6 rounded-xl hover:bg-white/15 transition-all duration-300"
            >
              <h3 className="text-2xl font-playfair font-bold mb-6">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar key={skillIndex} skill={skill} index={skillIndex} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="mt-16 glass-strong p-8 rounded-2xl"
        >
          <h3 className="text-2xl font-playfair font-bold mb-6 text-center">
            Additional Technologies
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              'JAX',
              'CUDA',
              'OpenCV',
              'Ray',
              'Weights & Biases',
              'Pinecone',
              'ChromaDB',
              'Airflow',
              'Apache Spark',
              'Grafana',
              'Prometheus',
              'TensorRT',
              'ONNX',
              'Triton',
              'Jupyter',
              'Streamlit',
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15, delay: 0.1 + index * 0.05 }}
                className="glass px-4 py-2 rounded-full text-sm font-space hover:bg-white/10 transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
