"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

interface FeatureStep {
  label: string
  content: React.ReactNode
}

interface FeatureSectionProps {
  steps: FeatureStep[]
  className?: string
  autoAdvanceInterval?: number
}

export function FeatureSection({
  steps,
  className,
  autoAdvanceInterval = 3000,
}: FeatureSectionProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setActiveStep((prev) => (prev + 1) % steps.length)
  }, [steps.length])

  useEffect(() => {
    if (isPaused || steps.length <= 1) return
    const interval = setInterval(next, autoAdvanceInterval)
    return () => clearInterval(interval)
  }, [next, autoAdvanceInterval, isPaused, steps.length])

  return (
    <div
      className={cn("flex flex-col gap-8", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Tab labels */}
      <div className="flex gap-2 border-b border-white/10 pb-2">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => setActiveStep(index)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors",
              index === activeStep
                ? "text-emerald-300"
                : "text-slate-500 hover:text-slate-300"
            )}
          >
            {step.label}
            {index === activeStep && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-300" />
            )}
          </button>
        ))}
      </div>

      {/* Active content */}
      <div className="relative min-h-[200px]">
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              "transition-all duration-500 ease-out",
              index === activeStep
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
            )}
          >
            {step.content}
          </div>
        ))}
      </div>
    </div>
  )
}
