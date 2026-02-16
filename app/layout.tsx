import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Abdullah Oladimeji Abdulsobur (SoburrX) | Junior Full Stack Engineer",
  description:
    "Junior Full Stack Engineer with 3 years of experience and 8 shipped projects. Building scalable products with Next.js, TypeScript, Node.js, and modern databases.",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah Oladimeji Abdulsobur (SoburrX) | Junior Full Stack Engineer",
    description:
      "Junior Full Stack Engineer with 3 years of experience and 8 shipped projects.",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
