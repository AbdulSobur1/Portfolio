import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AnalyticsScript } from "@/components/analytics-script"
import { CommandPalette } from "@/components/command-palette"
import { ErrorMonitor } from "@/components/error-monitor"
import { SITE_URL } from "@/lib/constants"

import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Abdullah Oladimeji Abdulsobur (SoburrX) | Junior Full Stack Engineer",
  description:
    "Junior Full Stack Engineer with 3 years of experience and 8 shipped projects. Building scalable products with Next.js, TypeScript, Node.js, and modern databases.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Junior Full Stack Engineer",
    "Abdullah Oladimeji Abdulsobur",
    "SoburrX",
    "React",
    "Node.js",
    "TypeScript",
    "Next.js",
    "Software Engineer",
  ],
  authors: [{ name: "Abdullah Oladimeji Abdulsobur" }],
  openGraph: {
    title: "Abdullah Oladimeji Abdulsobur (SoburrX) | Junior Full Stack Engineer",
    description:
      "Junior Full Stack Engineer with 3 years of experience and 8 shipped projects.",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    images: [{ url: "/og", width: 1200, height: 630, alt: "SoburrX portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah Oladimeji Abdulsobur (SoburrX) | Junior Full Stack Engineer",
    description:
      "Junior Full Stack Engineer with 3 years of experience and 8 shipped projects.",
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0f11" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Abdullah Oladimeji Abdulsobur",
    alternateName: "SoburrX",
    jobTitle: "Junior Full Stack Engineer",
    url: SITE_URL,
    email: "abdullahabdulsobur@gmail.com",
    sameAs: [
      "https://github.com/AbdulSobur1",
      "https://x.com/soburr0",
      "https://www.linkedin.com/in/sobur1/",
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AnalyticsScript />
        <ErrorMonitor />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CommandPalette />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
