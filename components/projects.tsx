import { SectionWrapper } from '@/components/section-wrapper'
import { ProjectsGrid } from '@/components/projects-grid'

const STATIC_PROJECTS = [
  {
    id: 1,
    name: 'UmmahConnect',
    html_url: 'https://github.com/AbdulSobur1/UmmahConnect',
    homepage: null,
    description: 'Muslim professional networking platform. Auth, community features, real-time messaging. Built with Next.js, Drizzle ORM, Neon, and Auth.js.',
    language: 'TypeScript',
    stargazers_count: 0,
    topics: ['Next.js', 'Drizzle', 'Auth.js', 'Neon'],
  },
  {
    id: 2,
    name: 'MedCore HMS',
    html_url: 'https://github.com/AbdulSobur1/MedCore',
    homepage: null,
    description: 'Hospital Management System with role-based routing, patient records, appointments, and an analytics dashboard.',
    language: 'TypeScript',
    stargazers_count: 0,
    topics: ['React 19', 'Tailwind v4', 'Zod', 'Next.js'],
  },
  {
    id: 3,
    name: 'Portfolio',
    html_url: 'https://github.com/AbdulSobur1/Portfolio',
    homepage: 'https://portfolio-lyart-alpha-11.vercel.app',
    description: 'Personal portfolio with Spline 3D hero, command palette, case study pages, writing routes, and GitHub API integration.',
    language: 'TypeScript',
    stargazers_count: 2,
    topics: ['Next.js', 'shadcn/ui', 'Spline', 'Tailwind'],
  },
  {
    id: 4,
    name: 'NexaChat',
    html_url: 'https://github.com/AbdulSobur1/NexaChat',
    homepage: null,
    description: 'Android chat app with real-time messaging, Firebase Auth, and Material 3 UI in Kotlin with Jetpack Compose.',
    language: 'Kotlin',
    stargazers_count: 0,
    topics: ['Kotlin', 'Jetpack Compose', 'Firebase'],
  },
]

async function fetchProjects() {
  try {
    const res = await fetch(
      'https://api.github.com/users/AbdulSobur1/repos?per_page=100&sort=updated',
      {
        cache: 'no-store',
        headers: process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {},
      }
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data as any[])
      .filter((r: any) => !r.fork && r.description)
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 8)
      .map((r: any) => ({
        id: r.id,
        name: r.name,
        html_url: r.html_url,
        homepage: r.homepage ?? null,
        description: r.description,
        language: r.language,
        stargazers_count: r.stargazers_count,
        topics: r.topics?.length ? r.topics : [r.language].filter(Boolean),
      }))
  } catch {
    return []
  }
}

export async function Projects() {
  const fetched = await fetchProjects()
  const projects = fetched.length > 0 ? fetched : STATIC_PROJECTS

  return (
    <SectionWrapper id="projects">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="text-xs font-mono font-medium text-emerald-300 tracking-widest uppercase">
            PROJECTS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Selected client and product work.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed mt-1">
            Professional builds and product experiments, backed by live GitHub data.
          </p>
        </div>
        <ProjectsGrid projects={projects} />
      </div>
    </SectionWrapper>
  )
}
