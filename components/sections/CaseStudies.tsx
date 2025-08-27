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
    link: "https://docs.google.com/document/d/1dCqvLiIvbZufHwWFFFV312RmtT2lacEeDIvw_mAGpZM/edit?usp=sharing",
    content: `
      <div class="space-y-6">
        <div>
          <h3 class="text-xl font-bold text-primary-600 dark:text-primary-400 mb-3">Project Overview</h3>
          <p class="text-dark-700 dark:text-dark-300 leading-relaxed">For Ateneo Blue Repertory's 32nd Season Finale, an original twin-bill musical, I was tasked with reviving ticket sales after the opening weekend filled only 16–25% of seats. PR only had ₱2,000 left for their budget and less than three days to act.</p>
        </div>
        
        <div>
          <h3 class="text-xl font-bold text-primary-600 dark:text-primary-400 mb-3">Strategy & Execution</h3>
          <p class="text-dark-700 dark:text-dark-300 leading-relaxed">Promoted to PR Deputy mid-run, I shifted focus from passive social media posting to active, campus-first engagement. I spearheaded a university-wide email blast with the subject line "FREE TICKETS?!" to grab attention, then launched a riddle-based treasure hunt using existing tarpaulins across campus. This guerrilla-style tactic sparked FOMO, boosted visibility, and created conversations that social alone wasn't achieving.</p>
        </div>
        
        <div>
          <h3 class="text-xl font-bold text-primary-600 dark:text-primary-400 mb-3">Results & Impact</h3>
          <div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r-lg">
            <p class="text-dark-700 dark:text-dark-300 leading-relaxed font-medium">The results were immediate and measurable: within one week, sales jumped <span class="text-green-600 dark:text-green-400 font-bold">300%</span>, average capacity rose to <span class="text-green-600 dark:text-green-400 font-bold">70%</span>, and the show broke even on its final day.</p>
          </div>
          <p class="text-dark-700 dark:text-dark-300 leading-relaxed mt-3">Beyond numbers, the campaign restored ticket value perception, generated positive audience feedback, and set a new benchmark for PR strategy within the organization.</p>
        </div>
        
        <div>
          <h3 class="text-xl font-bold text-primary-600 dark:text-primary-400 mb-3">Key Learnings</h3>
          <p class="text-dark-700 dark:text-dark-300 leading-relaxed">This experience sharpened my ability to think creatively under pressure, proving that with the right message and medium, even low-budget campaigns can deliver outsized impact.</p>
        </div>
      </div>
    `
  },
  {
    id: 2,
    title: "Marketing with Intention",
    description: "A case study on how surprising creative strategies not only captured attention but also boosted first-week ticket sales and sustained audience interest for a lesser-known production.",
    shortDescription: "A case study on how bold creative strategies drove strong first-week sales and sustained audience interest for a niche production.",
    image: "/theprom.jpg",
    category: "Musical",
    duration: "3 months",
    team: "1 Brand Designer",
    link: "https://docs.google.com/document/d/1pTbcnThrVneuqWd1qMHq-gvHqiJ-7FUM8wRRc8bn_RE/edit?usp=sharing",
    technologies: ["Marketing", "Branding", "Event Management"],
    content: `
      <div class="space-y-6">
        <div>
          <h3 class="text-xl font-bold text-primary-600 dark:text-primary-400 mb-3">Project Overview</h3>
          <p class="text-dark-700 dark:text-dark-300 leading-relaxed">
            For Ateneo Blue Repertory's 33rd Season Newbie Production, I served as Brand Manager for <em>The Prom</em> — a contemporary musical centered on inclusivity and self-expression. This was my first formal management role, where I was tasked with not only leading the creatives department but also ensuring the campaign delivered both visibility and ticket sales for a production less known than blueREP's flagship shows.
          </p>
        </div>

        <div>
          <h3 class="text-xl font-bold text-primary-600 dark:text-primary-400 mb-3">Strategy & Execution</h3>
          <p class="text-dark-700 dark:text-dark-300 leading-relaxed">
            The campaign was designed as a sequenced narrative where each tactic built on the last. We seeded curiosity through subtle PAC posts, then launched a faux "promposal" on Ateneo's LuxID Board — strategically minimal in branding to spark genuine intrigue. This was amplified through freedom wall takeovers across Ateneo, UP, and DLSU, generating over 1,800 likes and strong organic discussion.
          </p>
          <p class="text-dark-700 dark:text-dark-300 leading-relaxed mt-3">
            The centerpiece was a flashmob reveal at Gonzaga Cafeteria, synchronized with an email blast to 13,000 students and a polished After Effects title reveal video. From there, we activated demand through early bird sales and timed promos (including an 11.11 bundle sale), ensuring customer trust while driving momentum.
          </p>
        </div>

        <div>
          <h3 class="text-xl font-bold text-primary-600 dark:text-primary-400 mb-3">Results & Impact</h3>
          <div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r-lg">
            <p class="text-dark-700 dark:text-dark-300 leading-relaxed font-medium">
              The campaign delivered measurable impact: the title reveal video peaked at 
              <span class="text-green-600 dark:text-green-400 font-bold">40,000+ views</span> within a week; the 11.11 promo sold 
              <span class="text-green-600 dark:text-green-400 font-bold">200+ tickets in a single day</span>; and across its run, the production sold 
              <span class="text-green-600 dark:text-green-400 font-bold">1,163 tickets</span> despite one canceled show, averaging near-full capacity (180 seats) per performance.
            </p>
          </div>
          <p class="text-dark-700 dark:text-dark-300 leading-relaxed mt-3">
            Beyond numbers, the campaign blurred the line between real and staged experiences — with students, faculty, and even outsiders believing the stunts were genuine — while also rebuilding trust in blueREP's ticketing practices after past consumer frustrations.
          </p>
        </div>

        <div>
          <h3 class="text-xl font-bold text-primary-600 dark:text-primary-400 mb-3">Key Learnings</h3>
          <p class="text-dark-700 dark:text-dark-300 leading-relaxed">
            Leading my first management role taught me the importance of intentionality in campaign design and the value of aligning creative stunts with measurable goals. By connecting strategy, execution, and storytelling, I learned how surprise-driven marketing can generate sustained attention and drive consistent sales, even for productions without built-in name recognition.
          </p>
        </div>
      </div>
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
              <div className="p-8 space-y-8">
                {/* Meta Info */}
                <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-6">
                  <div className="flex flex-wrap gap-6 text-sm text-dark-600 dark:text-dark-300">
                    <div className="flex items-center space-x-2">
                      <Calendar size={18} className="text-primary-600 dark:text-primary-400" />
                      <span className="font-medium">{selectedCase.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users size={18} className="text-primary-600 dark:text-primary-400" />
                      <span className="font-medium">{selectedCase.team}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Code size={18} className="text-primary-600 dark:text-primary-400" />
                      <span className="font-medium">{selectedCase.technologies.join(', ')}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none space-y-8"
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
