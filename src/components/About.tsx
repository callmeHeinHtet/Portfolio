'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Image } from '@/components/Image'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend',
    skills: ['Python', 'Django', 'Node.js', 'REST APIs', 'PostgreSQL'],
  },
  {
    title: 'Mobile & Design',
    skills: ['Flutter', 'Dart', 'Figma', 'UI/UX Design'],
  },
  {
    title: 'Tools & Other',
    skills: ['Git', 'Docker', 'AI Integration', 'Firebase', 'Vercel'],
  },
]

const stats = [
  { number: '3+', label: 'Years Experience' },
  { number: '15+', label: 'Projects Completed' },
  { number: '5+', label: 'Technologies Mastered' },
]

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for content
      gsap.from('.about-content > *', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 80%',
        },
      })

      // Image reveal
      gsap.from('.about-image', {
        scale: 1.2,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.about-image',
          start: 'top 85%',
        },
      })

      // Stats counter animation
      gsap.from('.stat-number', {
        textContent: 0,
        duration: 2,
        snap: { textContent: 1 },
        ease: 'power1.out',
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 85%',
        },
      })

      // Skill tags stagger - use fromTo with once: true for reliability
      const skillTags = gsap.utils.toArray('.skill-tag') as HTMLElement[]
      skillTags.forEach((tag, i) => {
        gsap.fromTo(tag,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: '.skills-section',
              start: 'top 85%',
              once: true,
            },
            delay: i * 0.03,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="container relative z-10">
      {/* Main Grid - Asymmetric */}
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Left - Image */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="about-image relative">
            {/* Image container with border effect */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/profile.jpg"
                alt="Hein Htet Soe"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-40" />
            </div>

            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-cream/10 pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-flame/20 pointer-events-none" />

            {/* Floating label */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 bg-cream text-ink px-4 py-3 text-xs uppercase tracking-wider font-medium">
              <span className="text-flame font-mono mr-2">+</span>
              Available for work
            </div>
          </div>
        </div>

        {/* Right - Content */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="about-content">
            <span className="section-label text-cream/60 mb-6">About Me</span>

            <h2 className="heading-1 text-cream mb-8">
              Developer with a passion for
              <span className="text-stroke text-cream block">craft & innovation</span>
            </h2>

            <div className="space-y-6 mb-12">
              <p className="body-large text-cream/70">
                I'm <span className="text-cream font-medium">Hein Htet Soe</span>,
                a full-stack developer based in Bangkok, Thailand. Currently studying
                ICT at Rangsit University while building applications that matter.
              </p>

              <p className="body-text text-cream/50">
                I specialize in creating intelligent web applications that combine
                modern frontend technologies with powerful backend systems. My work
                focuses on AI integration, automation workflows, and scalable architectures
                that solve real problems.
              </p>
            </div>

            {/* Stats */}
            <div className="stats-grid grid grid-cols-3 gap-8 mb-12 pb-12 border-b border-cream/10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="stat-number font-display text-display-sm text-flame mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-cream/40">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a href="/resume.pdf" download className="btn-primary group">
                Download Resume
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
              <a
                href="https://www.testdome.com/certificates/66c7baf2df5441a7b5fddd4e9aa33411"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                View Certificate
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section - Clean Tags */}
      <div className="skills-section mt-24 md:mt-32">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h3 className="heading-2 text-cream mb-4">Tech Stack</h3>
            <p className="body-text text-cream/50">
              Technologies I work with daily to build modern applications.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-8">
              {skillCategories.map((category) => (
                <div key={category.title}>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-flame mb-4">
                    {category.title}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="skill-tag px-4 py-2 bg-cream/5 border border-cream/10 text-cream text-sm hover:bg-cream hover:text-ink transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
