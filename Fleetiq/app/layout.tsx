import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Geist_Mono } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Fleetiq - AI-driven Fleet Optimization",
  description: "AI-powered platform that transforms fleet management with real-time optimization",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${geistMono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
