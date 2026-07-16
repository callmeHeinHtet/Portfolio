'use client'

import { useEffect, useRef, useState } from 'react'
import { Image } from '@/components/Image'
import type { Project } from '@/data/projects'

interface Props {
  project: Project
  onClose: () => void
}

/**
 * Reads the case study for a project: the full write-up, the engineering decisions, and
 * screenshots from inside the app.
 *
 * Exists because the card could only show ~4 clamped lines and its CTA linked straight to
 * the live site — so `longDescription` was half-hidden and `features` rendered nowhere at
 * all. For the production systems (ANT, RestroFlow) the interesting part is what's behind
 * the login, which a visitor can never reach.
 */
export default function CaseStudyModal({ project, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [shot, setShot] = useState(0)

  const gallery = project.gallery ?? []

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab') return

      // Focus trap: without this, Tab walks straight out of the dialog into the page
      // behind it, which is still fully in the DOM.
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (!focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      previouslyFocused?.focus()
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] bg-ink/90 backdrop-blur-sm overflow-y-auto animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <div className="min-h-full flex items-start justify-center p-4 sm:p-8">
        <div
          ref={panelRef}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[1000px] bg-ink ring-1 ring-cream/10 my-4"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-start justify-between gap-4 bg-ink/95 backdrop-blur px-6 sm:px-10 pt-7 pb-5 border-b border-cream/10">
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-flame uppercase">
                Case Study
              </span>
              <h2 className="font-display text-cream leading-[0.95] mt-1.5" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
                {project.title}
              </h2>
            </div>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close case study"
              className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/60 hover:text-flame transition-colors flex items-center gap-2 pt-2"
            >
              Close <span aria-hidden>✕</span>
            </button>
          </div>

          <div className="px-6 sm:px-10 py-8 space-y-10">
            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 border-y border-cream/15 py-4">
                {project.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] tracking-[2px] text-cream/40">{m.label}</span>
                    <span className="font-mono text-sm font-bold text-cream">{m.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* The write-up — full, not clamped */}
            <p className="text-cream/75 leading-relaxed max-w-[68ch]">
              {project.longDescription || project.description}
            </p>

            {/* Screenshots from inside the app */}
            {gallery.length > 0 && (
              <section>
                <h3 className="font-mono text-[10px] tracking-[0.2em] text-cream/40 uppercase mb-4">
                  Inside the app
                </h3>
                <div className="relative w-full aspect-[16/10] bg-cream/5 ring-1 ring-cream/10 overflow-hidden">
                  <Image
                    src={gallery[shot].src}
                    alt={gallery[shot].caption}
                    fill
                    sizes="(max-width: 1000px) 100vw, 1000px"
                    className="object-cover object-top"
                  />
                </div>
                <p className="mt-3 text-sm text-cream/50">{gallery[shot].caption}</p>
                {gallery.length > 1 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {gallery.map((g, i) => (
                      <button
                        key={g.src}
                        onClick={() => setShot(i)}
                        aria-label={`Show ${g.caption}`}
                        aria-current={i === shot}
                        className={`font-mono text-[9px] uppercase tracking-[1.2px] px-3 py-1.5 border transition-colors ${
                          i === shot
                            ? 'border-flame text-flame bg-flame/10'
                            : 'border-cream/20 text-cream/50 hover:text-cream hover:border-cream/40'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* The engineering decisions — previously rendered nowhere */}
            {project.features?.length > 0 && (
              <section>
                <h3 className="font-mono text-[10px] tracking-[0.2em] text-cream/40 uppercase mb-4">
                  Engineering decisions
                </h3>
                <ul className="space-y-5">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex gap-4 max-w-[72ch]">
                      <span className="font-mono text-[10px] text-flame pt-1 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-cream/70 leading-relaxed text-[15px]">{f}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Stack */}
            <section>
              <h3 className="font-mono text-[10px] tracking-[0.2em] text-cream/40 uppercase mb-4">Stack</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[9px] tracking-[1.2px] uppercase px-2.5 py-1 border border-cream/20 bg-cream/5 text-cream/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </section>

            {/* Out */}
            <div className="flex flex-wrap gap-6 pt-2 border-t border-cream/10">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-flame hover:text-cream transition-colors flex items-center gap-2 pt-6"
                >
                  Visit the live site <span aria-hidden>→</span>
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/50 hover:text-cream transition-colors flex items-center gap-2 pt-6"
                >
                  Source <span aria-hidden>↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
