interface SectionHeaderProps {
  label: string
  heading: string
  description?: string
}

export function SectionHeader({ label, heading, description }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-2 max-w-2xl">
      <span className="text-sm font-mono font-medium text-accent tracking-wider uppercase">
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground text-balance">
        {heading}
      </h2>
      {description && (
        <p className="text-muted-foreground leading-relaxed mt-2">
          {description}
        </p>
      )}
    </div>
  )
}
