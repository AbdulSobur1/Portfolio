"use client"

import { Code2, Server, Rocket } from "lucide-react"
import { SectionWrapper } from "@/components/section-wrapper"
import { HoverButton } from "@/components/ui/hover-button"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const services = [
  {
    icon: Code2,
    title: "Frontend Engineering",
    description:
      "Responsive, accessible interfaces with React, Next.js, TypeScript, and Tailwind.",
    features: [
      "Design-to-code implementation",
      "Component architecture",
      "Performance tuning",
    ],
  },
  {
    icon: Server,
    title: "Backend & APIs",
    description:
      "Production-ready APIs with Node.js or Python using REST, GraphQL, and WebSockets.",
    features: [
      "Auth and permissions",
      "API design",
      "Realtime features",
    ],
  },
  {
    icon: Rocket,
    title: "Full-stack MVP Delivery",
    description:
      "End-to-end product builds from idea to deployment with clean architecture and iteration loops.",
    features: [
      "Schema and database design",
      "Deploy-ready app",
      "Post-launch improvements",
    ],
  },
]

export function Services() {
  const revealRef = useScrollReveal()

  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }

  return (
    <SectionWrapper id="services">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="text-xs font-mono font-medium text-emerald-300 tracking-widest uppercase">
            SERVICES
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white text-balance">
            What I can help you build.
          </h2>
          <p className="text-slate-400 leading-relaxed mt-2">
            Focused service packages for product teams, founders, and clients.
          </p>
        </div>

        <div ref={revealRef} className="grid md:grid-cols-3 gap-4 md:gap-6">
          {services.map((service) => (
            <article
              key={service.title}
              data-reveal
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
              style={{ transition: 'transform 0.15s ease-out', willChange: 'transform' }}
              className="rounded-xl border border-[#1e2530] bg-[#12161a] p-6 flex flex-col gap-4 hover:border-emerald-300/20 transition-all duration-300 group"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-300/10 group-hover:bg-emerald-300/20 transition-colors">
                <service.icon className="h-6 w-6 text-emerald-300" />
              </div>
              <h3 className="text-lg font-bold text-white">{service.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {service.description}
              </p>
              <ul className="flex flex-col gap-2 text-sm text-slate-400">
                {service.features.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-emerald-300">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-2">
                <HoverButton href="#contact" className="w-full text-sm">Let&apos;s Talk</HoverButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
