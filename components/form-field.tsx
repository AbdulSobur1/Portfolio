import type { ReactNode } from "react"

interface FormFieldProps {
  label: string
  htmlFor: string
  error?: string
  required?: boolean
  children: ReactNode
}

export function FormField({
  label,
  htmlFor,
  error,
  required,
  children,
}: FormFieldProps) {
  const errorId = `${htmlFor}-error`

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="text-destructive ml-0.5" aria-hidden="true">*</span>}
        {required && <span className="sr-only">(required)</span>}
      </label>
      {children}
      {error && (
        <span
          id={errorId}
          role="alert"
          className="text-xs text-destructive"
        >
          {error}
        </span>
      )}
    </div>
  )
}
