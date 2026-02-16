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
