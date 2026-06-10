"use client"

import { useEffect, useMemo, useState } from "react"
import { Command } from "cmdk"

const ITEMS = [
  { label: "Home", href: "#main-content" },
  { label: "Hero", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Writing", href: "#blog" },
  { label: "Contact", href: "#contact" },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((value) => !value)
      }
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    const onTogglePalette = () => {
      setOpen((value) => !value)
    }

    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("toggle-command-palette", onTogglePalette)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("toggle-command-palette", onTogglePalette)
    }
  }, [])

  const groupedItems = useMemo(() => ITEMS, [])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm p-4 md:p-6">
      <div className="mx-auto max-w-xl rounded-xl border border-[#1e2530] bg-[#12161a] shadow-xl overflow-hidden">
        <Command className="w-full">
          <div className="border-b border-[#1e2530]">
            <Command.Input
              placeholder="Type a section name..."
              className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="px-2 py-3 text-sm text-slate-500">
              No results found.
            </Command.Empty>
            <Command.Group heading="Navigate" className="text-xs text-slate-500">
              {groupedItems.map((item) => (
                <Command.Item
                  key={item.href}
                  value={item.label}
                  onSelect={() => {
                    window.location.hash = item.href.replace("#", "")
                    setOpen(false)
                  }}
                  className="rounded-md px-3 py-2 text-sm text-white cursor-pointer aria-selected:bg-white/10"
                >
                  {item.label}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  )
}
