import { SOCIAL_LINKS } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="border-t border-[#1e2530] bg-[#0d0f11]">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-white tracking-tight">
              Abdullah Oladimeji Abdulsobur
            </span>
            <span className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()}
            </span>
          </div>

          <nav aria-label="Social media" className="flex items-center gap-2">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-500 hover:text-emerald-300 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </nav>
          <span className="text-xs text-slate-500">
            Built with Next.js & 21st.dev components
          </span>
        </div>
      </div>
    </footer>
  )
}
