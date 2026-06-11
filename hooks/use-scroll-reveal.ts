'use client'
import { useEffect, useRef } from 'react'

export function useScrollReveal(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = el.querySelectorAll<HTMLElement>('[data-reveal]')
    children.forEach((child, i) => {
      child.style.opacity = '0'
      child.style.transform = 'translateY(20px)'
      child.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`
    })

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        children.forEach(child => {
          child.style.opacity = '1'
          child.style.transform = 'translateY(0)'
        })
        observer.disconnect()
      }
    }, { threshold: 0.1, ...options })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
