import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // STUDIO EDITORIAL - Light theme
        cream: {
          DEFAULT: '#F7F5F0',
          dark: '#EBE8E0',
          light: '#FDFCFA',
        },
        ink: {
          DEFAULT: '#0D0D0D',
          light: '#1A1A1A',
          muted: '#3D3D3D',
        },
        // Accents
        flame: {
          DEFAULT: '#FF3D00',
          dark: '#E63600',
          light: '#FF6B3D',
        },
        electric: {
          DEFAULT: '#0038FF',
          dark: '#002ED4',
          light: '#3D6AFF',
        },
        // Neutrals
        stone: {
          DEFAULT: '#8A8A8A',
          light: '#B3B3B3',
          dark: '#5C5C5C',
        },
        // Legacy support
        background: {
          DEFAULT: '#F7F5F0',
          surface: '#FFFFFF',
          elevated: '#EBE8E0',
          dark: '#0D0D0D',
        },
        foreground: {
          DEFAULT: '#0D0D0D',
          secondary: '#3D3D3D',
          muted: '#8A8A8A',
          inverted: '#F7F5F0',
        },
        accent: {
          DEFAULT: '#FF3D00',
          hover: '#E63600',
        },
        border: {
          DEFAULT: 'rgba(13,13,13,0.1)',
          hover: 'rgba(13,13,13,0.2)',
          dark: 'rgba(247,245,240,0.1)',
        },
      },
      fontFamily: {
        display: ['var(--font-clash)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        // Massive display sizes
        'display-hero': ['clamp(4rem, 15vw, 12rem)', { lineHeight: '0.9', letterSpacing: '-0.03em', fontWeight: '600' }],
        'display-xl': ['clamp(3rem, 10vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-sm': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '600' }],
        // Headings
        'h1': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2', fontWeight: '600' }],
        'h2': ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['1.125rem', { lineHeight: '1.4', fontWeight: '500' }],
        // Body
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.6' }],
        // Small
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'xxs': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
        // Section numbers
        'section-num': ['clamp(6rem, 20vw, 14rem)', { lineHeight: '1', fontWeight: '600', letterSpacing: '-0.05em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '48px',
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #0D0D0D',
        'brutal-sm': '2px 2px 0px 0px #0D0D0D',
        'brutal-lg': '8px 8px 0px 0px #0D0D0D',
        'brutal-accent': '4px 4px 0px 0px #FF3D00',
        'soft': '0 4px 20px rgba(0,0,0,0.08)',
        'soft-lg': '0 8px 40px rgba(0,0,0,0.12)',
        'glow-accent': '0 0 30px rgba(255,61,0,0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal-text': 'revealText 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marqueeReverse 30s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(100px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        revealText: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0% 0 0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
