"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { ShimmerText } from "@/components/ui/shimmer-text"
import { FeatureSection } from "@/components/ui/feature-section"
import { AmbientOrbs } from "@/components/ui/ambient-orbs"

const skillData = {
  frontend: [
    "React", "Next.js", "TypeScript", "Tailwind CSS",
    "HTML/CSS", "JavaScript ES6+", "Responsive Design", "Accessibility",
  ],
  backend: [
    "Node.js", "Python", "GraphQL", "REST APIs", "WebSockets",
  ],
  databases: [
    "PostgreSQL", "MongoDB", "Neon", "Prisma", "Drizzle", "Supabase",
  ],
}

const steps = [
  {
    label: "Frontend",
    content: (
      <div className="flex flex-wrap gap-2">
        {skillData.frontend.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 text-sm font-mono rounded-full bg-white/5 border border-white/10 text-slate-300 hover:border-emerald-300/40 hover:text-emerald-300 transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    ),
  },
  {
    label: "Backend",
    content: (
      <div className="flex flex-wrap gap-2">
        {skillData.backend.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 text-sm font-mono rounded-full bg-white/5 border border-white/10 text-slate-300 hover:border-emerald-300/40 hover:text-emerald-300 transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    ),
  },
  {
    label: "Databases",
    content: (
      <div className="flex flex-wrap gap-2">
        {skillData.databases.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 text-sm font-mono rounded-full bg-white/5 border border-white/10 text-slate-300 hover:border-emerald-300/40 hover:text-emerald-300 transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    ),
  },
]

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <AmbientOrbs opacity="0.05" />
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="text-xs font-mono font-medium text-emerald-300 tracking-widest uppercase">
            SKILLS
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white text-balance">
            Core technologies I <ShimmerText className="text-emerald-300">ship</ShimmerText> with.
          </h2>
        </div>

        <div className="rounded-xl border border-[#1e2530] bg-[#12161a] p-6 md:p-8">
          <FeatureSection steps={steps} autoAdvanceInterval={3000} />
        </div>
      </div>
    </SectionWrapper>
  )
}
