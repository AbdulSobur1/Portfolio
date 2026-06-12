'use client'
import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const container = ref.current
    if (!container) return
    const items = Array.from(container.querySelectorAll<HTMLElement>('[data-reveal]'))
    items.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(24px)'
      el.style.transition = `opacity 0.55s ease ${i * 0.12}s, transform 0.55s ease ${i * 0.12}s`
    })
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      items.forEach(el => {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      })
      observer.disconnect()
    }, { threshold: 0.1 })
    observer.observe(container)
    return () => observer.disconnect()
  }, [])
  return ref
}
