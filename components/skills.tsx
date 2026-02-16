import { SectionWrapper } from "@/components/section-wrapper"
import { SectionHeader } from "@/components/section-header"
import { Badge } from "@/components/ui/badge"

const skillCategories = [
  {
    name: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Three.js",
    ],
  },
  {
    name: "Backend",
    skills: [
      "Node.js",
      "Python",
      "GraphQL",
      "REST APIs",
      "WebSockets",
      "Microservices",
    ],
  },
  {
    name: "Databases",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "DynamoDB",
      "Neon",
      "Prisma",
      "Drizzle",
      "Supabase",
    ],
  },
]

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <div className="flex flex-col gap-12">
        <SectionHeader
          label="Skills"
          heading="Core technologies I use to ship projects."
          description="My current stack across frontend, backend, and databases."
        />

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col gap-4 p-6 rounded-lg border border-border bg-card"
            >
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-secondary text-secondary-foreground hover:bg-accent/10 hover:text-accent transition-colors cursor-default font-medium"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
