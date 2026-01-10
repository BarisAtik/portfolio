'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const experiences = [
  {
    title: 'AI Engineer',
    company: 'New Orange',
    period: '2025 - Present',
    description: 'Working as an AI Engineer at New Orange, a digital agency, developing and implementing AI solutions for clients. Building innovative AI-powered applications and contributing to cutting-edge digital transformation projects.',
    technologies: ['AI Development', 'Machine Learning', 'Digital Solutions', 'Client Projects'],
  },
  {
    title: 'Cybersecurity Engineer',
    company: 'VSE',
    period: '2024',
    description: 'Conducting research and compliance analysis regarding European ISO standards (ISO 21434) for cybersecurity in automotive/engineering contexts. Ensuring systems meet rigorous security requirements for modern connected vehicles.',
    technologies: ['ISO 21434', 'Automotive Security', 'Compliance Analysis', 'Risk Assessment'],
  },
  {
    title: 'AI Security Researcher Intern',
    company: 'NXP Semiconductors',
    period: '2024',
    description: 'Conducted research internship focused on EU AI Security at NXP Semiconductors in Eindhoven. Worked on cutting-edge AI security challenges in semiconductor and embedded systems contexts.',
    technologies: ['EU AI Act', 'AI Security', 'Embedded Systems', 'Security Research'],
  },
  {
    title: 'CTF Participant & Security Researcher',
    company: 'Various Competitions',
    period: '2022 - 2024',
    description: 'Active participant in Capture The Flag events and ethical hacking initiatives. Contributed to digital safety of Dutch municipalities through security assessments and vulnerability research.',
    technologies: ['Kali Linux', 'Penetration Testing', 'Ethical Hacking', 'CTF Platforms'],
  },
]

function ExperienceCard({ experience, index }: { experience: typeof experiences[0], index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className="relative pl-8 pb-12 border-l-2 border-white/10 last:pb-0"
    >
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-steel-gray border-4 border-rich-black" />

      <div className="glass p-6 rounded-xl hover:bg-white/10 transition-all duration-300 group">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
          <div>
            <h3 className="text-2xl font-playfair font-bold group-hover:text-warm-white transition-colors">
              {experience.title}
            </h3>
            <p className="text-lg text-steel-gray font-space mt-1">{experience.company}</p>
          </div>
          <span className="glass-strong px-4 py-2 rounded-full text-sm font-space">
            {experience.period}
          </span>
        </div>

        <p className="text-steel-gray leading-relaxed mb-4 hidden md:block">
          {experience.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-space"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function WorkExperience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="experience" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 noise-texture opacity-50" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-6xl font-playfair font-bold mb-4">
            Work Experience
          </h2>
          <p className="text-xl text-slate-muted font-space max-w-2xl">
            Contributing to cybersecurity standards and ethical hacking initiatives
          </p>
        </motion.div>

        <div className="space-y-0">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
