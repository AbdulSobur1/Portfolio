"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-50% 0px -50% 0px" }
    )

    navLinks.forEach((link) => {
      const section = document.querySelector(link.href)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileOpen])

  // Ensure stale mobile menu state doesn't linger when resizing to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false)
      }
    }

    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // Focus trap for mobile menu
  const handleMobileKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isMobileOpen) return

      if (e.key === "Escape") {
        setIsMobileOpen(false)
        menuButtonRef.current?.focus()
        return
      }

      if (e.key === "Tab") {
        const focusableElements = mobileMenuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        )
        if (!focusableElements || focusableElements.length === 0) return

        const first = focusableElements[0]
        const last = focusableElements[focusableElements.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    },
    [isMobileOpen]
  )

  // Focus first link when mobile menu opens
  useEffect(() => {
    if (isMobileOpen) {
      const firstLink = mobileMenuRef.current?.querySelector<HTMLElement>("a[href]")
      firstLink?.focus()
    }
  }, [isMobileOpen])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-6xl flex items-center justify-between px-4 md:px-6 lg:px-8 h-16"
      >
        <a
          href="#main-content"
          className="text-lg font-semibold tracking-tight text-foreground"
          aria-label="SoburrX - Home"
        >
          {"SX"}
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {link.label}
              </a>
            )
          })}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Button
            ref={menuButtonRef}
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav-menu"
            aria-haspopup="dialog"
          >
            {isMobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-nav-menu"
        ref={mobileMenuRef}
        role="dialog"
        aria-label="Navigation menu"
        aria-modal={isMobileOpen ? "true" : undefined}
        onKeyDown={handleMobileKeyDown}
        className={cn(
          "md:hidden fixed inset-x-0 top-16 bottom-0 transition-opacity duration-300 z-50 isolate",
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!isMobileOpen}
      >
        <div
          role="presentation"
          className="absolute inset-0 bg-background/85 backdrop-blur-sm z-0 pointer-events-auto"
          onClick={() => {
            setIsMobileOpen(false)
            menuButtonRef.current?.focus()
          }}
        />

        <div
          className={cn(
            "relative z-20 h-full px-4 pt-4 pb-6 transition-transform transition-opacity duration-300 pointer-events-auto",
            isMobileOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          )}
        >
          <div className="h-full overflow-y-auto rounded-2xl border border-border bg-card shadow-xl">
            <div className="flex flex-col gap-1 p-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                      isActive
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
