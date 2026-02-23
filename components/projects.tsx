import { ExternalLink, Github, Star, GitFork } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { SectionWrapper } from "@/components/section-wrapper"
import { SectionHeader } from "@/components/section-header"
import { GITHUB_USERNAME } from "@/lib/constants"

type GithubRepo = {
  id: number
  name: string
  html_url: string
  homepage: string | null
  description: string | null
  readmeSummary?: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  fork: boolean
  archived?: boolean
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
  return firstParagraph.length > 160 ? `${firstParagraph.slice(0, 157)}...` : firstParagraph
}

async function getReadmeSummary(repo: GithubRepo): Promise<string | null> {
  const headers: Record<string, string> = {}
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/readme`,
    { cache: "no-store", headers }
  )
  if (!response.ok) return null
  const readme = (await response.json()) as GithubReadme
  if (!readme.content || readme.encoding !== "base64") return null
  const raw = Buffer.from(readme.content, "base64").toString("utf-8")
  return extractSummaryFromReadme(raw)
}

async function getProjects(): Promise<GithubRepo[]> {
  try {
    const headers: Record<string, string> = {}
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      { cache: "no-store", headers }
    )

    if (!response.ok) {
      return []
    }

    const repos = (await response.json()) as GithubRepo[]
    const topRepos = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count
        }
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      })
      .slice(0, 8)

    const withSummaries = await Promise.all(
      topRepos.map(async (repo) => ({
        ...repo,
        readmeSummary: await getReadmeSummary(repo),
      }))
    )

    return withSummaries
  } catch {
    return []
  }
}

function formatProjectName(name: string) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function getThumbnailUrl(project: GithubRepo) {
  const cacheKey = encodeURIComponent(project.updated_at ?? "latest")
  return `https://opengraph.githubassets.com/${cacheKey}/${GITHUB_USERNAME}/${project.name}`
}

export async function Projects() {
  const projects = await getProjects()

  return (
    <SectionWrapper id="projects">
      <div className="flex flex-col gap-12">
        <SectionHeader
          label="Projects"
          heading="Selected client and product work."
          description="Professional builds and product experiments, backed by live GitHub data and case studies."
        />

        {projects.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Could not load repositories from GitHub. Confirm the username in
            <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-foreground">
              components/projects.tsx
            </code>
            and ensure public repos are available.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <article
                key={project.id}
                className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4 hover:border-accent/30 transition-colors"
              >
                <div className="overflow-hidden rounded-lg border border-border/60 bg-muted/40">
                  <img
                    src={getThumbnailUrl(project)}
                    alt={`${formatProjectName(project.name)} project thumbnail`}
                    className="h-40 w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground break-all">
                      <Link href={`/projects/${encodeURIComponent(project.name)}`} className="hover:text-accent transition-colors">
                        {formatProjectName(project.name)}
                      </Link>
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {project.archived ? (
                        <Badge variant="secondary" className="text-[10px]">
                          Archived
                        </Badge>
                      ) : project.homepage ? (
                        <Badge variant="secondary" className="text-[10px]">
                          Live
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-[10px]">
                          Code only
                        </Badge>
                      )}
                    </div>
                  </div>
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                    aria-label={`Open ${project.name} on GitHub`}
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.readmeSummary ?? project.description ?? "No description provided."}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5" />
                    {project.stargazers_count}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="h-3.5 w-3.5" />
                    {project.forks_count}
                  </span>
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-2">
                  <Link href={`/projects/${encodeURIComponent(project.name)}`} className="inline-flex items-center gap-1 text-xs text-accent hover:underline">
                    Case Study
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                  {project.language ? (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-secondary text-secondary-foreground"
                    >
                      {project.language}
                    </Badge>
                  ) : null}
                  {project.homepage ? (
                    <a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
                    >
                      Live Demo
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
