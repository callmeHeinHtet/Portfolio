import { BASE_PATH } from '@/utils/constants';

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
}

export const projects: Project[] = [
  {
    title: 'Hotel Booking System',
    description: 'Modern hotel booking platform with member discounts and seamless reservation flow',
    longDescription: 'A comprehensive hotel booking interface featuring intuitive room selection, member discount system up to 30%, and mobile-optimized booking flow. Built with modern design principles and user-centered approach for optimal conversion rates.',
    image: 'images/hotel-booking-ui.png',
    tags: ['UI/UX Design', 'Responsive', 'Booking System', 'Modern Design'],
    technologies: ['Dart', 'Flutter', 'Firebase', 'UI/UX Design'],
    features: [
      'Intuitive room selection interface',
      'Member discount system (up to 30%)',
      'Mobile-first responsive design',
      'Streamlined booking flow',
      'Real-time availability updates'
    ],
    link: 'https://github.com/callmeHeinHtet/hotelbookingtesting',
    github: 'https://github.com/callmeHeinHtet/hotelbookingtesting',
    category: 'mobile',
    status: 'completed'
  },
  {
    title: 'University Library System',
    description: 'Multilingual digital library with AI chatbot integration for enhanced student experience',
    longDescription: 'A comprehensive university library website supporting both English and Thai languages, featuring digital resource access and an intelligent chatbot for 24/7 student assistance. Designed with clean, academic-focused interface for optimal usability.',
    image: 'images/university-library.png',
    tags: ['Education', 'Multilingual', 'AI Integration', 'Academic'],
    technologies: ['React', 'Next.js', 'AI/Chatbot', 'Internationalization'],
    features: [
      'Bilingual interface (EN/TH)',
      'Digital resource management',
      'AI-powered student assistance chatbot',
      'Academic-focused clean design',
      '24/7 accessibility'
    ],
    link: 'https://github.com/callmeHeinHtet/Chatbot',
    github: 'https://github.com/callmeHeinHtet/Chatbot',
    demo: 'https://chatbot-omega-ecru-39.vercel.app/',
    category: 'fullstack',
    status: 'completed'
  },
  {
    title: 'RestroFlow - Restaurant POS',
    description: 'Full-featured Point of Sale system for restaurants with real-time kitchen display and analytics',
    longDescription: 'A comprehensive Restaurant POS system built for real-world use. Features visual table management, touch-optimized order taking, real-time Kitchen Display System, role-based access control, inventory tracking, and detailed sales analytics. Currently in use at a family restaurant.',
    image: 'images/restroflow.png',
    tags: ['Full Stack', 'Real-time', 'Business App', 'POS System'],
    technologies: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth', 'SSE', 'Tailwind CSS', 'Recharts'],
    features: [
      'Visual table management with real-time status',
      'Touch-optimized order taking interface',
      'Real-time Kitchen Display System (KDS)',
      'Role-based access (Admin, Manager, Waiter, Kitchen)',
      'Inventory tracking with low-stock alerts',
      'Sales analytics (daily/weekly/monthly reports)',
      'CSV/Excel export & receipt generation'
    ],
    link: 'https://restroflow-o1aox899f-hein-htet-soes-projects-bb1e9f0f.vercel.app',
    demo: 'https://restroflow-o1aox899f-hein-htet-soes-projects-bb1e9f0f.vercel.app',
    github: 'https://github.com/callmeHeinHtet/Restroflow',
    category: 'fullstack',
    status: 'completed'
  }
]       