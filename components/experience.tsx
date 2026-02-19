import { SectionWrapper } from "@/components/section-wrapper"
import { SectionHeader } from "@/components/section-header"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    role: "Junior Full Stack Engineer",
    company: "Personal & Client Projects",
    period: "2024 - Present",
    description:
      "Building and shipping full-stack applications with Next.js, TypeScript, Node.js, and modern databases. Focused on clean architecture, reliable APIs, and responsive UI.",
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    impact: "Shipped 8 projects and improved delivery speed through reusable components",
  },
  {
    role: "Backend Development Practice",
    company: "Independent Learning Projects",
    period: "2023 - 2024",
    description:
      "Designed backend services with REST APIs and GraphQL, added realtime features with WebSockets, and practiced service separation using microservice-style patterns.",
    tech: ["Node.js", "Python", "GraphQL", "REST APIs", "WebSockets", "MongoDB"],
    impact: "Built multiple backend-driven projects with authentication and data workflows",
  },
  {
    role: "Frontend Development Foundation",
    company: "Self-Directed Training",
    period: "2022 - 2023",
    description: 
      "Started building production-style frontend applications using React and Next.js, with strong attention to UI consistency, responsive layouts, and accessibility basics.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"],
    impact: "Established a full-stack workflow that led to consistent project delivery",
  },
]

export function Experience() {
  return (
    <SectionWrapper id="experience">
      <div className="flex flex-col gap-12">
        <SectionHeader
          label="Experience"
          heading="3 years of practical full-stack growth."
          description="My journey from frontend foundations to shipping full-stack applications as a junior engineer."
        />

        {/* Timeline */}
        <ol className="relative flex flex-col gap-0" aria-label="Work experience timeline">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-3 bottom-3 w-px bg-border md:left-[calc(theme(spacing.32)+7px)]" aria-hidden="true" />

          {experiences.map((exp, index) => (
            <li
              key={index}
              className="relative flex flex-col md:flex-row gap-4 md:gap-8 pb-12 last:pb-0"
            >
              {/* Date column */}
              <div className="flex items-start gap-4 md:w-32 shrink-0">
                <div className="relative z-10 mt-1.5" aria-hidden="true">
                  <div className="h-3.5 w-3.5 rounded-full border-2 border-accent bg-background" />
                </div>
                <span className="text-sm font-mono text-muted-foreground whitespace-nowrap md:hidden">
                  {exp.period}
                </span>
                <span className="text-sm font-mono text-muted-foreground whitespace-nowrap hidden md:block absolute left-0 top-0.5">
                  {exp.period}
                </span>
              </div>

              {/* Content card */}
              <div className="ml-8 md:ml-0 flex-1 p-5 rounded-lg border border-border bg-card hover:border-accent/30 transition-colors">
                <div className="flex flex-col gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-accent font-medium">
                      {exp.company}
                    </p>
                    <span className="text-xs font-mono text-muted-foreground hidden md:inline">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {exp.impact}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="text-xs bg-secondary text-secondary-foreground"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </SectionWrapper>
  )
}
