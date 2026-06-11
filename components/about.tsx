"use client"

import { Download, Ship, Code2, Brain, GraduationCap } from "lucide-react"
import { DotPattern } from "@/components/ui/dot-pattern"
import { SectionWrapper } from "@/components/section-wrapper"
import { HIRE_ME_URL, RESUME_URL } from "@/lib/constants"

const philosophyCards = [
  {
    icon: Ship,
    title: "Ship Fast, Ship Right",
    description: "I focus on delivering useful features quickly while keeping the code clean and maintainable.",
  },
  {
    icon: Code2,
    title: "Product-First Engineering",
    description: "I prioritize user needs first, then choose practical technical solutions that match the goal.",
  },
  {
    icon: Brain,
    title: "Systems Thinking",
    description: "I design full-stack systems with clear structure, from component hierarchy to database modeling.",
  },
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    description: "As a junior engineer, I learn by building, shipping, and refining every project.",
  },
]

export function About() {
  return (
    <SectionWrapper id="about">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          <span className="text-xs font-mono font-medium text-emerald-300 tracking-widest uppercase">
            ABOUT
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white text-balance">
            Junior full-stack engineer focused on shipping.
          </h2>
          <div className="flex flex-col gap-4 text-slate-400 leading-relaxed">
            <p>
              I&apos;m Abdullah Oladimeji Abdulsobur, also known as SoburrX. I&apos;m a junior full-stack engineer with 3 years of hands-on experience building web applications end-to-end.
            </p>
            <p>
              I build with React, Next.js, TypeScript, and Tailwind on the frontend, then Node.js and Python on the backend with GraphQL, REST APIs, and WebSockets where needed.
            </p>
            <p>
              I&apos;ve shipped 8 projects so far, and I&apos;m continuously improving my architecture, debugging, and product delivery skills while building real-world systems.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={RESUME_URL} download
              className="bg-emerald-300 text-black hover:bg-emerald-200 font-semibold px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 transition-colors">
              <Download className="h-4 w-4" />
              Download Resume
            </a>
            <a href={HIRE_ME_URL} download
              className="border border-white/20 text-slate-300 hover:border-emerald-300/40 hover:text-white font-medium px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 transition-colors">
              <Download className="h-4 w-4" />
              Download Hire-Me PDF
            </a>
          </div>
        </div>

        {/* Right column - Philosophy cards */}
        <div className="relative">
          <DotPattern dotColor="#6ee7b7" dotOpacity={0.08} />
          <div className="relative grid grid-cols-2 gap-3">
            {philosophyCards.map((item) => (
              <div
                key={item.title}
                className="group p-4 rounded-lg border border-[#1e2530] bg-[#12161a] hover:border-emerald-300/30 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-300/10">
                  <item.icon className="h-5 w-5 text-emerald-300" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
