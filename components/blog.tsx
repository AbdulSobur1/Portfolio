import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { SectionWrapper } from "@/components/section-wrapper"
import { WRITING_POSTS } from "@/lib/content"

export function Blog() {
  return (
    <SectionWrapper id="blog">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="text-xs font-mono font-medium text-emerald-300 tracking-widest uppercase">
            WRITING
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white text-balance">
            Thoughts on engineering.
          </h2>
          <p className="text-slate-400 leading-relaxed mt-2">
            I write about architecture decisions, scaling challenges, and lessons learned from building.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {WRITING_POSTS.map((article) => (
            <Link
              key={article.slug}
              href={`/writing/${article.slug}`}
              className="group rounded-xl border border-[#1e2530] bg-[#12161a] p-5 flex flex-col gap-3 hover:border-emerald-300/20 transition-all duration-300"
            >
              <time className="text-xs font-mono text-slate-500">
                {new Date(article.date).toLocaleDateString("en-US", { dateStyle: "medium" })}
              </time>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors flex items-start gap-2">
                {article.title}
                <ArrowUpRight className="h-4 w-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-300" />
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed flex-1">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex gap-1.5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[11px] font-mono rounded-full bg-white/5 border border-white/10 text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-[11px] text-slate-500">{article.readTime}</span>
              </div>
            </Link>
          ))}
        </div>

        <Link href="/writing" className="text-sm text-emerald-300 hover:underline w-fit ml-auto">
          View all writing →
        </Link>
      </div>
    </SectionWrapper>
  )
}
