'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const skillCategories = [
  {
    category: 'Frameworks & Standards',
    skills: [
      { name: 'EU AI Act', level: 'Expert' },
      { name: 'ISO 21434', level: 'Advanced' },
      { name: 'ISO 27001', level: 'Advanced' },
      { name: 'NIS2', level: 'Advanced' },
      { name: 'NIST CSF', level: 'Proficient' },
      { name: 'NIST SP 800-30', level: 'Proficient' },
      { name: 'IEC 62443', level: 'Proficient' },
    ],
  },
  {
    category: 'Assurance & Governance',
    skills: [
      { name: 'Verification & Validation (V&V)', level: 'Expert' },
      { name: 'Control Effectiveness', level: 'Expert' },
      { name: 'Management Reporting', level: 'Advanced' },
      { name: 'GAP Analysis', level: 'Expert' },
      { name: 'Risk Assessment', level: 'Expert' },
    ],
  },
  {
    category: 'AI Security',
    skills: [
      { name: 'Secure Agentic AI Design', level: 'Expert' },
      { name: 'Inference Attack Mitigation', level: 'Expert' },
      { name: 'Adversarial Robustness', level: 'Expert' },
      { name: 'MAMBA Architecture Security', level: 'Advanced' },
    ],
  },
  {
    category: 'Programming Languages',
    skills: [
      { name: 'Python', level: 'Advanced' },
      { name: 'C++', level: 'Advanced' },
      { name: 'Java', level: 'Advanced' },
      { name: 'Haskell', level: 'Proficient' },
    ],
  },
  {
    category: 'Security Tools & Techniques',
    skills: [
      { name: 'Penetration Testing', level: 'Proficient' },
      { name: 'Kali Linux', level: 'Expert' },
      { name: 'Cryptography', level: 'Expert' },
      { name: 'Vulnerability Research', level: 'Expert' },
    ],
  },
  {
    category: 'AI & Machine Learning',
    skills: [
      { name: 'PyTorch', level: 'Expert' },
      { name: 'TensorFlow', level: 'Advanced' },
      { name: 'Event-Driven AI Pipelines', level: 'Advanced' },
      { name: 'n8n Automation', level: 'Expert' },
    ],
  },
]

function SkillBadge({ skill, index }: { skill: { name: string; level: string }, index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  const levelColors = {
    'Expert': 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-emerald-500/40 text-emerald-200',
    'Advanced': 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/40 text-blue-200',
    'Proficient': 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border-purple-500/40 text-purple-200',
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.2, delay: index * 0.02 }}
      className="flex justify-between items-center group"
    >
      <span className="font-space text-sm text-warm-white group-hover:text-white transition-colors">
        {skill.name}
      </span>
      <span className={`font-space text-xs px-3 py-1 rounded-full border ${levelColors[skill.level as keyof typeof levelColors]} transition-all`}>
        {skill.level}
      </span>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <section id="skills" className="hidden md:block py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 noise-texture opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-6xl font-playfair font-bold mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-steel-gray font-space max-w-2xl">
            Specialized expertise in AI security governance, assurance frameworks, and secure-by-design AI systems
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
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBadge key={skillIndex} skill={skill} index={skillIndex} />
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
              'Azure',
              'CUDA',
              'Jupyter',
              'Git',
              'Linux',
              'Docker',
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
