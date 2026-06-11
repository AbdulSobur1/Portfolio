"use client"

import { useState, useEffect, useCallback } from "react"
import { Menu, X, Command } from "lucide-react"
import { cn } from "@/lib/utils"

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

  // Lock body scroll when mobile drawer is open
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
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
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false)
      }
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const closeDrawer = useCallback(() => {
    setIsMobileOpen(false)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-black/40 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-6xl flex items-center justify-between px-4 md:px-6 lg:px-8 h-16"
      >
        <a
          href="#main-content"
          className="text-xl font-black text-emerald-300 tracking-tight"
          aria-label="SoburrX - Home"
        >
          SX
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {/* Availability badge */}
          <div className="flex items-center gap-1.5 mr-3 px-2.5 py-1 rounded-full border border-emerald-300/20 bg-emerald-300/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300" />
            </span>
            <span className="text-[11px] font-medium text-emerald-300 whitespace-nowrap">
              Available for opportunities
            </span>
          </div>

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
                    ? "text-white bg-white/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </a>
            )
          })}

          {/* Cmd+K button */}
          <button
            className="ml-2 flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-500 border border-white/10 rounded-md hover:text-slate-300 hover:border-white/20 transition-colors"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("toggle-command-palette"))
            }}
          >
            <Command className="h-3.5 w-3.5" />
            <span>K</span>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Cmd+K button mobile */}
          <button
            className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-slate-500 border border-white/10 rounded-md"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("toggle-command-palette"))
            }}
          >
            <Command className="h-3.5 w-3.5" />
            <span>K</span>
          </button>

          {/* Hamburger button */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center text-white"
            aria-label="Open navigation menu"
            aria-expanded={false}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 md:hidden",
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Mobile drawer panel */}
      <div
        className={cn(
          "fixed top-0 right-0 z-40 h-full w-[280px] bg-[#0d0f11] border-l border-white/10 transition-transform duration-300 ease-out md:hidden",
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-label="Mobile navigation menu"
        role="dialog"
        aria-modal={isMobileOpen}
      >
        <div className="flex flex-col h-full p-6">
          {/* Close button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={closeDrawer}
              className="flex h-9 w-9 items-center justify-center text-slate-400 hover:text-white transition-colors"
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Availability badge */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-emerald-300/20 bg-emerald-300/5 w-fit mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300" />
            </span>
            <span className="text-xs font-medium text-emerald-300">
              Available for opportunities
            </span>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeDrawer}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "px-4 py-3.5 text-base font-medium rounded-lg transition-colors",
                    isActive
                      ? "text-white bg-white/10"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </header>
  )
}
