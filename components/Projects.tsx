'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  {
    title: 'Inference Attacks on MAMBA',
    description: 'Establishing risk profiles for novel AI architectures. Master thesis research analyzing adversarial vulnerabilities in MAMBA state-space models, contributing to the understanding of emerging AI security threats.',
    category: 'AI Security Research',
    technologies: ['PyTorch', 'MAMBA', 'Python', 'Adversarial ML'],
    impact: 'Thesis research 2024-2025',
    span: 'col-span-2 row-span-2',
  },
  {
    title: 'NFC Security Protocol Analysis',
    description: 'Security protocol analysis examining cryptographic vulnerabilities in Near Field Communication implementations. Bachelor thesis establishing security baseline for contactless communication systems.',
    category: 'Security Research',
    technologies: ['NFC', 'Cryptography', 'C++', 'Protocol Analysis'],
    impact: 'Published 2023',
    span: 'col-span-1 row-span-1',
  },
  {
    title: 'ISO 21434 Implementation',
    description: 'Driving the implementation of policy into procedure for automotive cybersecurity standards. Navigated organizational resistance while mapping technical workflows to international compliance requirements.',
    category: 'Automotive Security',
    technologies: ['ISO 21434', 'Risk Assessment', 'GAP Analysis', 'V&V'],
    impact: 'VSE Project 2024-2025',
    span: 'col-span-1 row-span-1',
  },
  {
    title: 'ISO 9001 & 27001 Project',
    description: 'Integrated implementation of Quality Management and Information Security Management standards, establishing frameworks for continuous improvement and security governance.',
    category: 'Compliance & Standards',
    technologies: ['ISO 9001', 'ISO 27001', 'Compliance', 'Risk Management'],
    impact: 'Standards Implementation',
    span: 'col-span-2 row-span-1',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className={`md:${project.span} glass p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-500" />

      <div className="relative z-10 h-full flex flex-col">
        <div className="mb-4">
          <span className="text-xs font-space text-steel-gray tracking-wider uppercase">
            {project.category}
          </span>
          <h3 className="text-2xl font-playfair font-bold mt-2 group-hover:text-warm-white transition-colors">
            {project.title}
          </h3>
        </div>

        <p className="text-steel-gray leading-relaxed mb-4 flex-grow">
          {project.description}
        </p>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-rich-black/50 border border-white/10 rounded-lg text-xs font-space"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="glass-strong px-4 py-2 rounded-lg inline-block">
            <span className="text-sm font-space text-warm-white">
              ⚡ {project.impact}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden">
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
            Featured Projects
          </h2>
          <p className="text-xl text-steel-gray font-space max-w-2xl">
            AI security research, standards implementation, and protocol analysis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
