'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

interface NavigationProps {
  currentSection: number
  sections: Array<{ id: string; component: React.ComponentType }>
}

export default function Navigation({ currentSection, sections }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const sectionNames = {
    'hero': 'Home',
    'case-studies': 'Case Studies',
    'decks': 'Decks',
    'gallery': 'Gallery',
    'sandbox': 'Sandbox',
    'contact': 'Contact'
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container-max section-padding">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold gradient-text cursor-pointer"
              onClick={() => scrollToSection('hero')}
            >
              Julio Velasquez
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(section.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    currentSection === index
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-dark-600 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  {sectionNames[section.id as keyof typeof sectionNames]}
                  {currentSection === index && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-30 md:hidden bg-white/95 dark:bg-dark-900/95 backdrop-blur-md border-b border-gray-200 dark:border-dark-700"
          >
            <div className="container-max section-padding py-4">
              <div className="flex flex-col space-y-2">
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      currentSection === index
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-dark-600 dark:text-dark-400 hover:bg-gray-50 dark:hover:bg-dark-800'
                    }`}
                  >
                    {sectionNames[section.id as keyof typeof sectionNames]}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Dots Indicator */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
        <div className="flex flex-col space-y-3">
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => scrollToSection(section.id)}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index
                  ? 'bg-primary-500 scale-125'
                  : 'bg-gray-300 dark:bg-dark-600 hover:bg-primary-300 dark:hover:bg-primary-600'
              }`}
              aria-label={`Go to ${sectionNames[section.id as keyof typeof sectionNames]}`}
            >
              {currentSection === index && (
                <motion.div
                  layoutId="activeDotIndicator"
                  className="absolute inset-0 rounded-full bg-primary-500"
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </>
  )
}
