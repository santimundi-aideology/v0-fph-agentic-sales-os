import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const suisseIntl = localFont({
  src: [
    { path: "../public/fonts/SuisseIntl-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/SuisseIntl-Medium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/SuisseIntl-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-suisse",
  display: "swap",
  fallback: ["Arial", "Helvetica Neue", "Helvetica", "sans-serif"],
})

export const metadata: Metadata = {
  title: "Etisalat Projects Holding — Agentic Sales OS",
  description: "AI Real-Estate Sales Agent Operating System — Etisalat Projects Holding",
  generator: "v0.app",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${suisseIntl.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme="light" storageKey="fph-theme">
          {children}
        </ThemeProvider>
        <Analytics />
        <Script
          src="https://unpkg.com/@elevenlabs/convai-widget-embed@beta"
          strategy="lazyOnload"
          type="text/javascript"
        />
      </body>
    </html>
  )
}
