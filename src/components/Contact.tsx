'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from '@emailjs/browser'

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  {
    name: 'GitHub',
    handle: '@callmeHeinHtet',
    href: 'https://github.com/callmeHeinHtet',
  },
  {
    name: 'LinkedIn',
    handle: 'Hein Htet Soe',
    href: 'https://www.linkedin.com/in/hein-htet-soe-2015b334b/',
  },
  {
    name: 'LINE',
    handle: '@callmeero81',
    href: 'https://line.me/ti/p/~callmeero81',
  },
]

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Large headline reveal
      gsap.from('.contact-headline', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.contact-headline',
          start: 'top 85%',
        },
      })

      // Stagger reveal for content
      gsap.from('.contact-content > *', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.contact-content',
          start: 'top 85%',
        },
      })

      // Form field reveals
      gsap.from('.form-field', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 85%',
        },
      })

      // Social links stagger
      gsap.from('.social-link', {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.social-links',
          start: 'top 90%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await emailjs.send(
        'service_tnfcuie',
        'template_too8tx7',
        {
          to_name: 'Hein Htet Soe',
          from_name: formState.name,
          from_email: formState.email,
          reply_to: formState.email,
          message: formState.message,
          user_name: formState.name,
          user_email: formState.email,
          user_message: formState.message,
        },
        'YzCB4G4N2VFBOStid'
      )

      if (result.status === 200) {
        setIsSubmitted(true)
        setFormState({ name: '', email: '', message: '' })
        setTimeout(() => setIsSubmitted(false), 5000)
      }
    } catch (error) {
      console.error('Email failed:', error)
      alert('Failed to send message. Please email heinhtetsoe1821@gmail.com directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div ref={sectionRef} className="container relative z-10">
      {/* Large CTA Headline */}
      <div className="contact-headline text-center mb-16 md:mb-24">
        <span className="section-label text-cream/60 mb-6 block">Get In Touch</span>
        <h2 className="font-display text-display-lg md:text-display-hero text-cream uppercase leading-[0.9]">
          Let's Create
          <span className="block text-stroke-light">Together</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left - Contact Info & Social */}
        <div className="contact-content order-2 lg:order-1">
          {/* Email - Make it BIG */}
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-cream/40 mb-4 block">
              Drop a line
            </span>
            <a
              href="mailto:heinhtetsoe1821@gmail.com"
              className="group block"
            >
              <span className="font-display text-2xl md:text-3xl text-cream group-hover:text-flame transition-colors duration-300 break-all">
                heinhtetsoe1821
                <span className="text-flame">@</span>
                gmail.com
              </span>
            </a>
          </div>

          {/* Location */}
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-cream/40 mb-4 block">
              Location
            </span>
            <p className="font-display text-2xl text-cream">
              Bangkok, Thailand
            </p>
            <p className="text-sm text-cream/50 mt-2">
              Available for remote work worldwide
            </p>
          </div>

          {/* Social Links - Editorial Style */}
          <div className="social-links">
            <span className="text-xs uppercase tracking-[0.2em] text-cream/40 mb-6 block">
              Connect
            </span>
            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link group flex items-center justify-between py-4 border-b border-cream/10 hover:border-flame/50 transition-colors duration-300"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-flame">
                      0{index + 1}
                    </span>
                    <span className="text-cream group-hover:text-flame transition-colors duration-300">
                      {link.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-cream/50 group-hover:text-cream/70 transition-colors">
                      {link.handle}
                    </span>
                    <svg
                      className="w-4 h-4 text-cream/30 group-hover:text-flame transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Availability Badge */}
          <div className="mt-12 inline-flex items-center gap-3 px-4 py-3 bg-cream/5 border border-cream/10">
            <div className="relative">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
            </div>
            <span className="text-sm text-cream/60">
              Available for new projects
            </span>
          </div>
        </div>

        {/* Right - Contact Form */}
        <div className="contact-form order-1 lg:order-2">
          <div className="relative">
            {/* Form Header */}
            <div className="mb-8">
              <h3 className="font-display text-h1 text-cream mb-2">
                Start a Project
              </h3>
              <p className="text-cream/50">
                Have an idea? Let's make it happen.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-16 text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 border-2 border-flame flex items-center justify-center">
                    <svg className="w-10 h-10 text-flame" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-display text-h2 text-cream mb-3">
                  Message Sent
                </h3>
                <p className="text-cream/50">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="form-field group">
                  <label
                    htmlFor="name"
                    className={`block text-xs uppercase tracking-[0.15em] mb-3 transition-colors duration-300 ${
                      focusedField === 'name' ? 'text-flame' : 'text-cream/50'
                    }`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-transparent border-b-2 border-cream/20 focus:border-flame py-4 text-lg text-cream placeholder:text-cream/30 outline-none transition-colors duration-300"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email Field */}
                <div className="form-field group">
                  <label
                    htmlFor="email"
                    className={`block text-xs uppercase tracking-[0.15em] mb-3 transition-colors duration-300 ${
                      focusedField === 'email' ? 'text-flame' : 'text-cream/50'
                    }`}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-transparent border-b-2 border-cream/20 focus:border-flame py-4 text-lg text-cream placeholder:text-cream/30 outline-none transition-colors duration-300"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Message Field */}
                <div className="form-field group">
                  <label
                    htmlFor="message"
                    className={`block text-xs uppercase tracking-[0.15em] mb-3 transition-colors duration-300 ${
                      focusedField === 'message' ? 'text-flame' : 'text-cream/50'
                    }`}
                  >
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b-2 border-cream/20 focus:border-flame py-4 text-lg text-cream placeholder:text-cream/30 outline-none transition-colors duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <div className="form-field pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full py-5 bg-cream text-ink font-display text-lg uppercase tracking-wider overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-flame -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-expo" />
                    <span className="absolute inset-0 flex items-center justify-center gap-3 text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {!isSubmitting && (
                        <>
                          Send Message
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="mt-24 pt-12 border-t border-cream/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-cream/40 text-center md:text-left">
            Looking forward to hearing from you
          </p>
          <div className="flex items-center gap-2 text-sm text-cream/40">
            <span className="w-2 h-2 bg-flame rounded-full" />
            <span>Based in Bangkok</span>
            <span className="mx-2">|</span>
            <span>Working Globally</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
