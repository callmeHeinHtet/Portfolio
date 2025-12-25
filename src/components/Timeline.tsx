'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TimelineItem {
  year: string
  title: string
  company: string
  description: string
  technologies: string[]
}

interface TimelineProps {
  items: TimelineItem[]
}

const Timeline = ({ items }: TimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line grows down
      gsap.fromTo('.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      )

      // Each timeline item animates in separately
      const items = gsap.utils.toArray('.timeline-item') as HTMLElement[]
      items.forEach((item, i) => {
        gsap.fromTo(item,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              once: true,
            },
            delay: i * 0.1,
          }
        )
      })

      // Year badges pop in
      const badges = gsap.utils.toArray('.year-badge') as HTMLElement[]
      badges.forEach((badge, i) => {
        gsap.fromTo(badge,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: badge,
              start: 'top 85%',
              once: true,
            },
            delay: i * 0.15,
          }
        )
      })

      // Dots animate
      const dots = gsap.utils.toArray('.timeline-dot') as HTMLElement[]
      dots.forEach((dot, i) => {
        gsap.fromTo(dot,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            ease: 'back.out(3)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 85%',
              once: true,
            },
            delay: i * 0.15,
          }
        )
      })

    }, timelineRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={timelineRef} className="max-w-4xl mx-auto">
      <div className="timeline-container relative">
        {/* Timeline Line */}
        <div className="timeline-line absolute left-0 md:left-[120px] top-0 bottom-0 w-px bg-gradient-to-b from-flame via-ink/20 to-transparent" />

        {/* Timeline Items */}
        <div className="space-y-12 md:space-y-16">
          {items.map((item, index) => (
            <div
              key={index}
              className="timeline-item relative flex flex-col md:flex-row gap-6 md:gap-12"
            >
              {/* Year */}
              <div className="md:w-[120px] shrink-0 flex md:justify-end">
                <div className="year-badge inline-flex items-center gap-2">
                  <span className="font-display text-display-sm font-bold text-ink">
                    {item.year}
                  </span>
                  {index === 0 && (
                    <span className="text-xxs uppercase tracking-wider text-flame font-medium">
                      Now
                    </span>
                  )}
                </div>
              </div>

              {/* Dot */}
              <div className="absolute left-0 md:left-[120px] top-3 -translate-x-1/2 z-10">
                <div className="timeline-dot relative">
                  <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-flame' : 'bg-ink'}`} />
                  {index === 0 && (
                    <div className="absolute inset-0 rounded-full bg-flame animate-ping opacity-50" />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pl-8 md:pl-0">
                <div className="card p-6 md:p-8 hover:shadow-brutal">
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="font-display text-h2 text-ink mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-stone">
                      {item.company}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="body-text mb-6">
                    {item.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* End marker */}
        <div className="absolute left-0 md:left-[120px] bottom-0 -translate-x-1/2">
          <div className="w-2 h-2 bg-ink/20 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default Timeline
