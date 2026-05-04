import { BASE_PATH } from '@/utils/constants';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  technologies: string[];
  features: string[];
  link: string;
  demo?: string;
  github?: string;
  category: 'frontend' | 'fullstack' | 'mobile';
  status: 'completed' | 'in-progress' | 'concept';
  accent?: string;
  panelBg?: string;
  metrics?: ProjectMetric[];
  // Frame shape for the showcase preview. Defaults to 'phone' (portrait
  // mobile screenshot in a 9:19 frame). Use 'desktop' for landscape web
  // screenshots — they get a 16:10 frame at a larger max-width.
  aspect?: 'phone' | 'desktop';
}

export const projects: Project[] = [
  {
    title: 'RSU Library',
    description:
      'AI library assistant for Rangsit University — risograph/comic poster site with a Gemini-powered chatbot.',
    longDescription:
      "A four-page library site (Home, Resources, Services, News) plus a dedicated chatbot, all wrapped in a Risograph / old-school comic poster visual system. Cyan halftone hero, hard pink drop-shadows, ticket-style status panel, stamp motifs, big uppercase Funnel Display. The chatbot runs through an Express proxy that holds the Gemini API key server-side (the v0 had it shipped to the browser), with multi-turn memory via startChat(), per-IP rate limiting, and EN/TH bilingual support that resets context on language switch. Dark mode is rebuilt as a 'neon nighttime poster' rather than a desaturated invert — same palette, brighter cyan/pink/yellow, colored neon shadows.",
    image: 'images/Chatbot.png',
    tags: [
      'AI Chatbot',
      'Riso/Comic Design',
      'Bilingual EN/TH',
      'Backend Proxy',
      'Vanilla JS',
    ],
    technologies: [
      'Vanilla JS',
      'Express 5',
      'Node.js',
      '@google/generative-ai',
      'Gemini 2.5 Flash Lite',
      'Funnel Display',
      'CSS custom properties',
      'localStorage i18n',
    ],
    features: [
      'Risograph/comic-poster design system: cyan + pink + yellow on ink/paper',
      'Express proxy keeps the Gemini API key server-side, never reaches the browser',
      'Multi-turn chat memory via Gemini startChat() with 20-turn rolling history',
      'EN/TH language switch — chat resets on language flip via CustomEvent',
      'Neon-nighttime-poster dark mode (not a desaturated invert)',
      'Per-IP rate limit: 30 req/min sliding window + 1500ms frontend send gate',
      'Mobile navbar wraps to a 2-row layout — all 4 nav links stay reachable',
      'Single Express server: same port serves /api/* and the static frontend',
    ],
    link: 'https://chatbot-omega-ecru-39.vercel.app',
    demo: 'https://chatbot-omega-ecru-39.vercel.app',
    github: 'https://github.com/callmeHeinHtet/Chatbot',
    category: 'fullstack',
    status: 'completed',
    accent: '#EC1E79',
    panelBg: '#FFFAF2',
    aspect: 'desktop',
    metrics: [
      { label: 'YEAR', value: '2026' },
      { label: 'PAGES', value: '05' },
      { label: 'LANGUAGES', value: 'EN/TH' },
      { label: 'STATUS', value: 'LIVE' },
    ],
  },
  {
    title: 'STAY/',
    description:
      'Brutalist hotel booking app for STAY/ Mitte Berlin — discover a room, book it, check in, get a digital key.',
    longDescription:
      "A boutique hotel app that walks you through the full lifecycle in one continuous flow: browse 4 room types across a 40-room property, pick one, book with a luxury credit-card preview that updates live as you type each digit, watch the slot-machine confirmation reveal animation, check in at the desk, and use your digital room key (the room number itself, treated as art) to unlock the door. Order room service or housekeeping during your stay — the running bill on Stay home updates live as you add items. Itemized check-out with a 'PAID' reveal closes the loop. Brutalist visual direction throughout: heavy display typography, monospace data, off-white + black + a single rust accent.",
    image: 'images/Stay.png',
    tags: [
      'Mobile App',
      'Brutalist Design',
      'Cinematic UI',
      'Live Animations',
      'End-to-End',
    ],
    technologies: [
      'Flutter',
      'Dart 3',
      'Firebase Auth',
      'Cloud Firestore',
      'Firebase Hosting',
      'Provider',
      'google_fonts',
      'device_preview',
    ],
    features: [
      'Custom brutalist design system: Archivo Black + Fraunces + JetBrains Mono',
      'Live luxury credit card preview that updates as you type each digit',
      'Slot-machine room-number confirmation reveal animation',
      'Cinematic room detail with giant hero number breaking the boundary',
      'Digital key unlock with full-screen black-flash + UNLOCKED reveal',
      'Active stay home with running bill (room + services live total)',
      'Room service item picker + housekeeping time slot picker',
      'Itemized check-out screen with PAID reveal animation',
      'Demo account auto-creates on first tap — testers skip signup',
      'Bottom tab navigation with light/dark adaptive theming',
    ],
    link: 'https://hotelbooking-95a05.web.app',
    demo: 'https://hotelbooking-95a05.web.app',
    github: 'https://github.com/callmeHeinHtet/hotelbookingtesting',
    category: 'mobile',
    status: 'completed',
    accent: '#C44A1F',
    panelBg: '#F0EBDD',
    metrics: [
      { label: 'YEAR', value: '2026' },
      { label: 'SCREENS', value: '12' },
      { label: 'ANIMATIONS', value: '04' },
      { label: 'STATUS', value: 'LIVE' },
    ],
  },
  {
    title: 'Splitr',
    description:
      'AI-powered restaurant bill splitter — snap a receipt, tap who had what, send each friend a personalized pay link.',
    longDescription:
      "A mobile-first bill-splitter built around one constraint: no signups, ever. You photograph a receipt, Gemini Vision parses it into typed line items in seconds, you tap-assign each item to a person, and the app generates per-friend personalized URLs they can open to see exactly what they owe and pay you via Venmo, PayPal, or Cash App. The bill URL itself is the access token; localStorage tracks ownership for edit-vs-view UX. Built end-to-end and shipped on Vercel.",
    image: 'images/Splitr.png',
    tags: [
      'AI Vision',
      'Mobile-First',
      'No-Auth UX',
      'End-to-End',
      'Production',
    ],
    technologies: [
      'Next.js 16',
      'TypeScript',
      'Postgres (Supabase)',
      'Prisma 7',
      'Vercel AI SDK',
      'Gemini Vision',
      'Tailwind CSS v4',
      'Web Share API',
    ],
    features: [
      'AI receipt parsing with multi-model Gemini fallback chain',
      'Tap-to-assign UX — select a person, tap items to toggle',
      'Personalized share URLs so friends only see their own amount',
      'Bulk group-message share that works with any messenger',
      'Optimistic UI with debounced, serialized save (no save races)',
      'Currency-aware formatting via Intl (auto-handles JPY, MMK, EUR, USD…)',
      'Manual paid-tracking with progress bar and history of past bills',
      'Read-only mode for shared URLs via localStorage ownership',
    ],
    link: 'https://splitr-omega-hazel.vercel.app',
    demo: 'https://splitr-omega-hazel.vercel.app',
    github: 'https://github.com/callmeHeinHtet/Splitr',
    category: 'fullstack',
    status: 'completed',
    accent: '#E0734D',
    panelBg: '#FFF2EC',
    metrics: [
      { label: 'YEAR', value: '2026' },
      { label: 'USERS', value: '∞' },
      { label: 'AI MODELS', value: '04' },
      { label: 'STATUS', value: 'LIVE' },
    ],
  },
];
