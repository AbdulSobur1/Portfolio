# SoburrX Portfolio

Modern Next.js portfolio for **Abdullah Oladimeji Abdulsobur (SoburrX)**.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui components
- GitHub API integrations
- Contact delivery via Resend (primary) + FormSubmit fallback

## Local Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local` and set:

```bash
RESEND_API_KEY=your_resend_api_key
RESEND_FROM=Portfolio <noreply@yourdomain.com>
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
NEXT_PUBLIC_UMAMI_WEBSITE_ID=
NEXT_PUBLIC_UMAMI_SRC=
```

Notes:

- `RESEND_FROM` must be a verified sender/domain in Resend.
- If Resend is missing/misconfigured, contact API falls back to FormSubmit.

## Contact Form Health Check

After deploy, verify contact setup:

- `GET /api/contact/status`

Expected when fully configured:

- `providers.resend.configured: true`

## Build & Validation

```bash
pnpm lint
pnpm build
```

## Deploy (Vercel)

1. Import repo into Vercel.
2. Set framework to `Next.js` (auto-detected).
3. Add environment variables from above in Vercel project settings.
4. Deploy.

Every push to the connected branch auto-deploys.

## Features Included

- Case-study pages for GitHub projects (`/projects/[slug]`)
- Writing index and post routes (`/writing`, `/writing/[slug]`)
- Dynamic OG image route (`/og`)
- SEO routes (`/sitemap.xml`, `/robots.txt`)
- Command palette (`Ctrl/Cmd + K`)
- GitHub activity section
- Services/process/currently-building sections
- Client error logging endpoint (`/api/client-errors`)

