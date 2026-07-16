
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
    title: 'Aung Naing Thu Hotel',
    description:
      'The live property-management system for a 47-room hotel in Pyapon, Myanmar — booking, folio billing, and operations, running in production on real money.',
    longDescription:
      "A full PMS I built and still operate: public booking site, staff admin, and the billing engine behind a 47-room hotel. It takes real reservations, bills in MMK, and holds real guest records — so the work that matters is correctness, cost, and security rather than features. Money has to be right to the kyat, guest data has to stay private, and the thing has to keep selling rooms on a free hosting tier. Every decision below is shaped by one of those three constraints.",
    image: 'images/ANT.webp',
    tags: [
      'Production System',
      'Real Revenue',
      'Billing Correctness',
      'Security Hardening',
      'Cost Engineering',
    ],
    technologies: [
      'Next.js 14',
      'TypeScript',
      'Prisma',
      'PostgreSQL (Supabase)',
      'Upstash Redis',
      'Vercel',
      'Tailwind CSS',
      'GitHub Actions',
    ],
    features: [
      'Migrated the production database from Neon to Supabase while the hotel kept taking bookings — same Singapore region to hold latency, row-level security on, and the old instance retained as a cold rollback behind a single env swap.',
      'Date-effective pricing: a RoomRate history table bills every night at the rate in force on that night, so a mid-stay change never reaches a guest already booked and a raise applies only from its effective date forward. Extra-bed rates are snapshotted per booking for the same reason.',
      'Cut database egress ~99% and kept the whole system inside a free hosting tier. The admin dashboard polls a 30-byte change-token endpoint — a hash of the newest timestamp and row count — and only pulls the full dataset when that token moves. Staff see changes within 60s and instantly on tab focus; an idle dashboard costs almost nothing.',
      'Hardened through two self-run pentests: closed unauthenticated data-leak endpoints, an X-Forwarded-For rate-limit bypass, and guest enumeration on booking lookup. Rate-limit state moved to Upstash Redis so it survives serverless cold starts, fail-open so a cache outage can never block a booking.',
    ],
    link: 'https://aung-naing-thu.vercel.app',
    demo: 'https://aung-naing-thu.vercel.app',
    category: 'fullstack',
    status: 'completed',
    accent: '#8C4A2F',
    panelBg: '#F5EFE6',
    aspect: 'desktop',
    metrics: [
      { label: 'YEAR', value: '2026' },
      { label: 'ROOMS', value: '47' },
      { label: 'EGRESS', value: '-99%' },
      { label: 'STATUS', value: 'LIVE' },
    ],
  },
  {
    title: 'RestroFlow',
    description:
      'The live POS for a hotel restaurant and its KTV rooms — orders, hourly karaoke billing, and meals charged straight to a guest\'s room folio.',
    longDescription:
      "A point-of-sale system running a dining floor and an attached KTV (karaoke) operation in Myanmar, wired into the hotel PMS next door so a guest can eat now and settle at checkout. Two systems moving the same money is where the difficulty lives: a charge must never post twice, a slow POS must never stall a hotel checkout, and a waiter on a dropped connection must still be able to take an order. Most of the design below is about what happens when something fails, not when it works.",
    image: 'images/RestroFlow.webp',
    tags: [
      'Production System',
      'Systems Integration',
      'Idempotency',
      'Offline-First',
      'RBAC',
    ],
    technologies: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Prisma 6',
      'PostgreSQL (Neon)',
      'NextAuth',
      'IndexedDB',
      'Vercel',
    ],
    features: [
      'Charges post to the hotel folio idempotently. Every post carries the order\'s own identity as an externalRef; the hotel dedupes on it and answers deduped: true if it has seen it before. A double-click, a retry, or an offline replay can never bill a guest twice for the same meal. Verified against the live contract end-to-end — 17/17 assertions, including the same ref twice leaving exactly one charge row.',
      'Settlement runs in reverse, automatically. When the hotel marks a booking checked out it calls back into the POS to flip every room charge on that booking to settled. The call is fire-and-forget on a 5s timeout, so a POS that is slow or down can never delay or fail a guest checkout — and a manual settle endpoint stays as the fallback for charges posted while the callback was unavailable.',
      'Offline order-taking with an IndexedDB write outbox. Orders and payments taken without a connection queue locally and replay FIFO on reconnect; the operation id doubles as the idempotency key, so the create endpoint returns the existing order unchanged if that id already landed. No external sync library — the whole thing is a few hundred lines.',
      'Rate limiting keyed per user, not per IP. Every device in the building — waiter tablets, the kitchen display, the cashier, the KTV pads — leaves the same WiFi through one NAT address, so an IP-keyed limit hands the entire restaurant a single shared budget and starts throttling the floor at the exact moment it is busiest. Load-tested against a local Docker copy of the schema: 8 concurrent waiters running 32 full order cycles, 160/160 requests clean, p50 32ms, no deadlocks or order-number races.',
      'Five roles (admin / manager / waiter / kitchen / KTV) enforced at three independent layers — middleware redirects, per-handler session checks, and UI gating — plus constant-time PIN comparison with per-IP lockout on the KTV room pads, and an append-only audit log on every sensitive mutation, so "who voided that bill" always has an answer.',
    ],
    link: 'https://restroflow-mu.vercel.app',
    category: 'fullstack',
    status: 'completed',
    accent: '#C2703F',
    panelBg: '#F2EAE1',
    aspect: 'desktop',
    metrics: [
      { label: 'YEAR', value: '2026' },
      { label: 'ROLES', value: '05' },
      { label: 'CONTRACT', value: '17/17' },
      { label: 'STATUS', value: 'LIVE' },
    ],
  },
  {
    title: 'Scion of the Underworld',
    description:
      'My portfolio reimagined as a Hades-style game menu — navigate Boons, Codex, and Contracts like a Supergiant roguelite main menu.',
    longDescription:
      "A full reskin of my portfolio as a single-viewport, stateful game menu in the visual language of Supergiant's Hades. Five 'paths' — Boons Bestowed (projects), The Scion's Codex (about), House Contracts (contact), Mirror of Night (skills), Chronicle of Runs (timeline) — plus a Souls & Summons social board, all driven like a controller menu: arrows/Enter/Esc on desktop, a device-detected touch Back button on phones. Every figure is me, hand-painted into four 'aspects' (Hero, Chronicler, Herald, Warden) with Gemini's nano-banana image model and alpha-cut by a custom sharp pipeline; every frame, sigil, and brazier is a painted asset rather than a CSS box. Screen changes use a knife-cut curtain transition — a glowing blade slashes the screen and the two halves topple away under gravity to reveal the next. Shipped as one dependency-free HTML file.",
    image: 'images/Scion.webp',
    tags: [
      'Game-Menu UI',
      'Hand-Painted',
      'Stateful SPA',
      'Motion Design',
      'Zero Dependencies',
    ],
    technologies: [
      'Vanilla JS',
      'View Transitions API',
      'CSS clip-path',
      'SVG filters',
      'Cormorant Unicase / IM Fell',
      'Gemini nano-banana (FAL)',
      'sharp image pipeline',
    ],
    features: [
      'Single-viewport stateful menu — 7 screens swapped via a data-attribute state machine',
      'Knife-cut curtain transition: a glowing blade slashes the screen and the halves fall away under gravity',
      'Projects shown as Hades "Boons" with rarity tiers, painted sigils, and expand-to-detail',
      'Mirror of Night skill tree with hand-cut gemstone rank orbs inside a painted oval frame',
      'Four hand-painted "aspects" of me, generated and alpha-cut by a custom image pipeline',
      'Controller-style nav on desktop (arrows / Enter / Esc) + a device-detected touch Back button',
      'Painted-everything aesthetic: vellum noise, Greek-key borders, gold corner brackets, drifting embers',
      'Responsive (phone + tablet) and tuned to Lighthouse 95+/100 across the board',
    ],
    link: 'scion.html',
    demo: 'scion.html',
    github: 'https://github.com/callmeHeinHtet/Portfolio',
    category: 'frontend',
    status: 'completed',
    accent: '#f5c44a',
    panelBg: '#160b1f',
    aspect: 'desktop',
    metrics: [
      { label: 'YEAR', value: '2026' },
      { label: 'SCREENS', value: '07' },
      { label: 'DEPS', value: '00' },
      { label: 'STATUS', value: 'LIVE' },
    ],
  },
  {
    title: 'RSU Library',
    description:
      'AI library assistant for Rangsit University — risograph/comic poster site with a Gemini-powered chatbot.',
    longDescription:
      "A four-page library site (Home, Resources, Services, News) plus a dedicated chatbot, all wrapped in a Risograph / old-school comic poster visual system. Cyan halftone hero, hard pink drop-shadows, ticket-style status panel, stamp motifs, big uppercase Funnel Display. The chatbot runs through an Express proxy that holds the Gemini API key server-side (the v0 had it shipped to the browser), with multi-turn memory via startChat(), per-IP rate limiting, and EN/TH bilingual support that resets context on language switch. Dark mode is rebuilt as a 'neon nighttime poster' rather than a desaturated invert — same palette, brighter cyan/pink/yellow, colored neon shadows.",
    image: 'images/Chatbot.webp',
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
    image: 'images/Stay.webp',
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
    image: 'images/Splitr.webp',
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
