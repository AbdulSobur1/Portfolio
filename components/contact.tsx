"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SectionWrapper } from "@/components/section-wrapper"
import { SectionHeader } from "@/components/section-header"
import { FormField } from "@/components/form-field"
import { SOCIAL_LINKS } from "@/lib/constants"

export function Contact() {
  const CONTACT_EMAIL = "abdullahabdulsobur@gmail.com"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

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
        headers: {
          "Content-Type": "application/json",
        },
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
          <SectionHeader
            label="Contact"
            heading="Let's build something great."
            description="Whether you have a project in mind, need a technical co-founder, or just want to chat about engineering — I'd love to hear from you."
          />

          {/* Social links */}
          <nav aria-label="Social media links" className="flex flex-col gap-3 pt-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-lg border border-border group-hover:border-accent/30 group-hover:bg-accent/5 transition-all">
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
              className="flex flex-col items-center justify-center gap-4 p-8 rounded-xl border border-border bg-card text-center h-full"
            >
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Send className="h-5 w-5 text-accent" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-foreground">
                  Message sent!
                </h3>
                <p className="text-sm text-muted-foreground">
                  {"Thanks for reaching out. I'll get back to you within 24 hours."}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitted(false)
                  setFormData({ name: "", email: "", message: "" })
                }}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 p-6 md:p-8 rounded-xl border border-border bg-card"
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
                  className={
                    errors.name
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
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
                  className={
                    errors.email
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
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
                  className={`resize-none ${
                    errors.message
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                />
              </FormField>

              {submitError ? (
                <div role="alert" className="text-sm text-destructive flex flex-col gap-2">
                  <p>{submitError}</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-accent hover:underline"
                  >
                    Or email me directly at {CONTACT_EMAIL}
                  </a>
                </div>
              ) : null}

              <Button
                type="submit"
                className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                disabled={isSubmitting}
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
