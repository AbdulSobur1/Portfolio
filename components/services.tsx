import { SectionHeader } from "@/components/section-header"
import { SectionWrapper } from "@/components/section-wrapper"
import { SERVICES } from "@/lib/content"

export function Services() {
  return (
    <SectionWrapper id="services" className="bg-muted/20">
      <div className="flex flex-col gap-12">
        <SectionHeader
          label="Services"
          heading="What I can help you build."
          description="Focused service packages for product teams, founders, and clients."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4"
            >
              <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                {service.deliverables.map((item) => (
                  <li key={item} className="before:content-['•'] before:mr-2 before:text-accent">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

