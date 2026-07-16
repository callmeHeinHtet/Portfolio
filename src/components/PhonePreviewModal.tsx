'use client'

import { useEffect, useState } from 'react'

interface Props {
  url: string
  title: string
  onClose: () => void
}

export default function PhonePreviewModal({ url, title, onClose }: Props) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onEsc)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onEsc)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] bg-ink/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-label={`${title} mobile preview`}
    >
      {/* Top bar */}
      <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex justify-between items-center text-cream font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] pointer-events-none">
        <span className="opacity-70 truncate">
          {title} — Mobile Preview
        </span>
        <div className="flex gap-3 sm:gap-5 pointer-events-auto">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="opacity-70 hover:opacity-100 transition flex items-center gap-1.5"
          >
            <span className="hidden sm:inline">Open in tab</span>
            <span className="sm:hidden">Tab</span>
            <span aria-hidden>↗</span>
          </a>
          <button
            onClick={onClose}
            className="opacity-70 hover:opacity-100 transition flex items-center gap-1.5"
            aria-label="Close preview"
          >
            <span>Close</span>
            <span aria-hidden>✕</span>
          </button>
        </div>
      </div>

      {/* Phone bezel — width/height clamp for small viewports */}
      <div
        className="relative bg-ink rounded-[2.5rem] shadow-2xl ring-1 ring-cream/10"
        style={{
          width: 'min(375px, calc(100vw - 32px))',
          height: 'min(812px, calc(100vh - 100px))',
          padding: '10px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dynamic island */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-ink rounded-full z-20 ring-1 ring-cream/5" />

        {/* Loading shimmer */}
        {!loaded && (
          <div className="absolute inset-[10px] rounded-[1.85rem] bg-cream/95 flex items-center justify-center">
            <div className="font-mono text-[10px] tracking-[0.25em] text-ink/40 uppercase">
              Loading…
            </div>
          </div>
        )}

        <iframe
          src={url}
          title={title}
          className="w-full h-full rounded-[1.85rem] bg-cream relative z-10"
          allow="clipboard-write; camera; microphone"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  )
}
