"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "secondary"
}

const RetroButton = React.forwardRef<HTMLButtonElement, RetroButtonProps>(
  ({ className, asChild = false, variant = "default", children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200",
          "before:absolute before:inset-0 before:-translate-y-full before:transition-transform before:duration-200",
          "hover:before:translate-y-0",
          variant === "default" && [
            "bg-emerald-300/10 text-emerald-300 border border-emerald-300/20",
            "before:bg-emerald-300/10",
            "hover:border-emerald-300/40",
          ],
          variant === "secondary" && [
            "bg-indigo-400/10 text-indigo-400 border border-indigo-400/20",
            "before:bg-indigo-400/10",
            "hover:border-indigo-400/40",
          ],
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Comp>
    )
  }
)
RetroButton.displayName = "RetroButton"

export { RetroButton }
