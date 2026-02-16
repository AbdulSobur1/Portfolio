import Link from "next/link"
import { WRITING_POSTS } from "@/lib/content"

export default function WritingPage() {
  return (
    <main className="min-h-screen px-4 md:px-6 lg:px-8 py-24">
      <section className="mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-semibold text-foreground">Writing</h1>
        <p className="text-muted-foreground mt-2">
          Notes on product engineering, architecture decisions, and shipping lessons.
        </p>
        <div className="mt-8 grid gap-4">
          {WRITING_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="rounded-xl border border-border bg-card p-5 hover:border-accent/30 transition-colors"
            >
              <h2 className="text-lg font-semibold text-foreground">{post.title}</h2>
              <p className="text-sm text-muted-foreground mt-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

