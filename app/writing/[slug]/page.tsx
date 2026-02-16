import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { WRITING_POSTS } from "@/lib/content"
import { SITE_URL } from "@/lib/constants"

type Params = { slug: string }

export function generateStaticParams() {
  return WRITING_POSTS.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = WRITING_POSTS.find((item) => item.slug === params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | SoburrX`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${SITE_URL}/writing/${post.slug}`,
    },
  }
}

export default function WritingPostPage({ params }: { params: Params }) {
  const post = WRITING_POSTS.find((item) => item.slug === params.slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen px-4 md:px-6 lg:px-8 py-24">
      <article className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-6 md:p-8">
        <Link href="/" className="text-sm text-accent hover:underline">
          ← Back to homepage
        </Link>
        <h1 className="text-3xl md:text-4xl font-semibold text-foreground mt-4">{post.title}</h1>
        <p className="text-sm text-muted-foreground mt-2">
          {post.readTime} • {new Date(post.date).toLocaleDateString("en-US", { dateStyle: "long" })}
        </p>
        <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  )
}

