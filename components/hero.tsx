"use client"

import { useState, useEffect, useRef } from "react"
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
  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const sublineRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  // EFFECT 1 — Mouse parallax on hero text layers
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return

    const section = document.getElementById('hero')
    if (!section) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2

      if (badgeRef.current) {
        badgeRef.current.style.transform = `translate(${x * 4}px, ${y * 4}px)`
      }
      if (headlineRef.current) {
        headlineRef.current.style.transform = `translate(${x * 8}px, ${y * 8}px)`
      }
      if (sublineRef.current) {
        sublineRef.current.style.transform = `translate(${x * 5}px, ${y * 5}px)`
      }
      if (statsRef.current) {
        statsRef.current.style.transform = `translate(${x * 6}px, ${y * 6}px)`
      }
      if (ctaRef.current) {
        ctaRef.current.style.transform = `translate(${x * 3}px, ${y * 3}px)`
      }
    }

    const handleMouseLeave = () => {
      ;[badgeRef, headlineRef, sublineRef, statsRef, ctaRef].forEach(ref => {
        if (ref.current) {
          ref.current.style.transform = 'translate(0px, 0px)'
        }
      })
    }

    section.addEventListener('mousemove', handleMouseMove)
    section.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      section.removeEventListener('mousemove', handleMouseMove)
      section.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

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
            <div
              ref={badgeRef}
              className="flex items-center gap-2"
              style={{ transition: 'transform 0.15s ease-out', willChange: 'transform' }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300" />
              </span>
              <span className="text-sm font-medium text-emerald-300/80">
                Available for opportunities
              </span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="text-5xl md:text-7xl font-black text-white leading-none"
              style={{ transition: 'transform 0.15s ease-out', willChange: 'transform' }}
            >
              I&apos;m SoburrX,<br />
              I build products that<br />
              <span className="text-emerald-300 glow-text">ship and scale.</span>
            </h1>

            {/* Subheading */}
            <p
              ref={sublineRef}
              className="text-slate-400 text-lg max-w-md leading-relaxed"
              style={{ transition: 'transform 0.15s ease-out', willChange: 'transform' }}
            >
              Junior Full Stack Engineer with 3 years of experience.
              React, Next.js, TypeScript &mdash; from idea to deployed product.
            </p>

            {/* Stats row */}
            <div
              ref={statsRef}
              className="flex gap-8"
              style={{ transition: 'transform 0.15s ease-out', willChange: 'transform' }}
            >
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
            <div
              ref={ctaRef}
              className="flex gap-4 flex-wrap"
              style={{ transition: 'transform 0.15s ease-out', willChange: 'transform' }}
            >
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
