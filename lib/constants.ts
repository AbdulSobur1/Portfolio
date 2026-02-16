import { Github, Linkedin, Twitter, type LucideIcon } from "lucide-react"

export interface SocialLink {
  icon: LucideIcon
  label: string
  href: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  { icon: Github, label: "GitHub", href: "https://github.com/AbdulSobur1" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/sobur1/" },
  { icon: Twitter, label: "X / Twitter", href: "https://x.com/soburr0" },
]

export const SITE_URL = "https://abdulsobur1.vercel.app"
export const CONTACT_EMAIL = "abdullahabdulsobur@gmail.com"
export const GITHUB_USERNAME = "AbdulSobur1"
export const SCHEDULING_URL = "https://cal.com/soburrx"
export const RESUME_URL = "/resume.pdf"
export const HIRE_ME_URL = "/hire-me.pdf"
