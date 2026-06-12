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

const TECH = [
  "React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS",
  "PostgreSQL", "Drizzle", "Python", "GraphQL", "WebSockets",
  "Kotlin", "Jetpack Compose",
]

export function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Mouse parallax on hero text layers
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(pointer: coarse)").matches) return

    const section = document.getElementById("hero")
    if (!section) return

    const layers: Array<{ selector: string; factor: number }> = [
      { selector: '[data-parallax="badge"]', factor: 4 },
      { selector: '[data-parallax="headline"]', factor: 9 },
      { selector: '[data-parallax="sub"]', factor: 6 },
      { selector: '[data-parallax="stats"]', factor: 7 },
      { selector: '[data-parallax="cta"]', factor: 3 },
    ]

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      layers.forEach(({ selector, factor }) => {
        const el = section.querySelector<HTMLElement>(selector)
        if (el) el.style.transform = `translate(${x * factor}px, ${y * factor}px)`
      })
    }

    const handleLeave = () => {
      layers.forEach(({ selector }) => {
        const el = section.querySelector<HTMLElement>(selector)
        if (el) el.style.transform = "translate(0px, 0px)"
      })
    }

    section.addEventListener("mousemove", handleMove)
    section.addEventListener("mouseleave", handleLeave)
    return () => {
      section.removeEventListener("mousemove", handleMove)
      section.removeEventListener("mouseleave", handleLeave)
    }
  }, [mounted])

  return (
    <>
      <section id="hero">
        <div className="w-full min-h-screen bg-black/[0.96] relative overflow-hidden rounded-none border-0">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#6ee7b7" />
          <div className="flex flex-col md:flex-row min-h-screen">
            {/* LEFT — always SSR rendered */}
            <div className="flex-1 px-6 py-24 md:px-16 md:py-0 relative z-10 flex flex-col justify-center gap-6">
              {/* availability badge — always rendered */}
              <div
                data-parallax="badge"
                style={{ transition: "transform 0.12s ease-out", willChange: "transform" }}
                className="flex items-center gap-2 w-fit px-3 py-1 rounded-full border border-emerald-300/20 bg-emerald-300/5"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300" />
                </span>
                <span className="text-xs font-medium text-emerald-300">Available for opportunities</span>
              </div>

              {/* headline — always rendered, SSR visible */}
              <h1
                data-parallax="headline"
                style={{ transition: "transform 0.12s ease-out", willChange: "transform" }}
                className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                  I&apos;m SoburrX,<br />I build products<br />that{" "}
                </span>
                <span className="text-emerald-300" style={{ textShadow: "0 0 24px rgba(110,231,183,0.35)" }}>
                  ship and scale.
                </span>
              </h1>

              <p
                data-parallax="sub"
                style={{ transition: "transform 0.12s ease-out", willChange: "transform" }}
                className="text-neutral-400 text-base md:text-lg max-w-md leading-relaxed"
              >
                Junior Full Stack Engineer. React, Next.js, TypeScript — from idea to deployed product.
              </p>

              {/* stats — only NumberTicker needs mounted gate */}
              <div
                data-parallax="stats"
                style={{ transition: "transform 0.12s ease-out", willChange: "transform" }}
                className="flex gap-8"
              >
                <div>
                  <p className="text-3xl font-black text-white tabular-nums">
                    {mounted ? <NumberTicker value={3} /> : "3"}
                    <span className="text-emerald-300">+</span>
                  </p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">Years Exp</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-white tabular-nums">
                    {mounted ? <NumberTicker value={8} /> : "8"}
                    <span className="text-emerald-300">+</span>
                  </p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">Shipped</p>
                </div>
              </div>

              {/* CTAs — always rendered */}
              <div
                data-parallax="cta"
                style={{ transition: "transform 0.12s ease-out", willChange: "transform" }}
                className="flex flex-wrap gap-3 items-center"
              >
                <HoverButton href="#contact">
                  Work With Me <ArrowRight className="ml-2 h-4 w-4 inline-block" />
                </HoverButton>
                <RetroButton asChild>
                  <a href="#projects">View Projects</a>
                </RetroButton>
              </div>
            </div>

            {/* RIGHT — Spline only renders client-side, hidden on mobile */}
            <div className="hidden md:flex flex-1 relative">
              {mounted && (
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              )}
            </div>
          </div>

          <a href="#about" aria-label="Scroll down"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-emerald-300 transition-colors z-10"
          >
            <span className="text-[10px] font-medium tracking-widest uppercase">Scroll</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </div>
      </section>

      {/* Marquee */}
      <div className="w-full overflow-hidden bg-[#0a0c0e] border-t border-b border-white/5 py-3">
        <div className="flex w-max animate-marquee">
          {[...TECH, ...TECH].map((t, i) => (
            <span key={i} className="text-sm font-mono text-slate-500 whitespace-nowrap px-5">{t}</span>
          ))}
        </div>
      </div>
    </>
  )
}
