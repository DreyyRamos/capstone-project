import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { RoleProvider } from "@/contexts/role-context"
import { RoleBasedLayout } from "@/components/role-based-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "School Publication System",
  description: "Web-based school publication system with forum",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <RoleProvider>
            <RoleBasedLayout>{children}</RoleBasedLayout>
          </RoleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
