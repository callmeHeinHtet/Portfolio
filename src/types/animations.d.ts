declare module 'gsap' {
  export interface TweenVars {
    [key: string]: any
    duration?: number
    delay?: number
    ease?: string
    stagger?: number
    scrollTrigger?: {
      trigger?: string | Element
      start?: string
      end?: string
      scrub?: boolean | number
      markers?: boolean
      [key: string]: any
    }
  }

  export interface Context {
    revert: () => void
    [key: string]: any
  }

  export interface GSAPStatic {
    to: (target: any, vars: TweenVars) => any
    from: (target: any, vars: TweenVars) => any
    timeline: (vars?: TweenVars) => any
    context: (func: () => void) => Context
    registerPlugin: (...args: any[]) => void
  }

  const gsap: GSAPStatic
  export { gsap }
}

declare module 'gsap/ScrollTrigger' {
  const ScrollTrigger: any
  export { ScrollTrigger }
}

declare module '@studio-freight/lenis' {
  export interface LenisOptions {
    duration?: number
    easing?: (t: number) => number
    direction?: 'vertical' | 'horizontal'
    gestureDirection?: 'vertical' | 'horizontal'
    smooth?: boolean
    smoothTouch?: boolean
    touchMultiplier?: number
    [key: string]: any
  }

  export default class Lenis {
    constructor(options?: LenisOptions)
    raf: (time: number) => void
    destroy: () => void
  }
} 