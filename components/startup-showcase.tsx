import { TrendingUp, Users, Zap } from "lucide-react"
import { SectionWrapper } from "@/components/section-wrapper"
import { SectionHeader } from "@/components/section-header"

const startups = [
  {
    name: "Project Sprint Build",
    role: "Junior Full Stack Engineer",
    status: "Completed",
    description:
      "Built and shipped a complete full-stack web app from planning to deployment, focusing on clean UI, API reliability, and practical architecture choices.",
    impact: [
      {
        icon: TrendingUp,
        label: "Delivery",
        value: "Shipped production-ready features quickly",
      },
      { icon: Users, label: "Users", value: "Used by real project users" },
      {
        icon: Zap,
        label: "Performance",
        value: "Improved load and interaction responsiveness",
      },
    ],
    learnings:
      "The best architecture is one you can maintain and ship confidently. I prioritize clarity, delivery, and measurable improvements.",
  },
  {
    name: "Portfolio & API Projects",
    role: "Junior Full Stack Engineer",
    status: "Ongoing",
    description:
      "Built multiple projects that combine modern frontend patterns with backend APIs, realtime features, and database integrations.",
    impact: [
      { icon: TrendingUp, label: "Growth", value: "8 projects shipped so far" },
      { icon: Users, label: "Collaboration", value: "Worked with teammates and reviewers" },
      { icon: Zap, label: "Speed", value: "Faster iteration through reusable components" },
    ],
    learnings:
      "Consistent shipping and feedback loops are how I improve. Each project helps me level up as SoburrX.",
  },
]

export function StartupShowcase() {
  return (
    <SectionWrapper id="startups" className="bg-muted/30">
      <div className="flex flex-col gap-12">
        <SectionHeader
          label="Project Journey"
          heading="Building products with practical impact."
          description="Real project work that reflects my growth as a junior full-stack engineer."
        />

        {/* Startup cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {startups.map((startup) => (
            <div
              key={startup.name}
              className="flex flex-col gap-6 p-6 md:p-8 rounded-xl border border-border bg-card"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground">
                    {startup.name}
                  </h3>
                  <span className="text-xs font-mono font-medium text-accent px-2.5 py-1 rounded-full border border-accent/30 bg-accent/10">
                    {startup.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{startup.role}</p>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {startup.description}
              </p>

              {/* Impact metrics */}
              <div className="flex flex-col gap-3">
                {startup.impact.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-accent/10">
                      <item.icon className="h-4 w-4 text-accent" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        {item.label}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Key learning */}
              <div className="pt-4 border-t border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Key Learning
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                  {startup.learnings}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
