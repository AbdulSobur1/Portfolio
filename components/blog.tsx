import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { SectionWrapper } from "@/components/section-wrapper"
import { SectionHeader } from "@/components/section-header"
import { Badge } from "@/components/ui/badge"
import { WRITING_POSTS } from "@/lib/content"

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
          {WRITING_POSTS.map((article) => (
            <article
              key={article.slug}
              role="listitem"
              className="group py-6 first:pt-0 last:pb-0"
            >
              <Link href={`/writing/${article.slug}`} className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
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
                      {new Date(article.date).toLocaleDateString("en-US", { dateStyle: "medium" })}
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
              </Link>
            </article>
          ))}
        </div>
        <Link href="/writing" className="text-sm text-accent hover:underline w-fit">
          View all writing →
        </Link>
      </div>
    </SectionWrapper>
  )
}
