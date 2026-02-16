import { ExternalLink, Github, Star, GitFork } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SectionWrapper } from "@/components/section-wrapper"
import { SectionHeader } from "@/components/section-header"

const GITHUB_USERNAME = "AbdulSobur1"

type GithubRepo = {
  id: number
  name: string
  html_url: string
  homepage: string | null
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  fork: boolean
}

async function getProjects(): Promise<GithubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      { next: { revalidate: 3600 } }
    )

    if (!response.ok) {
      return []
    }

    const repos = (await response.json()) as GithubRepo[]
    return repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count
        }
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      })
      .slice(0, 8)
  } catch {
    return []
  }
}

export async function Projects() {
  const projects = await getProjects()

  return (
    <SectionWrapper id="projects">
      <div className="flex flex-col gap-12">
        <SectionHeader
          label="Projects"
          heading="Projects from my GitHub."
          description="Selected repositories from my public GitHub profile."
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
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-foreground break-all">
                    {project.name}
                  </h3>
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
                  {project.description ?? "No description provided."}
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
