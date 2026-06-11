import { SectionWrapper } from "@/components/section-wrapper"
import { ProjectsGrid } from "@/components/projects-grid"
import { GITHUB_USERNAME } from "@/lib/constants"

type GithubRepo = {
  id: number
  name: string
  html_url: string
  homepage: string | null
  description: string | null
  readme_summary?: string | null
  language: string | null
  stargazers_count: number
  updated_at: string
  fork: boolean
}

interface StaticProject {
  id: number
  name: string
  html_url: string
  homepage: string | null
  description: string | null
  language: string
  stargazers_count: number
  topics: string[]
}

type DisplayProject = GithubRepo | StaticProject

const STATIC_PROJECTS: StaticProject[] = [
  {
    id: 1,
    name: "UmmahConnect",
    html_url: "https://github.com/AbdulSobur1/UmmahConnect",
    homepage: null,
    description: "Muslim professional networking platform. Auth, community features, real-time messaging. Built with Next.js, Drizzle ORM, Neon, and Auth.js.",
    language: "TypeScript",
    stargazers_count: 0,
    topics: ["Next.js", "Drizzle", "Auth.js", "Neon"],
  },
  {
    id: 2,
    name: "MedCore HMS",
    html_url: "https://github.com/AbdulSobur1/MedCore",
    homepage: null,
    description: "Hospital Management System with role-based routing, patient records, appointments, and analytics dashboard.",
    language: "TypeScript",
    stargazers_count: 0,
    topics: ["React 19", "Tailwind v4", "Zod", "Next.js"],
  },
  {
    id: 3,
    name: "Portfolio",
    html_url: "https://github.com/AbdulSobur1/Portfolio",
    homepage: "https://portfolio-lyart-alpha-11.vercel.app",
    description: "Personal portfolio with Spline 3D hero, command palette, case study pages, writing routes, and GitHub API integration.",
    language: "TypeScript",
    stargazers_count: 2,
    topics: ["Next.js", "shadcn/ui", "21st.dev", "Spline"],
  },
  {
    id: 4,
    name: "NexaChat",
    html_url: "https://github.com/AbdulSobur1/NexaChat",
    homepage: null,
    description: "Android chat app with real-time messaging, Firebase Auth, and modern Material 3 UI built in Kotlin with Jetpack Compose.",
    language: "Kotlin",
    stargazers_count: 0,
    topics: ["Kotlin", "Jetpack Compose", "Firebase"],
  },
]

async function getProjects(): Promise<GithubRepo[]> {
  try {
    const headers: Record<string, string> = {}
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      { cache: "no-store", headers }
    )

    if (!response.ok) {
      return []
    }

    const repos = (await response.json()) as GithubRepo[]
    return repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count
        }
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      })
      .slice(0, 8)
  } catch {
    return []
  }
}

export async function Projects() {
  const projects = await getProjects()
  const displayProjects: DisplayProject[] = projects.length > 0 ? projects : STATIC_PROJECTS

  return (
    <SectionWrapper id="projects">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="text-xs font-mono font-medium text-emerald-300 tracking-widest uppercase">
            PROJECTS
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white text-balance">
            Selected client and product work.
          </h2>
          <p className="text-slate-400 leading-relaxed mt-2">
            Professional builds and product experiments, backed by live GitHub data and case studies.
          </p>
        </div>

        <ProjectsGrid projects={displayProjects} />
      </div>
    </SectionWrapper>
  )
}
