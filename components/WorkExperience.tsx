'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const experiences = [
  {
    title: 'AI Engineer',
    company: 'New Orange',
    period: 'Oct. 2025 – Present',
    description: 'Architecting secure-by-design AI solutions for enterprise clients. Engineering event-driven AI pipelines using N8N and Azure, ensuring robustness and compliance with EU AI Act requirements. Leading technical implementations that bridge AI capabilities with security-first design principles.',
    technologies: ['Secure AI Design', 'N8N', 'Azure', 'Event-Driven Architecture', 'EU AI Act'],
  },
  {
    title: 'AI Researcher',
    company: 'NXP Semiconductors',
    period: 'Mar. 2025 – Jun. 2025',
    description: 'Established benchmarks for EU AI Act Article 15 (Robustness, Accuracy, and Cybersecurity). Analyzed hardware-enforced access controls and secure boot mechanisms for embedded AI systems. Provided independent assurance reviews for AI system robustness in semiconductor environments.',
    technologies: ['EU AI Act Art. 15', 'Hardware Security', 'V&V', 'Embedded AI Security', 'Assurance'],
  },
  {
    title: 'Cybersecurity Consultant',
    company: 'V-S-E',
    period: 'Oct. 2024 – Apr. 2025',
    description: 'Performed comprehensive Cybersecurity GAP Analysis for ISO 21434 compliance in automotive engineering. Mapped technical workflows to international standards, driving implementation of policy into procedure while navigating organizational resistance. Delivered actionable recommendations for achieving regulatory compliance.',
    technologies: ['ISO 21434', 'GAP Analysis', 'Automotive Security', 'Policy Implementation', 'Risk Assessment'],
  },
  {
    title: 'CTF Participant & Security Researcher',
    company: 'Various Competitions',
    period: '2022 – 2024',
    description: 'Active participant in Capture The Flag events and ethical hacking initiatives. Transitioned from adversarial tactics to defensive security practices. Contributed to digital safety of Dutch municipalities through security assessments and vulnerability research.',
    technologies: ['CTF', 'Penetration Testing', 'Ethical Hacking', 'Vulnerability Research', 'Kali Linux'],
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
          <p className="text-xl text-steel-gray font-space max-w-2xl">
            Institutionalizing AI security practices and driving standards compliance
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
