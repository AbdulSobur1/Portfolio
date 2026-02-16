import { SectionHeader } from "@/components/section-header"
import { SectionWrapper } from "@/components/section-wrapper"
import { BUILD_PROCESS } from "@/lib/content"

export function Process() {
  return (
    <SectionWrapper id="process">
      <div className="flex flex-col gap-12">
        <SectionHeader
          label="Process"
          heading="How I execute projects."
          description="A simple workflow that keeps delivery predictable and quality high."
        />
        <ol className="grid md:grid-cols-4 gap-4" aria-label="Project process">
          {BUILD_PROCESS.map((phase, idx) => (
            <li
              key={phase.step}
              className="rounded-xl border border-border bg-card p-5 flex flex-col gap-2"
            >
              <span className="text-xs font-mono text-accent">0{idx + 1}</span>
              <h3 className="text-base font-semibold text-foreground">{phase.step}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{phase.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </SectionWrapper>
  )
}

