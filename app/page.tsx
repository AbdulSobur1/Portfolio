import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { CredibilityStrip } from "@/components/credibility-strip"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { GithubActivity } from "@/components/github-activity"
import { StartupShowcase } from "@/components/startup-showcase"
import { Services } from "@/components/services"
import { Process } from "@/components/process"
import { CurrentlyBuilding } from "@/components/currently-building"
import { Experience } from "@/components/experience"
import { Testimonials } from "@/components/testimonials"
import { Blog } from "@/components/blog"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-accent focus:text-accent-foreground focus:text-sm focus:font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <CredibilityStrip />
        <About />
        <Skills />
        <Projects />
        <GithubActivity />
        <StartupShowcase />
        <Services />
        <Process />
        <CurrentlyBuilding />
        <Experience />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
