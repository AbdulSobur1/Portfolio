import { SectionHeader } from "@/components/section-header"
import { SectionWrapper } from "@/components/section-wrapper"
import { CURRENTLY_BUILDING } from "@/lib/content"

export function CurrentlyBuilding() {
  return (
    <SectionWrapper id="currently-building" className="bg-muted/20">
      <div className="flex flex-col gap-10 md:gap-12">
        <SectionHeader
          label="Now"
          heading="What I'm currently building."
          description="Active focus areas I am shipping and refining."
        />
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {CURRENTLY_BUILDING.map((item) => (
            <article key={item.title} className="rounded-xl border border-border bg-card p-5 md:p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <span className="text-[11px] font-medium text-accent px-2 py-1 rounded-full bg-accent/10 border border-accent/30">
                  {item.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">{item.note}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
