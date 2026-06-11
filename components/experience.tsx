'use client'

import { useEffect, useRef } from 'react'
import { SectionWrapper } from '@/components/section-wrapper'

const EXPERIENCE = [
  {
    role: 'Junior Full Stack Engineer',
    company: 'Freelance & Personal Projects',
    period: '2024 – Present',
    description:
      'Building and shipping full-stack applications with Next.js, TypeScript, Node.js, and modern databases. Delivered UmmahConnect (Muslim networking platform) and MedCore HMS (hospital management system) from planning to deployment.',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Drizzle', 'Tailwind CSS'],
    highlight: 'Shipped 4+ production-ready projects',
  },
  {
    role: 'Backend Development Practice',
    company: 'Independent Projects',
    period: '2023 – 2024',
    description:
      'Designed backend services with REST and GraphQL APIs, built realtime features with WebSockets, and practised auth patterns and database modelling across multiple codebases.',
    tech: ['Node.js', 'Python', 'GraphQL', 'REST APIs', 'WebSockets', 'MongoDB'],
    highlight: 'Moved from consuming APIs to building them',
  },
  {
    role: 'Frontend Development Foundation',
    company: 'Self-Directed Learning',
    period: '2022 – 2023',
    description:
      'Learned production-style frontend development with React and Next.js. Built responsive UIs, established component patterns, and shipped the first version of the portfolio.',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'],
    highlight: 'First shipped product: portfolio site',
  },
]

export function Experience() {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const entries = listRef.current?.querySelectorAll('.reveal')
    if (!entries) return
    const observer = new IntersectionObserver(
      (obs) => {
        obs.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    entries.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <SectionWrapper id="experience">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="text-xs font-mono font-medium text-emerald-300 tracking-widest uppercase">
            EXPERIENCE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            3 years of practical full-stack growth.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed mt-1">
            From frontend foundations to shipping full-stack products as a junior engineer.
          </p>
        </div>

        <div ref={listRef} className="relative flex flex-col gap-0">
          {/* vertical line */}
          <div className="absolute left-[11px] top-3 bottom-3 w-px bg-emerald-300/15 hidden sm:block" />

          {EXPERIENCE.map((exp, i) => (
            <div
              key={i}
              className="reveal relative sm:pl-10 pb-10 last:pb-0"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* dot */}
              <div className="hidden sm:flex absolute left-0 top-1.5 h-6 w-6 rounded-full border-2 border-emerald-300/60 bg-[#0d0f11] items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-emerald-300" />
              </div>

              <div className="rounded-xl border border-[#1e2530] bg-[#12161a] p-5 sm:p-6 hover:border-emerald-300/20 transition-colors duration-300">
                {/* period */}
                <span className="text-xs font-mono text-emerald-300/60 mb-3 block">
                  {exp.period}
                </span>
                {/* role */}
                <h3 className="text-base font-bold text-white">{exp.role}</h3>
                <p className="text-sm font-medium text-emerald-300 mt-0.5 mb-3">
                  {exp.company}
                </p>
                {/* description */}
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  {exp.description}
                </p>
                {/* highlight */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-emerald-300 text-xs">✓</span>
                  <span className="text-xs text-slate-400 italic">{exp.highlight}</span>
                </div>
                {/* tech chips */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[11px] font-mono rounded-full bg-white/5 border border-white/10 text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
