import Link from "next/link"
import { About } from "@/components/about"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <About />
        <section className="px-4 md:px-6 lg:px-8 pb-20">
          <div className="mx-auto max-w-6xl rounded-xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold text-foreground">More about SoburrX</h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              I am focused on becoming an exceptional full-stack engineer through consistent shipping,
              clean architecture, and practical product thinking.
            </p>
            <Link href="/" className="inline-block mt-4 text-sm text-accent hover:underline">
              Back to homepage →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

