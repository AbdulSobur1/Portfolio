"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

interface Testimonial {
  quote: string
  name: string
  designation: string
  src?: string
}

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[]
  autoPlayInterval?: number
  className?: string
}

export function AnimatedTestimonials({
  testimonials,
  autoPlayInterval = 5000,
  className,
}: AnimatedTestimonialsProps) {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return
    const interval = setInterval(next, autoPlayInterval)
    return () => clearInterval(interval)
  }, [next, autoPlayInterval, isPaused, testimonials.length])

  return (
    <div
      className={cn("relative mx-auto max-w-4xl", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-white/10 bg-[#12161a] p-8 md:p-12">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={cn(
              "transition-all duration-500 ease-out",
              index === active
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
            )}
          >
            <Quote className="mb-6 h-8 w-8 text-emerald-300/30" />
            <blockquote className="mb-6 text-lg leading-relaxed text-slate-300">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-4">
              {testimonial.src && (
                <div className="h-12 w-12 overflow-hidden rounded-full border border-white/10">
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-slate-400">{testimonial.designation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === active
                ? "w-8 bg-emerald-300"
                : "w-2 bg-white/20 hover:bg-white/40"
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-emerald-300/30 hover:text-emerald-300"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-emerald-300/30 hover:text-emerald-300"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
