"use client"

import { ArrowRight, ArrowDown, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { HIRE_ME_URL, SCHEDULING_URL } from "@/lib/constants"

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return prefersReducedMotion
}

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-6 lg:px-8">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />

      {/* Floating accent glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-6xl w-full">
        <div
          className={`flex flex-col gap-8 ${
            prefersReducedMotion
              ? ""
              : `transition-all duration-1000 ease-out ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`
          }`}
        >
          {/* Status badge */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              Available for new opportunities
            </span>
          </div>

          {/* Main headline */}
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-balance leading-[1.1]">
              <span className="text-foreground">I'm SoburrX, I build products that</span>
              <br />
              <span className="text-accent">ship and scale.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Junior Full Stack Engineer with 3 years of experience building
              modern web products. I focus on clean frontend UX, reliable backend
              APIs, and practical full-stack delivery.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 text-base"
              asChild
            >
              <a href="#contact">
                Work With Me
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base"
              asChild
            >
              <a href="#projects">View Projects</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base"
              asChild
            >
              <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                Book Intro Call
                <Calendar className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <a href={HIRE_ME_URL} className="text-accent hover:underline">
              Download Hire-Me One Pager
            </a>
          </div>

          {/* Quick stats */}
          <dl className="flex flex-wrap gap-8 pt-8 border-t border-border">
            {[
              { label: "Years Experience", value: "3" },
              { label: "Projects Shipped", value: "8" },
              { label: "Role", value: "Junior" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dd className="text-2xl md:text-3xl font-semibold text-foreground">
                  {stat.value}
                </dd>
                <dt className="text-sm text-muted-foreground">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Scroll to about section"
      >
        <span className="text-xs font-medium tracking-widest uppercase">
          Scroll
        </span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  )
}
