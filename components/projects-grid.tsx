"use client"

import { ExternalLink, Github, Star } from "lucide-react"
import Link from "next/link"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

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

function formatProjectName(name: string) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function ProjectsGrid({ projects }: { projects: DisplayProject[] }) {
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
