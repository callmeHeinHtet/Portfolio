'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SmoothScroll from '@/components/SmoothScroll'
import ProjectShowcase from '@/components/ProjectShowcase'
import Timeline from '@/components/Timeline'
import PersonalityQuiz from '@/components/PersonalityQuiz'
import RobotCompanion from '@/components/RobotCompanion'
import About from '@/components/About'
import Contact from '@/components/Contact'
import { projects } from '@/data/projects'
import { getImagePath } from '@/utils/imageLoader'

gsap.registerPlugin(ScrollTrigger)

const timelineItems = [
  {
    year: '2021',
    title: 'Programming Journey Begins',
    company: 'Self-taught Developer',
    description: 'Started learning programming with a focus on web development. Built foundational knowledge in HTML, CSS, and JavaScript through various online courses and personal projects.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Git'],
  },
  {
    year: '2022',
    title: 'Web Developer',
    company: 'Self-taught Developer',
    description: 'Developed the Global Currency Tracker and Task Manager applications, showcasing skills in real-time data handling and frontend development.',
    technologies: ['JavaScript', 'API Integration', 'HTML/CSS', 'React'],
  },
  {
    year: '2023',
    title: 'Mobile App Developer',
    company: 'Studying At Rangsit University',
    description: 'Built a comprehensive Hotel Booking System using Dart, demonstrating strong mobile development skills and database management capabilities.',
    technologies: ['Dart', 'Flutter', 'Firebase', 'UI/UX Design'],
  },
  {
    year: '2024',
    title: 'Full Stack Developer & AI Enthusiast',
    company: 'Studying At Rangsit University',
    description: 'Developing AI-powered applications and exploring modern web technologies. Created an intelligent chatbot and various web applications focusing on user experience.',
    technologies: ['Next.js', 'TypeScript', 'AI/ML', 'React', 'Node.js'],
  },
]

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const bgPatternRef = useRef<HTMLDivElement>(null)
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    // Check user's preferred color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(prefersDark)

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from(heroRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      })

      // Text reveal animation
      gsap.from(textRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
      })

      // Background pattern parallax
      if (bgPatternRef.current) {
        gsap.to(bgPatternRef.current, {
          y: '30%',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('light-mode')
  }

  return (
    <SmoothScroll>
      <RobotCompanion />
      <main className={`min-h-screen ${isDarkMode ? 'dark' : 'light'}`}>
        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/5 backdrop-blur-sm text-secondary hover:text-accent transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Hero Section */}
        <section id="home" ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#1a1a1a] to-[#141414]" />
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent animate-pulse" />
            </div>
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }} />
          </div>

          {/* Content */}
          <div className="container relative">
            <div ref={textRef} className="max-w-4xl mx-auto text-center">
              {/* Profile Image */}
              <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-accent/20 shadow-lg shadow-accent/20">
                  <img 
                    src={getImagePath('/profile.jpg')}
                    alt="Hein Htet Soe" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="mb-6 inline-block relative group">
                <h1 className="text-6xl md:text-8xl font-display text-gradient relative z-10 transform group-hover:scale-105 transition-transform duration-300">
                  Hein Htet Soe
                </h1>
                <div className="absolute -inset-4 bg-accent/5 rounded-2xl -z-10 blur-3xl group-hover:bg-accent/10 transition-colors duration-300" />
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-12">
                <p className="text-2xl md:text-3xl text-secondary/90 font-light hover:text-white transition-colors duration-300">
                  Creative Developer
                </p>
                <div className="hidden md:block w-px h-8 bg-secondary/20" />
                <p className="text-2xl md:text-3xl text-secondary/90 font-light hover:text-white transition-colors duration-300">
                  UI/UX Designer
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a 
                  href="#projects"
                  className="btn-primary w-full sm:w-auto text-center group relative overflow-hidden"
                >
                  <span className="relative z-10">View Projects</span>
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </a>
                <a 
                  href="https://github.com/callmeHeinHtet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full sm:w-auto text-center group relative overflow-hidden"
                >
                  <span className="relative z-10">GitHub Profile</span>
                  <svg 
                    className="inline-block ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2 relative z-10" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3" 
                    />
                  </svg>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-sm text-secondary/50 animate-pulse">Scroll Down</span>
            <svg 
              className="w-6 h-6 text-secondary/50 animate-bounce" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        </section>

        {/* About Section */}
        <About />

        {/* Project Showcase */}
        <section id="projects" className="relative z-10">
          <ProjectShowcase projects={projects} />
        </section>

        {/* Timeline */}
        <section id="journey" className="relative z-10">
          <Timeline items={timelineItems} />
        </section>

        {/* Personality Quiz */}
        <section className="relative z-10">
          <PersonalityQuiz />
        </section>

        {/* Contact Section */}
        <Contact />
      </main>
    </SmoothScroll>
  )
} 