'use client'

import { useEffect, useRef } from 'react'
import { ExternalLink, Github, Star } from 'lucide-react'
import Link from 'next/link'

interface Project {
  id: number
  name: string
  html_url: string
  homepage: string | null
  description: string | null
  language: string | null
  stargazers_count: number
  topics?: string[]
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.reveal')
    if (!cards) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={gridRef} className="grid md:grid-cols-2 gap-5">
      {projects.map((project, index) => (
        <article
          key={project.id}
          className="reveal group rounded-xl border border-[#1e2530] bg-[#12161a] p-6 flex flex-col gap-4 hover:border-emerald-300/20 hover:shadow-[0_0_20px_rgba(110,231,183,0.05)] transition-all duration-300"
          style={{ transitionDelay: `${index * 80}ms` }}
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-mono text-emerald-300 font-semibold text-base leading-snug">
              {project.name}
            </h3>
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors shrink-0 mt-0.5"
              aria-label={`${project.name} on GitHub`}
            >
              <Github className="h-4 w-4" />
            </a>
          </div>

          {project.stargazers_count > 0 && (
            <div className="flex items-center gap-1 text-xs text-slate-500 font-mono -mt-2">
              <Star className="h-3 w-3" />
              <span>{project.stargazers_count}</span>
            </div>
          )}

          <p className="text-sm text-slate-400 leading-relaxed flex-1">
            {project.description ?? 'No description provided.'}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.topics?.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[11px] font-mono rounded-full bg-white/5 border border-white/10 text-slate-400"
              >
                {tag}
              </span>
            )) ?? (
              project.language && (
                <span className="px-2 py-0.5 text-[11px] font-mono rounded-full bg-white/5 border border-white/10 text-slate-400">
                  {project.language}
                </span>
              )
            )}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <Link
              href={`/projects/${encodeURIComponent(project.name)}`}
              className="text-xs font-medium text-emerald-300 hover:underline underline-offset-2"
            >
              View Case Study →
            </Link>
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-white transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                Live
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
