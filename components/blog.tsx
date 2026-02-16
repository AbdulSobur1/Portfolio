import { ArrowUpRight } from "lucide-react"
import { SectionWrapper } from "@/components/section-wrapper"
import { SectionHeader } from "@/components/section-header"
import { Badge } from "@/components/ui/badge"

const articles = [
  {
    title: "Why I Rebuilt Our Entire Frontend with Server Components",
    excerpt:
      "A deep dive into migrating a 200K LOC React SPA to Next.js App Router — the wins, the pitfalls, and everything I learned along the way.",
    date: "Jan 2026",
    readTime: "12 min read",
    tags: ["Next.js", "Architecture"],
  },
  {
    title: "The Art of Scaling WebSocket Connections to 1M+",
    excerpt:
      "How we designed a horizontally scalable WebSocket infrastructure that handles millions of concurrent connections with sub-50ms latency.",
    date: "Nov 2025",
    readTime: "15 min read",
    tags: ["Systems Design", "Performance"],
  },
  {
    title: "From Learning to Shipping: What Helped Me Improve Fast",
    excerpt:
      "How I improved by focusing on hands-on coding, shipping features, and learning from project feedback as a junior full-stack engineer.",
    date: "Sep 2025",
    readTime: "8 min read",
    tags: ["Career", "Startups"],
  },
]

export function Blog() {
  return (
    <SectionWrapper id="blog" className="bg-muted/30">
      <div className="flex flex-col gap-12">
        <SectionHeader
          label="Writing"
          heading="Thoughts on engineering."
          description="I write about architecture decisions, scaling challenges, and lessons learned from building products."
        />

        {/* Article list */}
        <div className="flex flex-col gap-0 divide-y divide-border" role="list" aria-label="Blog articles">
          {articles.map((article, index) => (
            <article
              key={index}
              role="listitem"
              className="group py-6 first:pt-0 last:pb-0"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                <div className="flex-1 flex flex-col gap-1.5">
                  <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors flex items-center gap-2">
                    {article.title}
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" aria-hidden="true" />
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <time className="text-xs text-muted-foreground font-mono">
                      {article.date}
                    </time>
                    <span className="text-xs text-muted-foreground">
                      {article.readTime}
                    </span>
                    <div className="flex gap-1.5">
                      {article.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[10px] bg-secondary text-secondary-foreground"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
