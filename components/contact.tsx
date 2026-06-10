"use client"

import { useState } from "react"
import { Calendar, Send, Github, Linkedin, Twitter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SectionWrapper } from "@/components/section-wrapper"
import { FormField } from "@/components/form-field"
import { HoverButton } from "@/components/ui/hover-button"
import { CONTACT_EMAIL, SCHEDULING_URL } from "@/lib/constants"

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/AbdulSobur1" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/sobur1/" },
  { icon: Twitter, label: "X / Twitter", href: "https://x.com/soburr0" },
]

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
        {/* Left column */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-medium text-emerald-300 tracking-widest uppercase">
              CONTACT
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white text-balance">
              Let&apos;s build something great.
            </h2>
            <p className="text-slate-400 leading-relaxed mt-2">
              Whether you have a project in mind, need a technical co-founder, or just want to chat about engineering — I&apos;d love to hear from you.
            </p>
          </div>

          <HoverButton href={SCHEDULING_URL} className="w-fit">
            Book Intro Call
            <Calendar className="ml-2 h-4 w-4" />
          </HoverButton>

          {/* Social links */}
          <nav aria-label="Social media links" className="flex flex-col gap-3 pt-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-lg border border-[#1e2530] bg-[#12161a] group-hover:border-emerald-300/30 group-hover:bg-emerald-300/5 transition-all">
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <span className="text-sm font-medium">{social.label}</span>
              </a>
            ))}
          </nav>
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
              className="flex flex-col gap-5 p-6 md:p-8 rounded-xl border border-[#1e2530] bg-[#12161a]"
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
                  className="bg-white/5 border-white/10 focus:border-emerald-300/50 text-white placeholder:text-slate-500"
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
                  className="bg-white/5 border-white/10 focus:border-emerald-300/50 text-white placeholder:text-slate-500"
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
                  className="bg-white/5 border-white/10 focus:border-emerald-300/50 text-white placeholder:text-slate-500 resize-none"
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

              <HoverButton type="submit" className="w-full" disabled={isSubmitting}>
                <Send className="h-4 w-4" aria-hidden="true" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </HoverButton>
            </form>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
