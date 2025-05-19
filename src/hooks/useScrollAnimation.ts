import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type ScrollAnimationProps = {
  trigger?: string | Element
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  from?: gsap.TweenVars
  to?: gsap.TweenVars
}

export function useScrollAnimation(
  element: React.RefObject<Element>,
  options: ScrollAnimationProps = {}
) {
  const {
    trigger,
    start = 'top center',
    end = 'bottom center',
    scrub = false,
    markers = false,
    from,
    to,
  } = options

  const animation = useRef<gsap.Context | null>(null)

  useEffect(() => {
    if (!element.current) return

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: trigger || element.current,
          start,
          end,
          scrub,
          markers,
        },
      })

      if (from) {
        timeline.from(element.current, from)
      }

      if (to) {
        timeline.to(element.current, to)
      }
    })

    animation.current = ctx

    return () => {
      ctx.revert()
    }
  }, [element, trigger, start, end, scrub, markers, from, to])

  return animation
} 