'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import About from '@/components/About'
import ProjectShowcase from '@/components/ProjectShowcase'
import Timeline from '@/components/Timeline'
import Contact from '@/components/Contact'
import { projects } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger)

const timelineItems = [
  {
    year: '2024',
    title: 'Full Stack Developer & AI Specialist',
    company: 'Rangsit University',
    description: 'Building AI-powered applications and modern web experiences with Next.js, TypeScript, and Python. Focused on creating intelligent automation systems.',
    technologies: ['Next.js', 'TypeScript', 'Python', 'AI/ML'],
  },
  {
    year: '2023',
    title: 'Mobile App Developer',
    company: 'Rangsit University',
    description: 'Developed comprehensive mobile applications using Flutter and Firebase, focusing on user experience and real-time data synchronization.',
    technologies: ['Flutter', 'Dart', 'Firebase', 'UI/UX'],
  },
  {
    year: '2022',
    title: 'Web Developer',
    company: 'Self-taught',
    description: 'Built real-time web applications including currency trackers and task management systems. Mastered React and API integration.',
    technologies: ['React', 'JavaScript', 'APIs', 'Node.js'],
  },
  {
    year: '2021',
    title: 'Started Coding',
    company: 'Self-taught',
    description: 'Began the programming journey with web development fundamentals. Built a strong foundation in HTML, CSS, and JavaScript.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Git'],
  },
]

const marqueeText = ['FULL STACK', 'AI SPECIALIST', 'REACT', 'NEXT.JS', 'TYPESCRIPT', 'PYTHON', 'UI/UX']

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      gsap.set(['.hero-label', '.hero-name', '.hero-name-last', '.hero-tagline', '.hero-ctas', '.hero-scroll'], {
        opacity: 0,
        y: 60,
      })

      tl.to('.hero-label', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
      })
      .to('.hero-name', {
        opacity: 1,
        y: 0,
        duration: 1,
      }, '-=0.4')
      .to('.hero-name-last', {
        opacity: 1,
        y: 0,
        duration: 1,
      }, '-=0.8')
      .to('.hero-tagline', {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.5')
      .to('.hero-ctas', {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.4')
      .to('.hero-scroll', {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.3')

      // Parallax on hero decorative elements
      gsap.to('.hero-circle', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Marquee animation is handled by CSS
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen bg-cream">
      {/* ========== HERO SECTION ========== */}
      <section
        ref={heroRef}
        id="home"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="hero-circle absolute top-20 right-[10%] w-[400px] h-[400px] rounded-full border-2 border-ink/5 pointer-events-none" />
        <div className="hero-circle absolute bottom-20 left-[5%] w-[200px] h-[200px] rounded-full bg-flame/5 pointer-events-none" />
        <div className="absolute top-1/2 left-8 w-px h-32 bg-ink/10 hidden lg:block" />

        {/* Main content */}
        <div className="container relative z-10 pt-32 pb-20">
          <div className="max-w-6xl">
            {/* Label */}
            <div className="hero-label flex items-center gap-4 mb-8">
              <span className="text-xxs uppercase tracking-[0.3em] text-stone">
                Full Stack Developer
              </span>
              <span className="w-12 h-px bg-flame" />
              <span className="text-xxs uppercase tracking-[0.3em] text-stone">
                Bangkok, Thailand
              </span>
            </div>

            {/* Name - MASSIVE */}
            <h1 className="mb-6">
              <span className="hero-name block font-display text-display-hero text-ink leading-[0.85] uppercase">
                Hein Htet
              </span>
              <span className="hero-name-last block font-display text-display-hero text-stroke text-ink leading-[0.85] uppercase">
                Soe
              </span>
            </h1>

            {/* Tagline */}
            <div className="hero-tagline max-w-xl mb-12">
              <p className="text-body-lg text-ink/60 leading-relaxed">
                I build <span className="text-ink font-medium">intelligent digital experiences</span> that
                merge thoughtful design with powerful functionality. Currently focused on
                <span className="text-flame font-medium"> AI automation</span> and modern web development.
              </p>
            </div>

            {/* CTAs */}
            <div className="hero-ctas flex flex-col sm:flex-row gap-4">
              <a href="#projects" className="btn-primary group">
                View My Work
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#contact" className="btn-secondary">
                Get in Touch
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-xxs uppercase tracking-[0.2em] text-stone">Scroll</span>
          <div className="w-px h-12 bg-ink/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-4 bg-flame animate-bounce-subtle" />
          </div>
        </div>
      </section>

      {/* ========== MARQUEE SECTION ========== */}
      <section className="py-8 border-y border-ink/10 overflow-hidden">
        <div ref={marqueeRef} className="marquee-track">
          <div className="marquee-content">
            {[...marqueeText, ...marqueeText].map((text, i) => (
              <span key={i} className="flex items-center gap-8">
                <span className="text-2xl md:text-3xl font-display uppercase text-ink/20">{text}</span>
                <span className="w-2 h-2 bg-flame rounded-full" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROJECTS SECTION ========== */}
      <section id="projects" className="section relative">
        <span className="section-number">01</span>
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-8 mb-16 md:mb-24">
            <div className="lg:col-span-8">
              <span className="section-label mb-6">Selected Work</span>
              <h2 className="heading-1 mb-6">
                Projects that showcase
                <span className="text-stroke block">craft & creativity</span>
              </h2>
            </div>
            <div className="lg:col-span-4 flex items-end">
              <p className="body-text">
                A curated collection of projects demonstrating expertise in
                web development, mobile applications, and AI integration.
              </p>
            </div>
          </div>
          <ProjectShowcase projects={projects} />
        </div>
      </section>

      {/* ========== ABOUT SECTION ========== */}
      <section id="about" className="section section-dark relative overflow-hidden">
        <span className="section-number">02</span>

        {/* Decorative */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-flame/5 to-transparent pointer-events-none" />

        <About />
      </section>

      {/* ========== TIMELINE SECTION ========== */}
      <section id="journey" className="section relative">
        <span className="section-number">03</span>
        <div className="container">
          <div className="max-w-3xl mb-16 md:mb-24">
            <span className="section-label mb-6">My Journey</span>
            <h2 className="heading-1 mb-6">
              From curiosity
              <span className="text-stroke block">to creation</span>
            </h2>
            <p className="body-large">
              A timeline of growth from self-taught beginnings to building
              real-world applications that solve meaningful problems.
            </p>
          </div>
          <Timeline items={timelineItems} />
        </div>
      </section>

      {/* ========== CONTACT SECTION ========== */}
      <section id="contact" className="section section-dark relative">
        <span className="section-number">04</span>
        <Contact />
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-8 bg-ink border-t border-cream/10">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-cream/40">
            &copy; {new Date().getFullYear()} Hein Htet Soe. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/callmeHeinHtet" target="_blank" rel="noopener noreferrer" className="text-sm text-cream/40 hover:text-cream transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/hein-htet-soe-2015b334b/" target="_blank" rel="noopener noreferrer" className="text-sm text-cream/40 hover:text-cream transition-colors">
              LinkedIn
            </a>
            <a href="mailto:heinhtetsoe1821@gmail.com" className="text-sm text-cream/40 hover:text-cream transition-colors">
              Email
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
