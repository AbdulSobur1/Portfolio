import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { GITHUB_USERNAME, SITE_URL } from "@/lib/constants"

type Params = { slug: string }

type GithubRepo = {
  name: string
  html_url: string
  description: string | null
  homepage: string | null
  topics?: string[]
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  archived: boolean
}

async function getRepo(slug: string): Promise<GithubRepo | null> {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_USERNAME}/${slug}`,
    { next: { revalidate: 1800 } }
  )
  if (!response.ok) return null
  return (await response.json()) as GithubRepo
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const repo = await getRepo(params.slug)
  if (!repo) return {}
  return {
    title: `${repo.name} Case Study | SoburrX`,
    description: repo.description ?? `Case study for ${repo.name}`,
    openGraph: {
      title: `${repo.name} Case Study`,
      description: repo.description ?? `Case study for ${repo.name}`,
      type: "article",
      url: `${SITE_URL}/projects/${repo.name}`,
    },
  }
}

export default async function ProjectCaseStudyPage({ params }: { params: Params }) {
  const repo = await getRepo(params.slug)
  if (!repo) notFound()

  const status = repo.archived ? "Archived" : repo.homepage ? "Live" : "Code only"
  const screenshotUrl = `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`

  return (
    <main className="min-h-screen px-4 md:px-6 lg:px-8 py-24">
      <article className="mx-auto max-w-4xl rounded-xl border border-border bg-card p-6 md:p-8">
        <Link href="/#projects" className="text-sm text-accent hover:underline">
          ← Back to projects
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-accent px-2 py-1 rounded-full bg-accent/10 border border-accent/30">
            {status}
          </span>
          {repo.language ? (
            <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-muted">{repo.language}</span>
          ) : null}
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold text-foreground mt-4">{repo.name}</h1>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          {repo.description ?? "This project showcases practical full-stack engineering decisions and delivery."}
        </p>

        <div className="mt-6 overflow-hidden rounded-xl border border-border bg-muted/20">
          <img
            src={screenshotUrl}
            alt={`${repo.name} repository preview`}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>

        <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm">
          <div className="rounded-lg border border-border p-3 bg-muted/30">
            <p className="text-muted-foreground">Stars</p>
            <p className="text-foreground font-semibold">{repo.stargazers_count}</p>
          </div>
          <div className="rounded-lg border border-border p-3 bg-muted/30">
            <p className="text-muted-foreground">Forks</p>
            <p className="text-foreground font-semibold">{repo.forks_count}</p>
          </div>
          <div className="rounded-lg border border-border p-3 bg-muted/30">
            <p className="text-muted-foreground">Last Updated</p>
            <p className="text-foreground font-semibold">
              {new Date(repo.updated_at).toLocaleDateString("en-US", { dateStyle: "medium" })}
            </p>
          </div>
        </div>

        <section className="mt-10 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Problem</h2>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              Build a reliable and maintainable project that solves a concrete product need while staying easy to iterate on.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Approach</h2>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              I used practical architecture choices, scoped features to release in increments, and prioritized clear code boundaries across UI, API, and data layers.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Tradeoffs</h2>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              I favored delivery speed and maintainability over unnecessary complexity, then improved performance and DX as the project evolved.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-accent text-accent-foreground px-4 py-2 text-sm font-medium hover:bg-accent/90"
            >
              View Code
            </a>
            {repo.homepage ? (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                Live Demo
              </a>
            ) : null}
          </div>
        </section>
      </article>
    </main>
  )
}
