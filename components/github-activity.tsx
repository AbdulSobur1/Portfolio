import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/section-header"
import { SectionWrapper } from "@/components/section-wrapper"
import { GITHUB_USERNAME } from "@/lib/constants"

type GithubEvent = {
  id: string
  type: string
  repo: { name: string }
  created_at: string
}

type GithubRepo = {
  id: number
  name: string
  html_url: string
  stargazers_count: number
}

async function getGithubActivity() {
  const [reposRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=6&sort=updated`, {
      next: { revalidate: 3600 },
    }),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=6`, {
      next: { revalidate: 900 },
    }),
  ])

  const repos: GithubRepo[] = reposRes.ok ? ((await reposRes.json()) as GithubRepo[]) : []
  const events: GithubEvent[] = eventsRes.ok ? ((await eventsRes.json()) as GithubEvent[]) : []

  return {
    repos: repos
      .filter((repo) => !repo.name.includes(".github"))
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 4),
    events: events.slice(0, 5),
  }
}

export async function GithubActivity() {
  const { repos, events } = await getGithubActivity()

  return (
    <SectionWrapper id="github-activity">
      <div className="flex flex-col gap-12">
        <SectionHeader
          label="GitHub"
          heading="Public activity and top repositories."
          description="Live data from my GitHub profile."
        />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-base font-semibold text-foreground mb-4">Top Repositories</h3>
            <div className="flex flex-col gap-3">
              {repos.length === 0 ? (
                <p className="text-sm text-muted-foreground">No repository data available.</p>
              ) : (
                repos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between gap-3"
                  >
                    <span className="truncate">{repo.name}</span>
                    <Badge variant="secondary">⭐ {repo.stargazers_count}</Badge>
                  </a>
                ))
              )}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-base font-semibold text-foreground mb-4">Recent Public Events</h3>
            <div className="flex flex-col gap-3">
              {events.length === 0 ? (
                <p className="text-sm text-muted-foreground">No event data available.</p>
              ) : (
                events.map((event) => (
                  <div key={event.id} className="text-sm text-muted-foreground">
                    <p className="text-foreground">{event.type.replace("Event", "")}</p>
                    <p className="truncate">{event.repo.name}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

