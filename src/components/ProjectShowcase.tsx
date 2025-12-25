'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Image } from '@/components/Image'
import { Project } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger)

interface ProjectShowcaseProps {
  projects: Project[]
}

const ProjectShowcase = ({ projects }: ProjectShowcaseProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Featured project reveal
      gsap.from('.featured-project', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.featured-project',
          start: 'top 85%',
        },
      })

      // Project cards stagger
      gsap.from('.project-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 85%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const getCategoryLabel = (category: Project['category']) => {
    const labels = {
      frontend: 'Frontend',
      fullstack: 'Full Stack',
      mobile: 'Mobile',
    }
    return labels[category] || 'Project'
  }

  const [featured, ...rest] = projects

  return (
    <div ref={sectionRef}>
      {/* Featured Project - Full Width */}
      {featured && (
        <div className="featured-project mb-16">
          <a
            href={featured.demo || featured.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="relative bg-white border-2 border-ink/10 hover:border-ink transition-all duration-500 overflow-hidden">
              {/* Project number */}
              <div className="absolute top-6 left-6 z-10">
                <span className="font-mono text-xs text-stone">001</span>
              </div>

              {/* Category */}
              <div className="absolute top-6 right-6 z-10">
                <span className="tag-accent">
                  {getCategoryLabel(featured.category)}
                </span>
              </div>

              {/* Image */}
              <div className="relative aspect-[21/9] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-expo group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent" />
              </div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div className="max-w-2xl">
                  <h3 className="font-display text-display-sm md:text-display text-cream mb-4 group-hover:text-flame transition-colors duration-300">
                    {featured.title}
                  </h3>

                  <p className="text-cream/70 mb-6 line-clamp-2">
                    {featured.longDescription || featured.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featured.technologies.map((tech) => (
                      <span key={tech} className="tag bg-cream/10 text-cream/70 border-cream/20">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="inline-flex items-center gap-2 text-flame font-medium text-sm uppercase tracking-wider">
                    <span>View Project</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      )}

      {/* Project Grid */}
      <div className="projects-grid grid md:grid-cols-2 gap-8">
        {rest.map((project, index) => (
          <motion.a
            key={project.title}
            href={project.demo || project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card group block"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="card hover:shadow-brutal-lg">
              {/* Image container */}
              <div className="relative aspect-video overflow-hidden bg-ink/5">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain transition-transform duration-700 ease-expo group-hover:scale-105"
                />

                {/* Overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-ink flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 0.9 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-cream text-sm uppercase tracking-wider font-medium">
                    View Project
                  </span>
                </motion.div>

                {/* Number */}
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-xs text-stone bg-cream px-2 py-1">
                    00{index + 2}
                  </span>
                </div>

                {/* Category */}
                <div className="absolute top-4 right-4">
                  <span className="tag-accent">
                    {getCategoryLabel(project.category)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-h2 text-ink mb-2 group-hover:text-flame transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-sm text-stone mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-xs text-stone">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs text-flame">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* View All CTA */}
      <div className="mt-16 text-center">
        <a
          href="https://github.com/callmeHeinHtet"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary group"
        >
          View All on GitHub
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default ProjectShowcase
