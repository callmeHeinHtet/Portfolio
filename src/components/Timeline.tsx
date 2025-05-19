'use client'

import { useRef, useEffect } from 'react'
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
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from('.timeline-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.timeline-title',
          start: 'top bottom-=100',
          end: 'top center',
          scrub: 1,
        },
      })

      // Animate timeline line
      gsap.from('.timeline-line', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        scrollTrigger: {
          trigger: '.timeline-line',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Animate timeline items
      timelineRefs.current.forEach((item, index) => {
        const isEven = index % 2 === 0
        gsap.from(item, {
          x: isEven ? -50 : 50,
          y: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: 'top bottom-=50',
            end: 'top center+=100',
            scrub: 1,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-[#0F0F0F]">
      <div className="container">
        <h2 className="timeline-title text-5xl font-display mb-16 text-accent text-center">
          My Journey
        </h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-px bg-accent/20" />

          <div className="space-y-16">
            {items.map((item, index) => (
              <div
                key={item.year}
                ref={(el) => (timelineRefs.current[index] = el)}
                className="relative grid grid-cols-[1fr_auto_1fr] items-start gap-4 md:gap-8"
              >
                {/* Left side content */}
                <div className={index % 2 === 0 ? '' : 'col-start-3'}>
                  <div className={`space-y-4 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="inline-block">
                      <span className="text-5xl font-display text-accent">{item.year}</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-display text-white hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-lg text-accent/80">{item.company}</p>
                      <p className="text-secondary/80 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className={`flex flex-wrap gap-3 ${
                      index % 2 === 0 ? 'justify-end' : 'justify-start'
                    }`}>
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm text-secondary bg-white/5 rounded-full
                            hover:text-accent hover:bg-accent/10 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="relative">
                  <div className="absolute left-1/2 top-3 -translate-x-1/2 w-4 h-4 rounded-full bg-accent 
                    shadow-lg shadow-accent/20 transition-transform duration-300 hover:scale-125" />
                </div>

                {/* Empty column for opposite side */}
                <div className={index % 2 === 0 ? 'col-start-3' : ''} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline 