import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionWrapper } from "@/components/section-wrapper"
import { SectionHeader } from "@/components/section-header"
import { HIRE_ME_URL, RESUME_URL } from "@/lib/constants"

export function About() {
  return (
    <SectionWrapper id="about">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          <SectionHeader
            label="About"
            heading="Junior full-stack engineer focused on shipping."
          />
          <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
            <p>
              {
                "I'm Abdullah Oladimeji Abdulsobur, also known as SoburrX. I'm a junior full-stack engineer with 3 years of hands-on experience building web applications end-to-end."
              }
            </p>
            <p>
              I build with React, Next.js, TypeScript, and Tailwind on the
              frontend, then Node.js and Python on the backend with GraphQL,
              REST APIs, and WebSockets where needed.
            </p>
            <p>
              {
                "I've shipped 8 projects so far, and I'm continuously improving my architecture, debugging, and product delivery skills while building real-world systems."
              }
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2" asChild>
              <a href={RESUME_URL} download>
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <a href={HIRE_ME_URL} download>
                <Download className="h-4 w-4" />
                Download Hire-Me PDF
              </a>
            </Button>
          </div>
        </div>

        {/* Right column - Philosophy cards */}
        <div className="flex flex-col gap-4">
          {[
            {
              title: "Ship Fast, Ship Right",
              description:
                "I focus on delivering useful features quickly while keeping the code clean and maintainable.",
            },
            {
              title: "Product-First Engineering",
              description:
                "I prioritize user needs first, then choose practical technical solutions that match the goal.",
            },
            {
              title: "Systems Thinking",
              description:
                "I design full-stack systems with clear structure, from component hierarchy to database modeling.",
            },
            {
              title: "Continuous Learning",
              description:
                "As a junior engineer, I learn by building, shipping, and refining every project.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group p-5 rounded-lg border border-border bg-card hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
            >
              <h3 className="text-base font-semibold text-foreground mb-1.5">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
