"use client"

import { useEffect, useMemo, useState } from "react"
import { Command } from "cmdk"

const ITEMS = [
  { label: "Home", href: "#main-content" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub Activity", href: "#github-activity" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Currently Building", href: "#currently-building" },
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

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const groupedItems = useMemo(() => ITEMS, [])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[120] bg-background/80 backdrop-blur-sm p-4 md:p-6">
      <div className="mx-auto max-w-xl rounded-xl border border-border bg-card shadow-xl overflow-hidden">
        <Command className="w-full">
          <div className="border-b border-border">
            <Command.Input
              placeholder="Type a section name..."
              className="w-full bg-transparent px-4 py-3 text-sm outline-none"
            />
          </div>
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="px-2 py-3 text-sm text-muted-foreground">
              No results found.
            </Command.Empty>
            <Command.Group heading="Navigate" className="text-xs text-muted-foreground">
              {groupedItems.map((item) => (
                <Command.Item
                  key={item.href}
                  value={item.label}
                  onSelect={() => {
                    window.location.hash = item.href.replace("#", "")
                    setOpen(false)
                  }}
                  className="rounded-md px-3 py-2 text-sm text-foreground cursor-pointer aria-selected:bg-muted"
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
