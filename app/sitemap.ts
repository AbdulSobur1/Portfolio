import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/constants"
import { WRITING_POSTS } from "@/lib/content"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/writing`, changeFrequency: "weekly", priority: 0.7 },
  ]

  const writingRoutes: MetadataRoute.Sitemap = WRITING_POSTS.map((post) => ({
    url: `${SITE_URL}/writing/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...writingRoutes]
}

