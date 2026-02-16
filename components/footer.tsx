import { SOCIAL_LINKS } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-foreground tracking-tight">
              Abdullah Oladimeji Abdulsobur (SoburrX)
            </span>
            <span className="text-sm text-muted-foreground">
              {`\u00A9 ${new Date().getFullYear()}`}
            </span>
          </div>

          <nav aria-label="Social media" className="flex items-center gap-1">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
