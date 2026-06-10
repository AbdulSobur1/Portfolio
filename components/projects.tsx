"use client"

import { ExternalLink, Github, Star } from "lucide-react"
import Link from "next/link"
import { SectionWrapper } from "@/components/section-wrapper"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
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

const STATIC_PROJECTS = [
  {
    id: 1,
    name: "UmmahConnect",
    html_url: "https://github.com/AbdulSobur1/UmmahConnect",
    homepage: null,
    description: "A community platform for Muslim communities to connect, share events, and manage resources.",
    language: "TypeScript",
    stargazers_count: 0,
    topics: ["Next.js", "PostgreSQL", "Tailwind"],
  },
  {
    id: 2,
    name: "MedCore",
    html_url: "https://github.com/AbdulSobur1/MedCore",
    homepage: null,
    description: "Healthcare management system with patient records, appointments, and analytics dashboard.",
    language: "TypeScript",
    stargazers_count: 0,
    topics: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: 3,
    name: "Portfolio",
    html_url: "https://github.com/AbdulSobur1/Portfolio",
    homepage: "https://portfolio-lyart-alpha-11.vercel.app",
    description: "Personal portfolio site built with Next.js, shadcn/ui, and modern design patterns.",
    language: "TypeScript",
    stargazers_count: 0,
    topics: ["Next.js", "shadcn/ui", "Tailwind"],
  },
  {
    id: 4,
    name: "NexaChat",
    html_url: "https://github.com/AbdulSobur1/NexaChat",
    homepage: null,
    description: "Real-time chat application with WebSocket support and modern UI.",
    language: "TypeScript",
    stargazers_count: 0,
    topics: ["React", "WebSockets", "Node.js"],
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

function formatProjectName(name: string) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function ProjectsGrid({ projects }: { projects: DisplayProject[] }) {
  const ref = useScrollReveal()

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-5">
      {projects.map((project, index) => (
        <article
          key={project.id}
          className="fade-in-up group rounded-xl border border-[#1e2530] bg-[#12161a] p-6 flex flex-col gap-4 hover:border-emerald-300/20 transition-all duration-300 hover:shadow-[0_0_20px_rgba(110,231,183,0.05)]"
          style={{ transitionDelay: `${index * 0.1}s` }}
        >
          {/* Top row - repo name + stars */}
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-emerald-300 font-medium text-base">
              <Link href={`/projects/${encodeURIComponent(project.name)}`} className="hover:underline">
                {formatProjectName(project.name)}
              </Link>
            </h3>
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
              aria-label={`Open ${project.name} on GitHub`}
            >
              <Github className="h-5 w-5" />
            </a>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 text-xs text-slate-500 font-mono">
            <Star className="h-3.5 w-3.5" />
            <span>{project.stargazers_count}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-400 leading-relaxed flex-1">
            {project.description || "No description provided."}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {"topics" in project && project.topics
              ? project.topics.map((topic: string) => (
                  <span
                    key={topic}
                    className="px-2 py-0.5 text-[11px] font-mono rounded-full bg-white/5 border border-white/10 text-slate-400"
                  >
                    {topic}
                  </span>
                ))
              : 'language' in project && project.language && (
                  <span className="px-2 py-0.5 text-[11px] font-mono rounded-full bg-white/5 border border-white/10 text-slate-400">
                    {project.language}
                  </span>
                )}
          </div>

          {/* Links */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <Link
              href={`/projects/${encodeURIComponent(project.name)}`}
              className="text-xs text-emerald-300 hover:underline font-medium"
            >
              View Case Study →
            </Link>
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                Live Demo
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  )
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
