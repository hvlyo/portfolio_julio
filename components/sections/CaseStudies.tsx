'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, X, ArrowRight, Calendar, Users, Code } from 'lucide-react'

interface CaseStudy {
  id: number
  title: string
  description: string
  shortDescription: string
  image: string
  category: string
  duration: string
  team: string
  technologies: string[]
  link?: string
  content: string
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Driving 300% Growth in One Week",
    description: "A rapid sales turnaround campaign for blueREP’s 32nd Finale Production, driving a 300% increase in the final week and achieving break-even.",
    shortDescription: "Sales turnaround for blueREP’s 32nd Finale, boosting final-week sales to reach break-even.",
         image: "/twb.jpg",
    category: "Musical",
    duration: "3 months",
    team: "1 Promotions Manager",
         technologies: ["Sales", "Marketing", "Branding", "Event Management"],
    link: "https://example.com",
    content: `
      <h3>Project Overview</h3>
      <p>No description available.</p>
      <ul>
      </ul>
    `
  },
  {
    id: 2,
    title: "Story-Led Marketing for blueREP’s Production",
    description: "We developed a progressive, story-driven marketing campaign for blueREP that stood out through its innovative approach and use of emerging advertising channels.",
    shortDescription: "A progressive, story-driven campaign that leveraged new advertising channels to boost awareness and drive ticket sales.",
    image: "/theprom.jpg",
    category: "Musical",
    duration: "3 months",
    team: "1 Brand Designer",
    technologies: ["Marketing", "Branding", "Event Management"],
    content: `
            <h3>Project Overview</h3>
      <p>No description available.</p>
      <ul>
      </ul>
    `
  }
]

export default function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-dark-800 dark:to-dark-700 py-20">
      <div className="container-max section-padding">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div
            variants={cardVariants}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              Case Studies
            </h2>
                         <p className="text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
               Showcasing past projects and their impact on organizational growth, user experiences, and key stakeholders.
             </p>
          </motion.div>

          {/* Case Studies Grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            {caseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.id}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => setSelectedCase(caseStudy)}
              >
                <div className="bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 card-hover">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                        {caseStudy.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-dark-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {caseStudy.title}
                    </h3>
                    <p className="text-dark-600 dark:text-dark-300 line-clamp-3">
                      {caseStudy.shortDescription}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-dark-500 dark:text-dark-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar size={16} />
                          <span>{caseStudy.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users size={16} />
                          <span>{caseStudy.team}</span>
                        </div>
                      </div>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-xs font-medium rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {caseStudy.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-xs font-medium rounded">
                          +{caseStudy.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-dark-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-64 overflow-hidden rounded-t-2xl">
                <img
                  src={selectedCase.image}
                  alt={selectedCase.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <button
                  onClick={() => setSelectedCase(null)}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                >
                  <X size={24} className="text-white" />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedCase.title}
                  </h2>
                  <p className="text-white/90">
                    {selectedCase.description}
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-sm text-dark-500 dark:text-dark-400">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{selectedCase.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users size={16} />
                    <span>{selectedCase.team}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Code size={16} />
                    <span>{selectedCase.technologies.join(', ')}</span>
                  </div>
                </div>

                {/* Content */}
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedCase.content }}
                />

                {/* Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-dark-700">
                  {selectedCase.link && (
                    <a
                      href={selectedCase.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span>View Project</span>
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="px-4 py-2 border border-gray-300 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
