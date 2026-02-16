"use client"

import { useEffect } from "react"

export function ErrorMonitor() {
  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      void fetch("/api/client-errors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: event.message,
          source: event.filename,
          line: event.lineno,
          col: event.colno,
        }),
      })
    }

    const onUnhandled = (event: PromiseRejectionEvent) => {
      void fetch("/api/client-errors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: String(event.reason),
          source: "unhandledrejection",
        }),
      })
    }

    window.addEventListener("error", onError)
    window.addEventListener("unhandledrejection", onUnhandled)

    return () => {
      window.removeEventListener("error", onError)
      window.removeEventListener("unhandledrejection", onUnhandled)
    }
  }, [])

  return null
}

