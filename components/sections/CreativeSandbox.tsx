'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, Pause, RotateCcw, ExternalLink, Code, Zap, Palette, Music } from 'lucide-react'

interface SandboxProject {
  id: number
  title: string
  description: string
  type: 'canvas' | 'animation' | 'interactive' | 'experiment' | 'website'
  thumbnail: string
  category: string
  tags: string[]
  embedUrl?: string
  demoUrl?: string
}

const sandboxProjects: SandboxProject[] = [
  {
    id: 1,
    title: "Ateneo Blue Repertory Website (Unofficial)",
    description: "Played around with different designs and animations.",
         type: 'website',
    thumbnail: "/bluerep.png",
    category: "Website",
    tags: ["Theatre", "Musical", "Website"],
    demoUrl: "https://ateneobluerep.netlify.app/"
  }
]

// Particle System Component
function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
    }> = []

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      })
    }

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      if (!isPlaying) return

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Mouse interaction
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          const angle = Math.atan2(dy, dx)
          particle.vx -= Math.cos(angle) * 0.5
          particle.vy -= Math.sin(angle) * 0.5
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Connect nearby particles
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 100)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    if (isPlaying) {
      animate()
    }

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  return (
    <div className="relative bg-black rounded-xl overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-64 cursor-crosshair"
      />
      <div className="absolute top-4 left-4 flex space-x-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
        >
          {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white" />}
        </button>
        <button
          onClick={() => setIsPlaying(false)}
          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
        >
          <RotateCcw size={16} className="text-white" />
        </button>
      </div>
    </div>
  )
}

// Audio Visualizer Component
function AudioVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const bars = 64
    const barWidth = canvas.width / bars
    const barHeights = new Array(bars).fill(0)

    const animate = () => {
      if (!isPlaying) return

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < bars; i++) {
        const height = Math.random() * canvas.height * 0.8
        barHeights[i] = height

        const gradient = ctx.createLinearGradient(0, canvas.height - height, 0, canvas.height)
        gradient.addColorStop(0, `hsl(${200 + i * 2}, 70%, 60%)`)
        gradient.addColorStop(1, `hsl(${200 + i * 2}, 70%, 40%)`)

        ctx.fillStyle = gradient
        ctx.fillRect(i * barWidth, canvas.height - height, barWidth - 2, height)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    if (isPlaying) {
      animate()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  return (
    <div className="relative bg-black rounded-xl overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-64"
      />
      <div className="absolute top-4 left-4 flex space-x-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
        >
          {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white" />}
        </button>
        <Music size={16} className="text-white" />
      </div>
    </div>
  )
}

export default function CreativeSandbox() {
  const [selectedProject, setSelectedProject] = useState<SandboxProject | null>(null)
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

  const renderDemo = (project: SandboxProject) => {
    if (project.type === 'website') {
      return (
        <div className="w-full h-64 bg-gradient-to-br from-primary-400 to-purple-600 rounded-xl flex items-center justify-center relative overflow-hidden">
          <img 
            src={project.thumbnail} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )
    }
    
    switch (project.id) {
      case 1:
        return <ParticleSystem />
      case 2:
        return <AudioVisualizer />
      default:
        return (
          <div className="w-full h-64 bg-gradient-to-br from-primary-400 to-purple-600 rounded-xl flex items-center justify-center">
            <div className="text-center text-white">
              <Code size={48} className="mx-auto mb-4" />
              <p className="text-lg font-medium">Interactive Demo</p>
              <p className="text-sm opacity-90">Click to explore</p>
            </div>
          </div>
        )
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-orange-50 dark:from-dark-500 dark:to-dark-400 py-20">
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
              Creative Sandbox
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              Experimental projects, interactive demos, and creative coding experiments that push the boundaries of web technology.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            className={`grid gap-8 ${
              sandboxProjects.length === 1 
                ? 'grid-cols-1 max-w-lg mx-auto' 
                : 'md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {sandboxProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 card-hover">
                  {/* Demo Area */}
                  <div className="relative">
                    {renderDemo(project)}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white p-4">
                        <Zap size={48} className="mx-auto mb-2" />
                        <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                        <p className="text-sm opacity-90">Click to explore</p>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                        {project.category}
                      </span>
                    </div>

                                         {/* Type Icon */}
                     <div className="absolute top-4 right-4">
                       <div className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                         {project.type === 'canvas' && <Code size={16} className="text-white" />}
                         {project.type === 'animation' && <Palette size={16} className="text-white" />}
                         {project.type === 'interactive' && <Zap size={16} className="text-white" />}
                         {project.type === 'experiment' && <Music size={16} className="text-white" />}
                         {project.type === 'website' && <Code size={16} className="text-white" />}
                       </div>
                     </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-dark-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-dark-600 dark:text-dark-300 text-sm">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-xs font-medium rounded"
                        >
                          {tag}
                        </span>
                      ))}
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
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
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
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-purple-600" />
                <div className="absolute inset-0 flex items-center justify-center">
                  {renderDemo(selectedProject)}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedProject.title}
                  </h2>
                  <p className="text-white/90">
                    {selectedProject.description}
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full">
                      {selectedProject.category}
                    </span>
                    <span className="text-sm text-dark-500 dark:text-dark-400">
                      {selectedProject.type}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-4 pt-6 border-t border-gray-200 dark:border-dark-700">
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedProject(null)}
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
