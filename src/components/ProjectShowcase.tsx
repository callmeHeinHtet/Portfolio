'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getImagePath } from '@/utils/imageLoader'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  link: string
  github?: string
}

interface ProjectShowcaseProps {
  projects: Project[]
}

const ProjectShowcase = ({ projects }: ProjectShowcaseProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from('.section-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.section-title',
          start: 'top bottom-=100',
          end: 'top center',
          scrub: 1,
        },
      })

      // Animate project cards
      projectRefs.current.forEach((project, index) => {
        gsap.from(project, {
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: project,
            start: 'top bottom-=100',
            end: 'top center',
            scrub: 1,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-[#111111]">
      <div className="container">
        <h2 className="section-title text-5xl font-display mb-16 text-accent text-center">
          Featured Projects
        </h2>

        <div className="grid gap-12">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => (projectRefs.current[index] = el)}
              className="group relative grid md:grid-cols-2 gap-8 items-center"
            >
              {/* Project Image */}
              <div className={`relative overflow-hidden rounded-2xl ${
                index % 2 === 0 ? 'md:order-1' : 'md:order-2'
              }`}>
                <div className="relative aspect-video overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={getImagePath(project.image)}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Project Info */}
              <div className={index % 2 === 0 ? 'md:order-2' : 'md:order-1'}>
                <h3 className="text-3xl font-display text-white mb-4 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-secondary/80 mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {project.tags.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm text-secondary bg-white/5 rounded-full
                        group-hover:text-accent group-hover:bg-accent/10 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    View Project
                  </a>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                    >
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectShowcase 