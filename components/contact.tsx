"use client"

import { useState } from "react"
import { Calendar, Send, Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SectionWrapper } from "@/components/section-wrapper"
import { FormField } from "@/components/form-field"
import { CONTACT_EMAIL, SCHEDULING_URL } from "@/lib/constants"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [referenceId, setReferenceId] = useState<string | null>(null)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.message.trim()) newErrors.message = "Message is required"
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setSubmitError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(
          typeof result?.message === "string"
            ? result.message
            : "Failed to submit form"
        )
      }

      if (!(result.success === true || result.success === "true")) {
        throw new Error(
          typeof result?.message === "string"
            ? result.message
            : "Submission service returned an error"
        )
      }

      setSubmitted(true)
      setReferenceId(typeof result.referenceId === "string" ? result.referenceId : null)
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Could not send message right now. Please try again shortly."
      setSubmitError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SectionWrapper id="contact">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
        {/* Left column — full redesign */}
        <div className="flex flex-col gap-8">

          {/* Header */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono font-medium text-emerald-300 tracking-widest uppercase">
              CONTACT
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Let&apos;s build something great.
            </h2>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm">
              Whether you have a project in mind, need a junior full-stack engineer,
              or just want to talk tech — I&apos;m always open.
            </p>
          </div>

          {/* Availability card */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-emerald-300/20 bg-emerald-300/5 w-fit">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300" />
            </span>
            <div>
              <p className="text-sm font-semibold text-emerald-300">Available for opportunities</p>
              <p className="text-xs text-slate-500">Open to freelance and full-time roles</p>
            </div>
          </div>

          {/* Book call button — make it pop */}
          <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer"
            className="group flex items-center gap-3 w-fit px-5 py-3.5 rounded-xl bg-emerald-300 hover:bg-emerald-200 transition-colors">
            <Calendar className="h-5 w-5 text-black" />
            <div>
              <p className="text-sm font-bold text-black leading-none">Book Intro Call</p>
              <p className="text-xs text-black/60 mt-0.5">Free 30 min — cal.com/soburrx</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-black ml-auto opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          {/* Divider */}
          <div className="w-12 h-px bg-white/10" />

          {/* Social links — bolder, more presence */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-mono text-slate-600 uppercase tracking-widest mb-1">Find me on</p>
            {[
              { icon: Github, label: 'GitHub', sub: 'AbdulSobur1', href: 'https://github.com/AbdulSobur1' },
              { icon: Linkedin, label: 'LinkedIn', sub: 'sobur1', href: 'https://www.linkedin.com/in/sobur1/' },
              { icon: Twitter, label: 'X / Twitter', sub: 'soburr0', href: 'https://x.com/soburr0' },
            ].map(({ icon: Icon, label, sub, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] hover:border-emerald-300/30 hover:bg-emerald-300/5 transition-all">
                <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-white/5 group-hover:bg-emerald-300/10 transition-colors shrink-0">
                  <Icon className="h-4 w-4 text-slate-400 group-hover:text-emerald-300 transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white leading-none">{label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">@{sub}</p>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-emerald-300 ml-auto opacity-0 group-hover:opacity-100 transition-all" />
              </a>
            ))}
          </div>

        </div>

        {/* Right column - Form */}
        <div>
          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="flex flex-col items-center justify-center gap-4 p-8 rounded-xl border border-[#1e2530] bg-[#12161a] text-center h-full"
            >
              <div className="h-12 w-12 rounded-full bg-emerald-300/10 flex items-center justify-center">
                <Send className="h-5 w-5 text-emerald-300" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-white">
                  Message sent!
                </h3>
                <p className="text-sm text-slate-400">
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
                {referenceId ? (
                  <p className="text-xs text-emerald-300 font-mono">Reference ID: {referenceId}</p>
                ) : null}
              </div>
              <button
                onClick={() => {
                  setSubmitted(false)
                  setFormData({ name: "", email: "", message: "" })
                }}
                className="text-sm text-emerald-300 hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
              noValidate
            >
              <FormField label="Name" htmlFor="name" error={errors.name} required>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your name"
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="bg-white/5 border border-white/10 focus:border-emerald-300/50 focus:ring-0 text-white placeholder:text-slate-600 rounded-lg"
                />
              </FormField>

              <FormField label="Email" htmlFor="email" error={errors.email} required>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@company.com"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="bg-white/5 border border-white/10 focus:border-emerald-300/50 focus:ring-0 text-white placeholder:text-slate-600 rounded-lg"
                />
              </FormField>

              <FormField label="Message" htmlFor="message" error={errors.message} required>
                <Textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell me about your project..."
                  required
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="bg-white/5 border border-white/10 focus:border-emerald-300/50 focus:ring-0 text-white placeholder:text-slate-600 rounded-lg resize-none"
                />
              </FormField>

              {submitError ? (
                <div role="alert" className="text-sm text-red-400 flex flex-col gap-2">
                  <p>{submitError}</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-emerald-300 hover:underline"
                  >
                    Or email me directly at {CONTACT_EMAIL}
                  </a>
                </div>
              ) : null}

              <button type="submit" disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-300 hover:bg-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-black text-sm">
                <Send className="h-4 w-4" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
