import type { Metadata } from "next"
import Link from "next/link"
import { GITHUB_USERNAME, SITE_URL } from "@/lib/constants"

export const dynamic = "force-dynamic"

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

type GithubApiError = {
  status: number
  message?: string
  documentation_url?: string
  rateLimitRemaining?: string | null
}

async function getRepo(slug: string): Promise<{ repo: GithubRepo | null; error?: GithubApiError }> {
  const headers: Record<string, string> = {}
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_USERNAME}/${slug}`,
    { cache: "no-store", headers }
  )
  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as { message?: string; documentation_url?: string }
    return {
      repo: null,
      error: {
        status: response.status,
        message: payload.message,
        documentation_url: payload.documentation_url,
        rateLimitRemaining: response.headers.get("x-ratelimit-remaining"),
      },
    }
  }
  return { repo: (await response.json()) as GithubRepo }
}

type GithubReadme = {
  content?: string
  encoding?: string
}

function extractSummaryFromReadme(raw: string) {
  const text = raw
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[[^\]]*\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/\r/g, "")
    .trim()

  const firstParagraph = text.split(/\n\s*\n/)[0]?.trim()
  if (!firstParagraph) return null
  return firstParagraph.length > 220 ? `${firstParagraph.slice(0, 217)}...` : firstParagraph
}

async function getReadmeSummary(
  slug: string
): Promise<{ summary: string | null; error?: GithubApiError }> {
  const headers: Record<string, string> = {}
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_USERNAME}/${slug}/readme`,
    { cache: "no-store", headers }
  )
  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as { message?: string; documentation_url?: string }
    return {
      summary: null,
      error: {
        status: response.status,
        message: payload.message,
        documentation_url: payload.documentation_url,
        rateLimitRemaining: response.headers.get("x-ratelimit-remaining"),
      },
    }
  }
  const readme = (await response.json()) as GithubReadme
  if (!readme.content || readme.encoding !== "base64") return { summary: null }
  const raw = Buffer.from(readme.content, "base64").toString("utf-8")
  return { summary: extractSummaryFromReadme(raw) }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const [repo, readmeSummary] = await Promise.all([
    getRepo(params.slug),
    getReadmeSummary(params.slug),
  ])
  if (!repo.repo) return {}
  const description =
    readmeSummary.summary ?? repo.repo.description ?? `Case study for ${repo.repo.name}`
  return {
    title: `${repo.repo.name} Case Study | SoburrX`,
    description,
    openGraph: {
      title: `${repo.repo.name} Case Study`,
      description,
      type: "article",
      url: `${SITE_URL}/projects/${repo.repo.name}`,
    },
  }
}

export default async function ProjectCaseStudyPage({ params }: { params: Params }) {
  const [repo, readmeSummary] = await Promise.all([
    getRepo(params.slug),
    getReadmeSummary(params.slug),
  ])
  if (!repo.repo) {
    const error = repo.error
    const readmeError = readmeSummary.error
    const hasToken = Boolean(process.env.GITHUB_TOKEN)
    return (
      <main className="min-h-screen px-4 md:px-6 lg:px-8 py-24">
        <article className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-6 md:p-8">
          <Link href="/#projects" className="text-sm text-accent hover:underline">
            ← Back to projects
          </Link>
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground mt-4">
            Case study unavailable
          </h1>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            GitHub didn’t return data for this repository. This can happen if the repo is
            private, the API is rate-limited, or the name changed.
          </p>
          <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground space-y-2">
            <div>Repo: {GITHUB_USERNAME}/{params.slug}</div>
            <div>Has token: {hasToken ? "yes" : "no"}</div>
            {error ? (
              <div>
                Repo API: {error.status} {error.message ?? ""}
                {error.rateLimitRemaining ? ` (rate remaining: ${error.rateLimitRemaining})` : ""}
              </div>
            ) : null}
            {readmeError ? (
              <div>
                README API: {readmeError.status} {readmeError.message ?? ""}
                {readmeError.rateLimitRemaining
                  ? ` (rate remaining: ${readmeError.rateLimitRemaining})`
                  : ""}
              </div>
            ) : null}
          </div>
        </article>
      </main>
    )
  }

  const status = repo.repo.archived ? "Archived" : repo.repo.homepage ? "Live" : "Code only"
  const screenshotUrl = `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.repo.name}`
  const overview =
    readmeSummary.summary ??
    repo.repo.description ??
    "This project showcases practical full-stack engineering decisions and delivery."

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
          {repo.repo.language ? (
            <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-muted">
              {repo.repo.language}
            </span>
          ) : null}
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold text-foreground mt-4">
          {repo.repo.name}
        </h1>
        <p className="text-muted-foreground mt-3 leading-relaxed">{overview}</p>

        <div className="mt-6 overflow-hidden rounded-xl border border-border bg-muted/20">
          <img
            src={screenshotUrl}
            alt={`${repo.repo.name} repository preview`}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>

        <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm">
          <div className="rounded-lg border border-border p-3 bg-muted/30">
            <p className="text-muted-foreground">Stars</p>
            <p className="text-foreground font-semibold">{repo.repo.stargazers_count}</p>
          </div>
          <div className="rounded-lg border border-border p-3 bg-muted/30">
            <p className="text-muted-foreground">Forks</p>
            <p className="text-foreground font-semibold">{repo.repo.forks_count}</p>
          </div>
          <div className="rounded-lg border border-border p-3 bg-muted/30">
            <p className="text-muted-foreground">Last Updated</p>
            <p className="text-foreground font-semibold">
              {new Date(repo.repo.updated_at).toLocaleDateString("en-US", { dateStyle: "medium" })}
            </p>
          </div>
        </div>

        <section className="mt-10 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Overview</h2>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              {overview}
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
              href={repo.repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-accent text-accent-foreground px-4 py-2 text-sm font-medium hover:bg-accent/90"
            >
              View Code
            </a>
            {repo.repo.homepage ? (
              <a
                href={repo.repo.homepage}
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
