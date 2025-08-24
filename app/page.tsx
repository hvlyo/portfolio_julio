'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Hero from '@/components/sections/Hero'
import CaseStudies from '@/components/sections/CaseStudies'
import Decks from '@/components/sections/Decks'
import VisualGallery from '@/components/sections/VisualGallery'
import CreativeSandbox from '@/components/sections/CreativeSandbox'
import Contact from '@/components/sections/Contact'

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const { scrollYProgress } = useScroll()
  
  const sections = [
    { id: 'hero', component: Hero },
    { id: 'case-studies', component: CaseStudies },
    { id: 'decks', component: Decks },
    { id: 'gallery', component: VisualGallery },
    { id: 'sandbox', component: CreativeSandbox },
    { id: 'contact', component: Contact },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const sectionIndex = Math.floor(scrollPosition / windowHeight)
      setCurrentSection(Math.min(sectionIndex, sections.length - 1))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections.length])

  return (
    <main className="relative min-h-screen">
      <Navigation currentSection={currentSection} sections={sections} />
      
      <div className="relative">
        {sections.map((section, index) => {
          const SectionComponent = section.component
          return (
            <section
              key={section.id}
              id={section.id}
              className="min-h-screen w-full"
            >
              <SectionComponent />
            </section>
          )
        })}
      </div>
      
      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
    </main>
  )
}
