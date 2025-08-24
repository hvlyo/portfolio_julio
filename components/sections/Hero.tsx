'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Mail, Phone, Linkedin, Github, Twitter, Download, Facebook, Instagram } from 'lucide-react'
import Image from 'next/image'

// Custom TikTok Icon Component
const TikTokIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

export default function Hero() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'jvelasquez.contact@gmail.com', href: 'mailto:jvelasquez.contact@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+63 945 773 6088', href: 'tel:+639457736088' },
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/djuliovelasquez', href: 'https://linkedin.com/in/djuliovelasquez' },
  ]

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/hvlyo' },
    { icon: Twitter, label: 'Twitter', href: 'https://x.com/djuliovelasquez' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/djuliovelasquez' },
    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/djuliovelasquez' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/jvliuo' },
    { icon: TikTokIcon, label: 'TikTok', href: 'https://tiktok.com/@jujupitur' },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 pt-safe pb-safe">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container-max section-padding relative z-10 flex flex-col justify-center min-h-screen pt-8 md:pt-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
                             <motion.h1
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
               >
                                                   <span className="gradient-text">Julio Velasquez</span>
                  <br />
                  <span className="text-dark-800 dark:text-white text-3xl md:text-4xl lg:text-5xl">Brand & Marketing Strategist</span>
               </motion.h1>
              
                             <motion.p
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.4 }}
                 className="text-xl md:text-2xl text-dark-600 dark:text-dark-300 max-w-2xl"
               >
                 Building impactful brand experiences that blend data with creativity. 
                 Specializing in digital marketing, performance insights, and team leadership.
               </motion.p>
            </div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-3"
            >
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="flex items-center space-x-3 text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
                >
                  <contact.icon size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{contact.label}:</span>
                  <span className="underline">{contact.value}</span>
                </motion.a>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex space-x-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm border border-white/20 dark:border-dark-700/20 hover:shadow-lg transition-all duration-300"
                >
                  <social.icon size={24} className="text-dark-600 dark:text-dark-300" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

                     {/* Right Content - Profile Image */}
           <motion.div
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="relative"
           >
                           <div className="relative w-full h-96 lg:h-[600px] rounded-2xl overflow-hidden glass-effect shadow-2xl">
                               <Image
                  src="/velasquez_picture.jpg"
                  alt="Professional headshot"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
               {/* Subtle overlay for better text contrast */}
               <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10"></div>
             </div>
           </motion.div>
        </div>
        
        {/* Floating CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center space-x-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="font-medium">Let's Connect</span>
            <ChevronDown size={20} className="animate-bounce" />
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-dark-400 dark:border-dark-500 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-dark-400 dark:bg-dark-500 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
