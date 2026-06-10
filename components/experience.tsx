"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const experiences = [
  {
    role: "Junior Full Stack Engineer",
    company: "Personal & Client Projects",
    period: "2024 - Present",
    description:
      "Building and shipping full-stack applications with Next.js, TypeScript, Node.js, and modern databases. Focused on clean architecture, reliable APIs, and responsive UI.",
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
  },
  {
    role: "Backend Development Practice",
    company: "Independent Learning Projects",
    period: "2023 - 2024",
    description:
      "Designed backend services with REST APIs and GraphQL, added realtime features with WebSockets, and practiced service separation using microservice-style patterns.",
    tech: ["Node.js", "Python", "GraphQL", "REST APIs", "WebSockets", "MongoDB"],
  },
  {
    role: "Frontend Development Foundation",
    company: "Self-Directed Training",
    period: "2022 - 2023",
    description:
      "Started building production-style frontend applications using React and Next.js, with strong attention to UI consistency, responsive layouts, and accessibility basics.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"],
  },
]

export function Experience() {
  const ref = useScrollReveal()

  return (
    <SectionWrapper id="experience">
      <div ref={ref} className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="text-xs font-mono font-medium text-emerald-300 tracking-widest uppercase">
            EXPERIENCE
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white text-balance">
            3 years of practical full-stack growth.
          </h2>
          <p className="text-slate-400 leading-relaxed mt-2">
            My journey from frontend foundations to shipping full-stack applications as a junior engineer.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-emerald-300/20" aria-hidden="true" />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="fade-in-up relative pl-8 group"
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 z-10 h-6 w-6 rounded-full border-2 border-emerald-300 bg-[#0d0f11] flex items-center justify-center group-hover:bg-emerald-300/20 transition-colors">
                  <div className="h-2 w-2 rounded-full bg-emerald-300" />
                </div>

                {/* Date */}
                <span className="text-xs font-mono text-emerald-300/60 mb-2 block">
                  {exp.period}
                </span>

                {/* Content card */}
                <div className="rounded-xl border border-[#1e2530] bg-[#12161a] p-5 hover:border-emerald-300/20 transition-all duration-300">
                  <h3 className="text-base font-bold text-white">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-emerald-300 font-medium mb-3">
                    {exp.company}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {exp.description}
                  </p>
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
      </div>
    </SectionWrapper>
  )
}
