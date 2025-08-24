'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, Linkedin, MessageSquare } from 'lucide-react'

export default function Contact() {
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

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'jvelasquez.contact@gmail.com',
      href: 'mailto:jvelasquez.contact@gmail.com',
      description: 'Send me an email for business inquiries'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+63 945 773 6088',
      href: 'tel:+639457736088',
      description: 'Kindly send a message first before calling.'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/djuliovelasquez',
      href: 'https://linkedin.com/in/djuliovelasquez',
      description: 'Connect with me professionally'
    },
         {
       icon: MessageSquare,
       label: 'Viber',
       value: '+63 945 773 6088',
       href: 'viber://chat?number=+639457736088',
       description: 'Message me on Viber'
     }
  ]



  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 dark:from-dark-400 dark:to-dark-300 py-20">
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
              Let's Connect
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              Ready to start a project or just want to chat? I'd love to hear from you. 
              Let's discuss how we can work together to bring your ideas to life.
            </p>
          </motion.div>

          {/* Contact Methods - Centered */}
          <motion.div
            variants={cardVariants}
            className="max-w-2xl mx-auto space-y-8"
          >
              <div>
                <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">
                  Get in Touch
                </h3>
                <p className="text-dark-600 dark:text-dark-300 mb-8">
                  Prefer a different way to connect? Here are all the ways you can reach me.
                </p>
              </div>

              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-4 p-4 bg-white dark:bg-dark-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center group-hover:bg-primary-200 dark:group-hover:bg-primary-900/40 transition-colors">
                      <method.icon size={24} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-semibold text-dark-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {method.label}
                      </h4>
                      <p className="text-dark-600 dark:text-dark-300 text-sm">
                        {method.value}
                      </p>
                      <p className="text-dark-500 dark:text-dark-400 text-xs mt-1">
                        {method.description}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-8 text-white text-center"
              >
                <h4 className="text-xl font-bold mb-2">
                  Ready to Start Your Project?
                </h4>
                <p className="text-primary-100 mb-6">
                  Let's discuss your ideas and create something amazing together.
                </p>
                <motion.a
                  href="mailto:jvelasquez.contact@gmail.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Start a Conversation
                </motion.a>
              </motion.div>
            </motion.div>

          {/* Footer Note */}
          <motion.div
            variants={cardVariants}
            className="text-center pt-8 border-t border-gray-200 dark:border-dark-600"
          >
            <p className="text-dark-500 dark:text-dark-400">
              I typically respond within 24 hours during business days. 
              For urgent matters, please use phone or WhatsApp.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
