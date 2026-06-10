export type ProjectStatus = 'live' | 'prototype' | 'in_progress' | 'archived'

export interface CodeProject {
  id: string
  order: number
  title: string
  tagline: string
  description: string
  whyBuilt: string
  stack: string[]
  highlights: string[]
  status: ProjectStatus
  type: string
  githubUrl: string
  liveUrl?: string
  previewImage?: string
  repoLabel: string
  liveLabel: string
  accent: string
}

export const CODE_PROJECTS: CodeProject[] = [
  {
    id: 'owahworld',
    order: 1,
    title: 'OWAH.WORLD',
    tagline: 'A living digital OS where memory, code, and feeling collide.',
    description:
      'Personal flagship world architecture built as a cinematic operating system, not a portfolio grid. Four connected routes frame a sacred center object and turn identity + engineering into a navigable space.',
    whyBuilt:
      'Built to archive identity, philosophy, and craft in one immersive system where UI, atmosphere, and interaction all support a single narrative.',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'R3F', 'Three.js', 'Framer Motion', 'Tailwind CSS 4'],
    highlights: [
      'Draggable CD centerpiece with inertia and bloom',
      'Global chrome background and liquid-glass dock',
      'Multi-world route architecture (Landing/Code/Words/World)',
    ],
    status: 'in_progress',
    type: 'Flagship Experience',
    githubUrl: 'https://github.com/Born2tweak/owah.world',
    liveUrl: 'https://owah-world.vercel.app',
    repoLabel: 'View Repo',
    liveLabel: 'View Live',
    accent: '#00c4a8',
  },
  {
    id: 'kinematiciq',
    order: 2,
    title: 'KinematicIQ',
    tagline: 'Athlete movement intelligence from camera to biomechanics insight.',
    description:
      'Software-first movement analysis that turns pose estimation into coach-readable signal. The system focuses on rep phases, movement quality, and readiness indicators from camera capture.',
    whyBuilt:
      'Built to answer readiness and asymmetry questions without expensive hardware, using practical tooling for athletes and coaches.',
    stack: ['TypeScript', 'React 18', 'Vite', 'MediaPipe Tasks Vision', 'React Router', 'Vitest'],
    highlights: [
      'Real-time pose overlay with joint tracking',
      'Rep counting and squat phase detection',
      'Layered architecture for camera, scoring, and results flow',
    ],
    status: 'in_progress',
    type: 'Applied AI / Biomechanics',
    githubUrl: 'https://github.com/Born2tweak/KinematicIQ',
    repoLabel: 'View Repo',
    liveLabel: 'No Live Demo',
    accent: '#57c7ff',
  },
  {
    id: 'ohmplace',
    order: 3,
    title: 'OhmPlace',
    tagline: 'Campus marketplace for verified students and faster part access.',
    description:
      'Marketplace concept focused on local campus trade for engineering parts. Trust and speed are prioritized through .edu verification and campus-scoped identity.',
    whyBuilt:
      'Built to reduce project delays from shipping and unreliable listings by enabling verified campus-to-campus exchange.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Supabase Auth'],
    highlights: [
      '.edu-only magic-link authentication',
      'Campus trust layer as product foundation',
      'Roadmap-ready architecture for listings and messaging',
    ],
    status: 'in_progress',
    type: 'Marketplace Platform',
    githubUrl: 'https://github.com/Born2tweak/OhmPlace',
    repoLabel: 'View Repo',
    liveLabel: 'No Live Demo',
    accent: '#9d8cff',
  },
  {
    id: 'backpackvol2',
    order: 4,
    title: 'BackpackVol2',
    tagline: 'Trusted student marketplace with listings, chat, and safety rails.',
    description:
      'Earlier full-stack campus marketplace iteration with verified identity, real-time messaging, listing media, and optimized discovery flows.',
    whyBuilt:
      'Built as a practical proof of safe P2P commerce for students before evolving the concept into later systems.',
    stack: ['Next.js 14', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth', 'Pusher', 'Redis'],
    highlights: [
      'Listings CRUD with image upload',
      'Realtime buyer/seller chat',
      'Search optimization and trust signals',
    ],
    status: 'archived',
    type: 'Marketplace Prototype',
    githubUrl: 'https://github.com/Born2tweak/BackpackVol2',
    repoLabel: 'View Repo',
    liveLabel: 'No Live Demo',
    accent: '#7fd6b4',
  },
  {
    id: 'motoiq',
    order: 5,
    title: 'MotoIQ',
    tagline: 'Explore vehicle systems like a mechanic-in-training.',
    description:
      'Interactive automotive learning surface for navigating subsystems, components, and maintenance context in a visual, learner-friendly format.',
    whyBuilt:
      'Built to make complex vehicle systems understandable without forcing students through dense service-manual workflows.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    highlights: [
      'Vehicle selection and subsystem exploration',
      'Component-level inspection and guidance',
      'Live static deployment with practical educational focus',
    ],
    status: 'live',
    type: 'Interactive Learning Tool',
    githubUrl: 'https://github.com/Born2tweak/MotoIQ',
    liveUrl: 'https://motoiq.netlify.app',
    repoLabel: 'View Repo',
    liveLabel: 'View Live',
    accent: '#ffbf73',
  },
  {
    id: 'drakotune',
    order: 6,
    title: 'DrakoTune',
    tagline: 'AI-assisted underground vocal engineering, emotion first.',
    description:
      'Prototype DSP workflow for vocals using practical signal-chain processing and test-backed audio transforms rather than black-box claims.',
    whyBuilt:
      'Built to bridge emotional artist language and engineering-grade processing with a human-in-the-loop workflow.',
    stack: ['Python 3.10+', 'Pedalboard', 'FFmpeg', 'NumPy', 'Librosa', 'pytest'],
    highlights: [
      'Alpha DSP chain with before/after export',
      'Test-backed harshness reduction behavior',
      'Product architecture docs for future UI/API layers',
    ],
    status: 'prototype',
    type: 'Audio Engineering Prototype',
    githubUrl: 'https://github.com/Born2tweak/DrakoTune',
    repoLabel: 'View Repo',
    liveLabel: 'No Live Demo',
    accent: '#c7a0ff',
  },
]

export function getCodeProjectById(id: string) {
  return CODE_PROJECTS.find((project) => project.id === id) ?? null
}
