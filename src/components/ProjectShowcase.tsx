'use client'

import { useRef } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import Image from 'next/image'

interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  link: string
}

interface ProjectShowcaseProps {
  projects: Project[]
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useScrollAnimation(containerRef, {
    from: { y: 100, opacity: 0 },
    start: 'top center+=100',
    end: 'center center',
  })

  const getPlaceholderImage = (title: string) => {
    return `https://placehold.co/600x400/1a1a1a/f0f0f0?text=${encodeURIComponent(title)}`
  }

  return (
    <section ref={containerRef} className="py-20 bg-[#111111]">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-display mb-16 text-[#FF3366] text-center">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative bg-[#1A1A1A] rounded-lg overflow-hidden"
            >
              <div className="aspect-video">
                <Image
                  src={project.image || getPlaceholderImage(project.title)}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-display text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#2A2A2A] text-[#FF3366] rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#FF3366] hover:text-[#FF4D7D] transition-colors"
                >
                  View Project
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
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
          ))}
        </div>
      </div>
    </section>
  )
} 