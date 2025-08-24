'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, ChevronLeft, ChevronRight, Play, Pause, Download, ExternalLink } from 'lucide-react'

interface GalleryItem {
  id: number
  title: string
  description: string
  type: 'image' | 'video'
  src: string
  thumbnail: string
  category: string
  tags: string[]
  aspectRatio: 'square' | 'portrait' | 'landscape' | 'wide'
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Cookie Advertisement",
    description: "An appealing cookie advertisement using Photoshop.",
    type: 'image',
    src: "/white_cookie.png",
    thumbnail: "/white_cookie.png",
    category: "Product",
    tags: ["Photoshop", "Product", "Branding"],
    aspectRatio: 'landscape'
  }
]

export default function VisualGallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }

  const getGridClass = (aspectRatio: string) => {
    switch (aspectRatio) {
      case 'portrait':
        return 'md:row-span-2'
      case 'wide':
        return 'md:col-span-2'
      case 'square':
        return ''
      default:
        return ''
    }
  }

  const handleItemClick = (item: GalleryItem, index: number) => {
    setSelectedItem(item)
    setCurrentIndex(index)
    setIsPlaying(false)
  }

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % galleryItems.length
    setCurrentIndex(nextIndex)
    setSelectedItem(galleryItems[nextIndex])
    setIsPlaying(false)
  }

  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1
    setCurrentIndex(prevIndex)
    setSelectedItem(galleryItems[prevIndex])
    setIsPlaying(false)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!selectedItem) return
    
    switch (e.key) {
      case 'Escape':
        setSelectedItem(null)
        break
      case 'ArrowRight':
        handleNext()
        break
      case 'ArrowLeft':
        handlePrevious()
        break
      case ' ':
        e.preventDefault()
        if (selectedItem.type === 'video') {
          setIsPlaying(!isPlaying)
        }
        break
    }
  }

  useEffect(() => {
    if (selectedItem) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedItem, currentIndex, isPlaying])

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying, selectedItem])

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-dark-600 dark:to-dark-500 py-20">
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
            variants={itemVariants}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              Visual Gallery
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              A collection of visual work, designs, and creative projects showcasing my artistic vision and technical skills.
            </p>
          </motion.div>

                     {/* Gallery Grid */}
           <motion.div
             variants={containerVariants}
             className={`grid gap-4 ${
               galleryItems.length === 1 
                 ? 'grid-cols-1 max-w-md mx-auto' 
                 : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
             }`}
           >
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className={`group cursor-pointer ${getGridClass(item.aspectRatio)}`}
                onClick={() => handleItemClick(item, index)}
              >
                <div className="relative overflow-hidden rounded-xl bg-white dark:bg-dark-800 shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Thumbnail */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white p-4">
                        {item.type === 'video' && (
                          <Play size={48} className="mx-auto mb-2" />
                        )}
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-sm opacity-90">{item.description}</p>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-block px-2 py-1 bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm text-xs font-medium rounded-full text-dark-900 dark:text-white">
                        {item.category}
                      </span>
                    </div>

                    {/* Video Indicator */}
                    {item.type === 'video' && (
                      <div className="absolute top-3 right-3">
                        <div className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Play size={16} className="text-white ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
              >
                <X size={24} className="text-white" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeft size={24} className="text-white" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRight size={24} className="text-white" />
              </button>

              {/* Content */}
              <div className="relative">
                {selectedItem.type === 'image' ? (
                  <img
                    src={selectedItem.src}
                    alt={selectedItem.title}
                    className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                  />
                ) : (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      src={selectedItem.src}
                      className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                      loop
                      muted
                    />
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause size={32} className="text-white" />
                      ) : (
                        <Play size={32} className="text-white ml-1" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Info Panel */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{selectedItem.title}</h3>
                    <p className="text-sm opacity-90">{selectedItem.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedItem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white/20 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => window.open(selectedItem.src, '_blank')}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      title="Open in new tab"
                    >
                      <ExternalLink size={16} />
                    </button>
                    <button
                      onClick={() => {
                        const link = document.createElement('a')
                        link.href = selectedItem.src
                        link.download = selectedItem.title
                        link.click()
                      }}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      title="Download"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Counter */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                {currentIndex + 1} / {galleryItems.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
