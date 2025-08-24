'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Download, ExternalLink, FileText, Play, X, Calendar, Users } from 'lucide-react'

interface Deck {
  id: number
  title: string
  description: string
  thumbnail: string
  category: string
  date: string
  audience: string
  fileUrl: string
  previewUrl?: string
  slides: number
}

const decks: Deck[] = [
  {
    id: 1,
    title: "CoSA Maya Sponsorship Deck",
    description: "A sponsorship deck for CoSA's biggest project of the year.",
    thumbnail: "/maya.png",
    category: "Sponsorship",
    date: "November 2024",
    audience: "Maya",
    fileUrl: "/decks/Maya.pdf",
    previewUrl: "https://www.canva.com/design/DAGRRIwRTG0/wuI0l4zNrRb6Pjf_u3gAZA/view?utm_content=DAGRRIwRTG0&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h896df531c2",
    slides: 48
  },
  {
    id: 2,
    title: "Beach Hut KOL Deck",
    description: "Carefully selected influencers to promote the brand.",
    thumbnail: "/beachhut.jpg",
    category: "Partnership",
    date: "July 2025",
    audience: "DEG",
    fileUrl: "/decks/DEG.pdf",
    previewUrl: "https://www.canva.com/design/DAGsZkbRfvg/GIkYWWp8Oo_83kcOqTDp1Q/view?utm_content=DAGsZkbRfvg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h262596e95f",
    slides: 11
  },
  {
    id: 3,
    title: "Social Media Strategy",
    description: "A 7-day content strategy for the launch of the new brand on TikTok.",
    thumbnail: "/SMM.png",
    category: "Content Creation",
    date: "August 2025",
    audience: "Agency",
    fileUrl: "/decks/SMM.pdf",
    previewUrl: "https://docs.google.com/presentation/d/1irMNOudVjDrgeXdQtPmhDjWQhxCcruBuqy283IZKWtw/edit?usp=sharing",
    slides: 14
  }
]

export default function Decks() {
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null)
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

  const handleDownload = (deck: Deck) => {
    // In a real app, this would trigger a download
    console.log(`Downloading ${deck.title}`)
    // For demo purposes, we'll just open in a new tab
    window.open(deck.fileUrl, '_blank')
  }

  const handlePreview = (deck: Deck) => {
    if (deck.previewUrl) {
      window.open(deck.previewUrl, '_blank')
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-dark-700 dark:to-dark-600 py-20">
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
              Presentations & Decks
            </h2>
                         <p className="text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
               Check out my collection of presentations, pitches, and sponsorship decks.
             </p>
          </motion.div>

          {/* Decks Grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {decks.map((deck, index) => (
              <motion.div
                key={deck.id}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => setSelectedDeck(deck)}
              >
                <div className="bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 card-hover">
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={deck.thumbnail}
                      alt={deck.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePreview(deck)
                          }}
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                          title="Preview"
                        >
                          <Play size={20} className="text-white" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDownload(deck)
                          }}
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                          title="Download"
                        >
                          <Download size={20} className="text-white" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                        {deck.category}
                      </span>
                    </div>

                    {/* Slides Count */}
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-1 px-2 py-1 bg-black/30 backdrop-blur-sm rounded-full">
                        <FileText size={14} className="text-white" />
                        <span className="text-white text-sm font-medium">{deck.slides}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-dark-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                      {deck.title}
                    </h3>
                    <p className="text-dark-600 dark:text-dark-300 text-sm line-clamp-3">
                      {deck.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-dark-500 dark:text-dark-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{deck.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users size={14} />
                          <span>{deck.audience}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePreview(deck)
                        }}
                        disabled={!deck.previewUrl}
                        className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          deck.previewUrl
                            ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-900/30'
                            : 'bg-gray-100 dark:bg-dark-700 text-gray-400 dark:text-dark-500 cursor-not-allowed'
                        }`}
                      >
                        <Play size={16} />
                        <span>Preview</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDownload(deck)
                        }}
                        className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        <Download size={16} />
                        <span>Download</span>
                      </button>
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
        {selectedDeck && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedDeck(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-dark-800 rounded-2xl max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <img
                  src={selectedDeck.thumbnail}
                  alt={selectedDeck.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <button
                  onClick={() => setSelectedDeck(null)}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                >
                  <X size={24} className="text-white" />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedDeck.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-white/90 text-sm">
                    <span>{selectedDeck.category}</span>
                    <span>•</span>
                    <span>{selectedDeck.slides} slides</span>
                    <span>•</span>
                    <span>{selectedDeck.date}</span>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                <p className="text-dark-600 dark:text-dark-300">
                  {selectedDeck.description}
                </p>

                <div className="flex items-center justify-between text-sm text-dark-500 dark:text-dark-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Users size={16} />
                      <span>Target Audience: {selectedDeck.audience}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-4 pt-6 border-t border-gray-200 dark:border-dark-700">
                  {selectedDeck.previewUrl && (
                    <button
                      onClick={() => handlePreview(selectedDeck)}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                    >
                      <Play size={16} />
                      <span>Preview</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDownload(selectedDeck)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 rounded-lg transition-colors"
                  >
                    <Download size={16} />
                    <span>Download PDF</span>
                  </button>
                  <button
                    onClick={() => setSelectedDeck(null)}
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
