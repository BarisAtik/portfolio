'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const education = [
  {
    degree: 'M.Sc. Cyber Security & Artificial Intelligence',
    school: 'Radboud University',
    year: '2023 - 2025',
    focus: 'AI Security, Inference Attacks on MAMBA Architecture',
  },
  {
    degree: 'B.Sc. Computer Science',
    school: 'Radboud University',
    year: '2020 - 2023',
    focus: 'Minor in Artificial Intelligence, NFC Security',
  },
]

const certificates = [
  {
    title: 'Azure AI Engineer Associate',
    issuer: 'Microsoft',
    year: '2024',
    icon: '☁️',
  },
]

const ctfCompetitions = [
  'Hack Gemeente Nijmegen (2022-2024)',
  'Hack The Hague (2023)',
  'HALON CTF (2022-2023)',
  'SurfCTF (2023)',
  'Hack The Box (2022-2024)',
  'PicoCTF (2022)',
]

export default function Certificates() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="education" className="py-24 px-6 relative overflow-hidden">
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
            Education & Certificates
          </h2>
          <p className="text-xl text-steel-gray font-space max-w-2xl">
            Continuous learning and professional development
          </p>
        </motion.div>

        {/* Education */}
        <div className="mb-16">
          <h3 className="text-3xl font-playfair font-bold mb-8">Education</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="glass-strong p-6 rounded-xl hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-grow">
                    <h4 className="text-2xl font-playfair font-bold group-hover:text-warm-white transition-colors">
                      {edu.degree}
                    </h4>
                    <p className="text-lg text-steel-gray font-space mt-1">{edu.school}</p>
                  </div>
                  <span className="glass px-3 py-1 rounded-full text-xs font-space whitespace-nowrap ml-4">
                    {edu.year}
                  </span>
                </div>
                <p className="text-steel-gray">
                  <span className="text-warm-white font-medium">Focus:</span> {edu.focus}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div className="mb-16">
          <h3 className="text-3xl font-playfair font-bold mb-8">
            Professional Certificates
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="glass p-5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <div className="text-3xl mb-3">{cert.icon}</div>
                <h4 className="text-lg font-playfair font-bold mb-2 group-hover:text-warm-white transition-colors">
                  {cert.title}
                </h4>
                <p className="text-sm text-slate-muted font-space">{cert.issuer}</p>
                <p className="text-xs text-warm-white font-space mt-2">{cert.year}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTF Competitions */}
        <div>
          <h3 className="text-2xl font-playfair font-bold mb-6">
            CTF Competitions & Security Events
          </h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="glass-strong p-6 rounded-xl"
          >
            <div className="flex flex-wrap gap-3">
              {ctfCompetitions.map((ctf, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15, delay: 0.1 + index * 0.02 }}
                  className="glass px-4 py-2 rounded-full text-sm font-space hover:bg-white/10 transition-all"
                >
                  {ctf}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
