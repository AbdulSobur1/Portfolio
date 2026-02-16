export const SERVICES = [
  {
    title: "Frontend Engineering",
    description:
      "Responsive, accessible interfaces with React, Next.js, TypeScript, and Tailwind.",
    deliverables: ["Design-to-code implementation", "Component architecture", "Performance tuning"],
  },
  {
    title: "Backend & APIs",
    description:
      "Production-ready APIs with Node.js or Python using REST, GraphQL, and WebSockets.",
    deliverables: ["Auth and permissions", "API design", "Realtime features"],
  },
  {
    title: "Full-stack MVP Delivery",
    description:
      "End-to-end product builds from idea to deployment with clean architecture and iteration loops.",
    deliverables: ["Schema and database design", "Deploy-ready app", "Post-launch improvements"],
  },
]

export const BUILD_PROCESS = [
  {
    step: "Discover",
    detail: "Clarify goals, users, and constraints before writing code.",
  },
  {
    step: "Design",
    detail: "Plan data flow, API contracts, and UI structure to reduce rework.",
  },
  {
    step: "Build",
    detail: "Ship in vertical slices with testing, clean commits, and measurable progress.",
  },
  {
    step: "Iterate",
    detail: "Use feedback and metrics to improve UX, performance, and reliability.",
  },
]

export const CURRENTLY_BUILDING = [
  {
    title: "Portfolio Case Study System",
    status: "In progress",
    note: "Turning shipped projects into structured case studies with architecture notes.",
  },
  {
    title: "Reusable Contact Workflows",
    status: "Testing",
    note: "Improving delivery reliability, status handling, and fallbacks for direct outreach.",
  },
  {
    title: "Next.js Developer Toolkit",
    status: "Planning",
    note: "A starter toolkit with auth, API patterns, and deployment defaults.",
  },
]

export const WRITING_POSTS = [
  {
    slug: "frontend-architecture-lessons",
    title: "Frontend Architecture Lessons from Shipped Projects",
    excerpt:
      "Patterns that improved maintainability across multiple Next.js codebases.",
    date: "2026-01-10",
    readTime: "8 min read",
    tags: ["Next.js", "Architecture"],
    content: [
      "I learned quickly that speed without structure creates expensive rewrites.",
      "A strong component hierarchy and clear boundaries between UI, state, and data fetching keeps teams fast over time.",
      "When I ship now, I optimize for clarity first, then micro-optimizations where needed.",
    ],
  },
  {
    slug: "shipping-as-a-junior-engineer",
    title: "Shipping Faster as a Junior Full-stack Engineer",
    excerpt:
      "The practical habits that helped me ship 8 projects in 3 years.",
    date: "2025-11-02",
    readTime: "6 min read",
    tags: ["Career", "Execution"],
    content: [
      "The biggest unlock was reducing scope aggressively and focusing on a usable first version.",
      "I split work into outcomes, not tasks, and track blockers early.",
      "Consistent shipping with feedback loops improved my code quality more than passive learning.",
    ],
  },
  {
    slug: "realtime-features-with-websockets",
    title: "Implementing Realtime Features with WebSockets",
    excerpt:
      "A practical guide to adding realtime updates without overengineering.",
    date: "2025-08-18",
    readTime: "10 min read",
    tags: ["WebSockets", "Backend"],
    content: [
      "Realtime features become simpler when you keep message contracts explicit and versioned.",
      "I use optimistic UI carefully and keep rollback paths straightforward.",
      "Reliability depends on observability, reconnection strategy, and idempotent handlers.",
    ],
  },
] as const

