import type React from "react"
import { Navigation } from "@/components/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Users can access the dashboard without signing in for demo purposes
  return (
    <div className="flex h-screen">
      <Navigation />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
