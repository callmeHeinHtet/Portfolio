'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { name: 'Work', href: '#projects', num: '01' },
  { name: 'About', href: '#about', num: '02' },
  { name: 'Journey', href: '#journey', num: '03' },
  { name: 'Contact', href: '#contact', num: '04' },
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)

      const sections = ['projects', 'about', 'journey', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-4 bg-cream/90 backdrop-blur-md border-b border-ink/5'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="group relative">
            <span className="font-display text-2xl md:text-3xl text-ink tracking-tight">
              HHS
            </span>
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-flame scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`group relative px-5 py-2 text-sm uppercase tracking-wider transition-colors duration-300 ${
                  activeSection === link.href.slice(1)
                    ? 'text-ink'
                    : 'text-stone hover:text-ink'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-xxs text-flame font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    {link.num}
                  </span>
                  {link.name}
                </span>
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-ink/5 rounded-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="mailto:heinhtetsoe1821@gmail.com"
              className="group relative px-6 py-3 bg-ink text-cream text-sm uppercase tracking-wider overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Let's Talk
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-flame -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-12 h-12 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5 flex flex-col justify-between">
              <span
                className={`block w-full h-0.5 bg-ink transition-all duration-300 origin-center ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''
                }`}
              />
              <span
                className={`block w-full h-0.5 bg-ink transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block w-full h-0.5 bg-ink transition-all duration-300 origin-center ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 md:hidden bg-cream"
          >
            <div className="h-full flex flex-col justify-center px-8">
              {/* Nav Links */}
              <nav className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                    className="group flex items-center gap-6 py-4 border-b border-ink/10"
                  >
                    <span className="text-xs font-mono text-flame">{link.num}</span>
                    <span className="font-display text-4xl md:text-5xl text-ink group-hover:text-flame transition-colors duration-300">
                      {link.name}
                    </span>
                  </motion.a>
                ))}
              </nav>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mt-16 pt-8 border-t border-ink/10"
              >
                <p className="text-xs uppercase tracking-wider text-stone mb-4">Get in touch</p>
                <a
                  href="mailto:heinhtetsoe1821@gmail.com"
                  className="text-lg text-ink hover:text-flame transition-colors"
                >
                  heinhtetsoe1821@gmail.com
                </a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-8 flex gap-6"
              >
                <a href="https://github.com/callmeHeinHtet" target="_blank" rel="noopener noreferrer" className="text-stone hover:text-ink transition-colors">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/hein-htet-soe-2015b334b/" target="_blank" rel="noopener noreferrer" className="text-stone hover:text-ink transition-colors">
                  LinkedIn
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
