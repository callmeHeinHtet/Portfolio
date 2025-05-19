'use client'

import { useRef, useEffect } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { staggerChildren } from '@/utils/animations'

interface TimelineItem {
  year: string
  title: string
  description: string
  company?: string
  technologies?: string[]
}

interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="py-20 bg-[#1a1a1a]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-accent text-center mb-16">
          My Journey
        </h2>
        <div className="max-w-4xl mx-auto">
          {items.map((item, index) => (
            <div key={item.year} className="mb-12 border-l-2 border-accent pl-8 relative">
              {/* Timeline dot */}
              <div className="absolute left-0 w-4 h-4 bg-accent rounded-full -translate-x-1/2" />
              
              {/* Content */}
              <div className="bg-[#2a2a2a] p-6 rounded-lg">
                <span className="text-accent font-mono text-lg font-bold">{item.year}</span>
                <h3 className="text-2xl font-bold text-white mt-2">{item.title}</h3>
                {item.company && (
                  <p className="text-gray-300 mt-1 font-medium">{item.company}</p>
                )}
                <p className="text-gray-400 mt-3">{item.description}</p>
                {item.technologies && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 