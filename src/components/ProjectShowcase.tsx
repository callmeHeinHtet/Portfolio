'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Image } from '@/components/Image'
import { Project } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger)

interface ProjectShowcaseProps {
  projects: Project[]
}

const DEFAULT_ACCENT = '#C44A1F'
const DEFAULT_PANEL_BG = '#F0EBDD'

const CATEGORY_LABELS: Record<Project['category'], string> = {
  frontend: 'FRONTEND',
  fullstack: 'FULL STACK',
  mobile: 'MOBILE',
}

interface ProjectCardProps {
  project: Project
  index: number
  total: number
}

const ProjectCard = ({ project, index, total }: ProjectCardProps) => {
  const number = (index + 1).toString().padStart(3, '0')
  const totalStr = total.toString().padStart(3, '0')
  const accent = project.accent ?? DEFAULT_ACCENT
  const panelBg = project.panelBg ?? DEFAULT_PANEL_BG
  const isMirrored = index % 2 === 1
  const isDesktopShot = project.aspect === 'desktop'

  // Phone shots use a tall 9:19 frame at 280px wide.
  // Desktop shots use a 16:10 frame at 520px wide so they read as full sites.
  const frameClass = isDesktopShot
    ? 'w-full max-w-[520px] aspect-[16/10]'
    : 'w-full max-w-[280px] aspect-[9/19]'

  const phonePanel = (
    <div
      className="relative flex flex-col items-center justify-center px-8 py-14 md:py-16 h-full"
      style={{ backgroundColor: panelBg }}
    >
      <span className="absolute top-6 left-6 font-mono text-[11px] tracking-widest text-ink/40 z-10">
        {number}
      </span>

      <div
        className={`relative ${frameClass} transition-transform duration-700 ease-out group-hover:scale-[1.03]`}
        style={{
          filter: 'drop-shadow(14px 18px 0 rgba(26,26,26,0.12)) drop-shadow(24px 28px 60px rgba(26,26,26,0.18))',
        }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-contain"
          priority={index === 0}
          sizes={isDesktopShot ? '(max-width: 768px) 100vw, 520px' : '(max-width: 768px) 100vw, 280px'}
        />
      </div>
    </div>
  )

  const contentPanel = (
    <div className="bg-ink text-cream p-8 md:p-12 flex flex-col justify-between min-h-[500px] h-full">
      {/* Top row */}
      <div className="flex justify-between items-start font-mono text-[10px] tracking-[2.5px]">
        <span className="text-cream/50">
          CASE {number} / {totalStr}
        </span>
        <span
          className="px-2.5 py-1 rounded-full font-bold border"
          style={{ color: accent, borderColor: `${accent}55` }}
        >
          {CATEGORY_LABELS[project.category]}
        </span>
      </div>

      {/* Middle */}
      <div className="my-8 md:my-0">
        <h3
          className="font-display leading-[0.95] tracking-tight transition-colors duration-300"
          style={{ fontSize: 'clamp(40px, 5vw, 56px)' }}
        >
          {project.title}
        </h3>

        <p className="mt-4 text-cream/70 leading-relaxed line-clamp-4 max-w-[440px]">
          {project.longDescription || project.description}
        </p>

        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-7 grid grid-cols-4 gap-5 border-t border-b border-cream/15 py-3.5">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col gap-0.5">
                <span className="font-mono text-[8px] tracking-[2px] text-cream/40">
                  {m.label}
                </span>
                <span className="font-mono text-xs font-bold text-cream">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[9px] tracking-[1.2px] uppercase px-2.5 py-1 border border-cream/20 bg-cream/5 text-cream/70"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="font-mono text-[9px] tracking-[1.2px] uppercase px-2.5 py-1 border border-cream/15 bg-cream/5 text-cream/50">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* CTA */}
      <div
        className="mt-7 inline-flex items-center gap-2.5 font-mono text-[11px] font-bold tracking-[2.5px] uppercase"
        style={{ color: accent }}
      >
        <span>VIEW PROJECT</span>
        <span
          className="font-display text-base leading-none transition-transform duration-300 group-hover:translate-x-2"
          aria-hidden
        >
          →
        </span>
      </div>
    </div>
  )

  return (
    <div className="project-feature">
      <a
        href={project.demo || project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div className="relative grid grid-cols-1 md:grid-cols-2 border-2 border-ink/10 hover:border-ink transition-all duration-500 overflow-hidden">
          <div className={isMirrored ? 'md:order-2' : ''}>{phonePanel}</div>
          <div className={isMirrored ? 'md:order-1' : ''}>{contentPanel}</div>
        </div>
      </a>
    </div>
  )
}

const ProjectShowcase = ({ projects }: ProjectShowcaseProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-feature', {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.project-feature',
          start: 'top 85%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef}>
      <div className="space-y-12 md:space-y-16">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            total={projects.length}
          />
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
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default ProjectShowcase
