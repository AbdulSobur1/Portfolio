import { SectionWrapper } from "@/components/section-wrapper"
import { SectionHeader } from "@/components/section-header"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Abdullah (SoburrX) is consistent, fast to learn, and reliable when it comes to shipping features. He communicates clearly and takes feedback seriously.",
    name: "Collaborator Feedback",
    role: "Teammate",
  },
  {
    quote:
      "He handles both frontend and backend tasks with a practical mindset. You can trust him to push work across the finish line.",
    name: "Project Review",
    role: "Project Stakeholder",
  },
  {
    quote:
      "SoburrX keeps improving every release. His code quality, delivery speed, and confidence as a junior full-stack engineer are all trending up.",
    name: "Mentor Note",
    role: "Engineering Mentor",
  },
]

export function Testimonials() {
  return (
    <SectionWrapper id="testimonials">
      <div className="flex flex-col gap-12">
        <SectionHeader
          label="Testimonials"
          heading="What people say."
        />

        {/* Testimonial grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <figure
              key={index}
              className="flex flex-col gap-4 p-6 rounded-xl border border-border bg-card hover:border-accent/30 transition-colors"
            >
              <Quote className="h-5 w-5 text-accent/40" aria-hidden="true" />
              <blockquote className="text-sm text-muted-foreground leading-relaxed flex-1">
                {`"${testimonial.quote}"`}
              </blockquote>
              <figcaption className="pt-4 border-t border-border">
                <span className="text-sm font-semibold text-foreground block">
                  {testimonial.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {testimonial.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
