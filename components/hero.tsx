"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ArrowDown } from "lucide-react"
import { NumberTicker } from "@/components/ui/number-ticker"
import { Spotlight } from "@/components/ui/spotlight"
import { HoverButton } from "@/components/ui/hover-button"
import { RetroButton } from "@/components/ui/retro-button"
import dynamic from "next/dynamic"

const SplineScene = dynamic(
  () => import("@splinetool/react-spline").then((mod) => ({ default: mod.default })),
  { ssr: false, loading: () => <div className="h-full w-full flex items-center justify-center"><div className="h-8 w-8 animate-pulse rounded-full bg-emerald-300/20" /></div> }
)

const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS",
  "PostgreSQL", "Drizzle", "Python", "GraphQL", "WebSockets",
  "Kotlin", "Jetpack Compose",
]

export function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-black/[0.96]" />
    )
  }

  return (
    <>
      <section
        id="hero"
        className="relative min-h-[90vh] bg-black/[0.96] overflow-hidden"
      >
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#6ee7b7" />

        <div className="flex flex-col md:flex-row h-full min-h-[90vh]">
          {/* LEFT - Content */}
          <div className="flex-1 p-8 md:p-16 relative z-10 flex flex-col justify-center gap-6">
            {/* Availability badge */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300" />
              </span>
              <span className="text-sm font-medium text-emerald-300/80">
                Available for opportunities
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-black text-white leading-none">
              I&apos;m SoburrX,<br />
              I build products that<br />
              <span className="text-emerald-300 glow-text">ship and scale.</span>
            </h1>

            {/* Subheading */}
            <p className="text-slate-400 text-lg max-w-md leading-relaxed">
              Junior Full Stack Engineer with 3 years of experience.
              React, Next.js, TypeScript &mdash; from idea to deployed product.
            </p>

            {/* Stats row */}
            <div className="flex gap-8">
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-black text-white tabular-nums">
                  <NumberTicker value={3} />
                  <span className="text-emerald-300 text-2xl">+</span>
                </span>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                  Years Exp
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-black text-white tabular-nums">
                  <NumberTicker value={8} />
                  <span className="text-emerald-300 text-2xl">+</span>
                </span>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                  Shipped
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-4 flex-wrap">
              <HoverButton href="#contact">
                Work With Me
                <ArrowRight className="ml-2 h-4 w-4" />
              </HoverButton>
              <RetroButton asChild>
                <a href="#projects">View Projects</a>
              </RetroButton>
            </div>
          </div>

          {/* RIGHT - Spline 3D Scene */}
          <div className="flex-1 relative min-h-[400px] md:min-h-full">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#about"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-emerald-300 transition-colors z-10"
          aria-label="Scroll to about section"
        >
          <span className="text-[10px] font-medium tracking-widest uppercase">
            Scroll
          </span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </section>

      {/* Tech Stack Marquee */}
      <div className="w-full bg-[#0a0c0e] border-t border-b border-white/5 py-4 overflow-hidden relative">
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 items-center gap-8 animate-marquee" aria-hidden="true">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="text-sm font-mono text-slate-500 whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-8 animate-marquee" aria-hidden="true">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="text-sm font-mono text-slate-500 whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
