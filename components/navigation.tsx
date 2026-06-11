'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Command } from 'lucide-react'
import { cn } from '@/lib/utils'

const LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Services',   href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

export function Navigation() {
  const [scrolled, setScrolled]   = useState(false)
  const [open, setOpen]           = useState(false)
  const [active, setActive]       = useState('')

  // scroll detection
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // active section tracking
  useEffect(() => {
    const obs: IntersectionObserver[] = []
    LINKS.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (!el) return
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(href) },
        { rootMargin: '-50% 0px -50% 0px' }
      )
      o.observe(el)
      obs.push(o)
    })
    return () => obs.forEach(o => o.disconnect())
  }, [])

  const go = (href: string) => {
    setOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 160)
  }

  return (
    <>
      {/* ── Header bar ───────────────────────────────────── */}
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-black/70 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      )}>
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 md:px-8 h-16">

          {/* Logo */}
          <a href="#main-content" className="text-xl font-black text-emerald-300">SX</a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            <div className="flex items-center gap-1.5 mr-3 px-2.5 py-1 rounded-full border border-emerald-300/20 bg-emerald-300/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300" />
              </span>
              <span className="text-[11px] font-medium text-emerald-300">Available</span>
            </div>

            {LINKS.map(({ label, href }) => (
              <a key={href} href={href}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  active === href
                    ? 'text-white bg-white/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                )}>
                {label}
              </a>
            ))}

            <button
              onClick={() => window.dispatchEvent(new CustomEvent('toggle-command-palette'))}
              className="ml-2 flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-500 border border-white/10 rounded-md hover:text-slate-300 hover:border-white/20 transition-colors"
              aria-label="Command palette">
              <Command className="h-3.5 w-3.5" /><span>K</span>
            </button>
          </div>

          {/* Mobile controls — hamburger only */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('toggle-command-palette'))}
              className="flex items-center justify-center h-9 w-9 text-slate-400 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Command palette">
              <Command className="h-4 w-4" />
            </button>
            <button
              onClick={() => setOpen(v => !v)}
              className="flex items-center justify-center h-9 w-9 text-white rounded-md hover:bg-white/10 transition-colors"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* ── Mobile drawer ────────────────────────────────── */}
      <div className={cn(
        'fixed inset-0 z-40 md:hidden',
        open ? 'pointer-events-auto' : 'pointer-events-none'
      )}>
        {/* backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={cn(
            'absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300',
            open ? 'opacity-100' : 'opacity-0'
          )}
        />

        {/* panel */}
        <div className={cn(
          'absolute top-0 right-0 h-full w-[280px] bg-[#0d0f11] border-l border-white/10',
          'flex flex-col transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : 'translate-x-full'
        )}>
          {/* panel header */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-white/5 shrink-0">
            <span className="text-lg font-black text-emerald-300">SX</span>
            <button onClick={() => setOpen(false)}
              className="h-8 w-8 flex items-center justify-center text-slate-400 hover:text-white rounded-md hover:bg-white/10 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* panel body */}
          <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-300/20 bg-emerald-300/5 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300" />
              </span>
              <span className="text-xs font-medium text-emerald-300">Available for opportunities</span>
            </div>

            <nav className="flex flex-col gap-1">
              {LINKS.map(({ label, href }) => (
                <button key={href} onClick={() => go(href)}
                  className={cn(
                    'text-left w-full px-4 py-3.5 rounded-xl text-base font-medium transition-colors',
                    active === href
                      ? 'text-white bg-white/10 border border-white/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  )}>
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="px-4 py-4 border-t border-white/5 shrink-0">
            <p className="text-xs text-slate-600 text-center">SoburrX · Junior Full Stack Engineer</p>
          </div>
        </div>
      </div>
    </>
  )
}
