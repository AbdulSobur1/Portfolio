"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"

const testimonials = [
  {
    quote:
      "Abdullah (SoburrX) is consistent, fast to learn, and reliable when it comes to shipping features. He communicates clearly and takes feedback seriously.",
    name: "Project Collaborator",
    designation: "Teammate — Project Collaboration Reference",
    src: "https://api.dicebear.com/7.x/initials/svg?seed=PC&backgroundColor=6ee7b7&textColor=0d0f11",
  },
  {
    quote:
      "He handles both frontend and backend tasks with a practical mindset. You can trust him to push work across the finish line.",
    name: "Project Stakeholder",
    designation: "Private Stakeholder Feedback",
    src: "https://api.dicebear.com/7.x/initials/svg?seed=PS&backgroundColor=818cf8&textColor=0d0f11",
  },
  {
    quote:
      "SoburrX keeps improving every release. His code quality, delivery speed, and confidence as a junior full-stack engineer are all trending up.",
    name: "Engineering Mentor",
    designation: "Mentorship Review",
    src: "https://api.dicebear.com/7.x/initials/svg?seed=EM&backgroundColor=6ee7b7&textColor=0d0f11",
  },
]

export function Testimonials() {
  return (
    <SectionWrapper id="testimonials">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="text-xs font-mono font-medium text-emerald-300 tracking-widest uppercase">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white text-balance">
            What people say.
          </h2>
        </div>

        <AnimatedTestimonials testimonials={testimonials} autoPlayInterval={5000} />
      </div>
    </SectionWrapper>
  )
}
