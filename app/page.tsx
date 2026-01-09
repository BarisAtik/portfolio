'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import WorkExperience from '@/components/WorkExperience'
import Projects from '@/components/Projects'
import Certificates from '@/components/Certificates'
import Skills from '@/components/Skills'
import Personal from '@/components/Personal'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <WorkExperience />
      <Projects />
      <Certificates />
      <Skills />
      <Personal />
      <Contact />
      <Footer />
    </main>
  )
}
