'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SmoothScroll from '@/components/SmoothScroll'
import ProjectShowcase from '@/components/ProjectShowcase'
import Timeline from '@/components/Timeline'
import PersonalityQuiz from '@/components/PersonalityQuiz'
import RobotCompanion from '@/components/RobotCompanion'
import { projects } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger)

const timelineItems = [
  {
    year: '2024',
    title: 'Full Stack Developer & AI Enthusiast',
    company: 'Studying At Rangsit University',
    description: 'Developing AI-powered applications and exploring modern web technologies. Created an intelligent chatbot and various web applications focusing on user experience.',
    technologies: ['Next.js', 'TypeScript', 'AI/ML', 'React', 'Node.js'],
  },
  {
    year: '2023',
    title: 'Mobile App Developer',
    company: 'Studying At Rangsit University',
    description: 'Built a comprehensive Hotel Booking System using Dart, demonstrating strong mobile development skills and database management capabilities.',
    technologies: ['Dart', 'Flutter', 'Firebase', 'UI/UX Design'],
  },
  {
    year: '2022',
    title: 'Web Developer',
    company: 'Self-taught Developer',
    description: 'Developed the Global Currency Tracker and Task Manager applications, showcasing skills in real-time data handling and frontend development.',
    technologies: ['JavaScript', 'API Integration', 'HTML/CSS', 'React'],
  },
  {
    year: '2021',
    title: 'Programming Journey Begins',
    company: 'Self-taught Developer',
    description: 'Started learning programming with a focus on web development. Built foundational knowledge in HTML, CSS, and JavaScript through various online courses and personal projects.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Git'],
  },
]

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const bgPatternRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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

  return (
    <SmoothScroll>
      <RobotCompanion />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Pattern */}
          <div ref={bgPatternRef} className="absolute inset-0 -z-10 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }} />
          </div>

          {/* Content */}
          <div className="container relative">
            <div ref={textRef} className="max-w-4xl mx-auto text-center">
              <div className="mb-6 inline-block relative">
                <h1 className="text-6xl md:text-8xl font-display text-gradient relative z-10">
                  Hein Htet Soe
                </h1>
                <div className="absolute -inset-4 bg-accent/5 rounded-2xl -z-10 blur-3xl" />
              </div>
              <p className="text-xl md:text-2xl mb-12 text-secondary/80 font-light">
                Creative Developer & UI/UX Designer
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a 
                  href="#projects"
                  className="btn-primary w-full sm:w-auto text-center"
                >
                  View Projects
                </a>
                <a 
                  href="https://github.com/callmeHeinHtet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full sm:w-auto text-center group"
                >
                  GitHub Profile
                  <svg 
                    className="inline-block ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
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
                </a>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg 
              className="w-6 h-6 text-secondary/50" 
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
      </main>
    </SmoothScroll>
  )
} 