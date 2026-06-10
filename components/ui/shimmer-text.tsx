import { cn } from "@/lib/utils"
import type { CSSProperties } from "react"

interface ShimmerTextProps {
  children: React.ReactNode
  className?: string
  shimmerWidth?: string
  duration?: string
}

export function ShimmerText({
  children,
  className,
  shimmerWidth = "200%",
  duration = "3s",
}: ShimmerTextProps) {
  return (
    <span
      className={cn("inline-block animate-shimmer bg-clip-text text-transparent", className)}
      style={
        {
          "--shimmer-width": shimmerWidth,
          "--shimmer-duration": duration,
          backgroundImage:
            "linear-gradient(110deg, transparent 30%, rgba(110, 231, 183, 0.4) 50%, transparent 70%)",
          backgroundSize: `${shimmerWidth} 100%`,
          animation: `shimmer ${duration} linear infinite`,
        } as CSSProperties
      }
    >
      {children}
    </span>
  )
}
