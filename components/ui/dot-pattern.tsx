import { cn } from "@/lib/utils"

interface DotPatternProps {
  className?: string
  dotSize?: number
  dotSpacing?: number
  dotColor?: string
  dotOpacity?: number
}

export function DotPattern({
  className,
  dotSize = 1,
  dotSpacing = 24,
  dotColor = "#6ee7b7",
  dotOpacity = 0.15,
}: DotPatternProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
          opacity: dotOpacity,
        }}
      />
    </div>
  )
}
