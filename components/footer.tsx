import { Github, Linkedin, Twitter } from "lucide-react"

const SOCIALS = [
  { icon: Github,   href: 'https://github.com/AbdulSobur1',           label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/sobur1/',      label: 'LinkedIn' },
  { icon: Twitter,  href: 'https://x.com/soburr0',                    label: 'X / Twitter' },
]

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

          <nav className="flex items-center gap-2">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label}
                className="h-9 w-9 flex items-center justify-center rounded-md text-slate-500 hover:text-emerald-300 border border-white/10 hover:border-emerald-300/30 transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </nav>
          <span className="text-xs text-slate-500">
            Built with Next.js & shadcn/ui
          </span>
        </div>
      </div>
    </footer>
  )
}
