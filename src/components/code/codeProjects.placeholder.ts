export interface CodePlaceholderProject {
  id: string
  title: string
  order: number
  accent: string
  tagline: string
  status: 'prototype' | 'in_progress' | 'live'
  type: string
  description: string
  stack: string[]
  highlights: string[]
  githubUrl?: string
  liveUrl?: string
}

export const CODE_PROJECTS_PLACEHOLDER: CodePlaceholderProject[] = [
  {
    id: 'owahworld',
    title: 'Owahworld',
    order: 1,
    accent: '#e6f6ff',
    tagline: 'A living digital operating system for memory, code, and feeling.',
    status: 'in_progress',
    type: 'Flagship Experience',
    description: 'Placeholder panel for the flagship immersive world architecture and interaction system.',
    stack: ['Next.js', 'React', 'TypeScript', 'R3F'],
    highlights: ['Multi-world routing', 'Cinematic chrome language', 'Interactive center object'],
    githubUrl: 'https://github.com/Born2tweak/owah.world',
    liveUrl: 'https://owah-world.vercel.app',
  },
  {
    id: 'kinematiciq',
    title: 'KinematicIQ',
    order: 2,
    accent: '#a6e5ff',
    tagline: 'Athlete movement intelligence from camera pose analysis.',
    status: 'in_progress',
    type: 'Applied AI / Biomechanics',
    description: 'Placeholder panel for motion analysis, rep detection, and readiness scoring roadmap.',
    stack: ['React', 'TypeScript', 'MediaPipe', 'Vite'],
    highlights: ['Live pose overlay', 'Rep phase detection', 'Coach-readable feedback'],
    githubUrl: 'https://github.com/Born2tweak/KinematicIQ',
  },
  {
    id: 'ohmplace',
    title: 'Ohmplace',
    order: 3,
    accent: '#c7d9ff',
    tagline: 'Campus parts marketplace with verified student trust.',
    status: 'in_progress',
    type: 'Marketplace Platform',
    description: 'Placeholder panel for verified campus-only component exchange workflows.',
    stack: ['Next.js', 'TypeScript', 'Supabase Auth', 'Tailwind'],
    highlights: ['.edu identity gate', 'Campus trust layer', 'Marketplace foundation'],
    githubUrl: 'https://github.com/Born2tweak/OhmPlace',
  },
  {
    id: 'backpackvol2',
    title: 'BackpackVol2',
    order: 4,
    accent: '#dbefff',
    tagline: 'A prior full-stack campus marketplace iteration.',
    status: 'prototype',
    type: 'Marketplace Prototype',
    description: 'Placeholder panel for the earlier marketplace architecture and messaging/search systems.',
    stack: ['Next.js', 'Prisma', 'PostgreSQL', 'Pusher'],
    highlights: ['Listings + chat', 'Search optimization', 'Verified student identity'],
    githubUrl: 'https://github.com/Born2tweak/BackpackVol2',
  },
  {
    id: 'motoiq',
    title: 'MotoIQ',
    order: 5,
    accent: '#87ceff',
    tagline: 'Interactive system explorer for automotive learning.',
    status: 'live',
    type: 'Interactive Learning Tool',
    description: 'Placeholder panel for subsystem visualization and mechanic-in-training guidance.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    highlights: ['Vehicle system maps', 'Component inspection', 'Maintenance guidance'],
    githubUrl: 'https://github.com/Born2tweak/MotoIQ',
    liveUrl: 'https://motoiq.netlify.app',
  },
  {
    id: 'drakotune',
    title: 'DrakoTune',
    order: 6,
    accent: '#c7d9ff',
    tagline: 'Underground vocal engineering with emotion-first DSP.',
    status: 'prototype',
    type: 'Audio Engineering Prototype',
    description: 'Placeholder panel for the alpha signal chain and future interface layer.',
    stack: ['Python', 'FFmpeg', 'Pedalboard', 'pytest'],
    highlights: ['Alpha DSP chain', 'Before/after rendering', 'Human-in-the-loop tooling'],
    githubUrl: 'https://github.com/Born2tweak/DrakoTune',
  },
]
