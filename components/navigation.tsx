"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Upload, MessageSquare, FileText, LogOut, FileSearch, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { signOutDemo } from "@/lib/demo-auth"

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = () => {
    signOutDemo()
    router.push("/auth/login")
  }

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    // {
    //   href: "/dashboard/ingestion",
    //   label: "Ingestion",
    //   icon: Upload,
    // },
    {
      href: "/dashboard/assistant",
      label: "AI Assistant",
      icon: MessageSquare,
    },
    {
      href: "/dashboard/contracts",
      label: "Contracts",
      icon: FileText,
    },
  ]

  return (
    <nav className="flex h-full w-72 flex-col border-r border-border/40 bg-card/50 backdrop-blur-xl">
      <div className="flex h-20 items-center gap-3 border-b border-border/40 bg-gradient-to-r from-teal-500/5 to-cyan-500/5 px-6">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 via-cyan-600 to-teal-700 shadow-lg">
          <FileSearch className="h-6 w-6 text-white" />
          <div className="absolute inset-0 animate-pulse rounded-xl bg-teal-500/20" />
        </div>
        <div>
          <h1 className="text-balance text-lg font-bold leading-tight">FLAG AI</h1>
          <p className="text-xs text-muted-foreground">AI Contract Intelligence</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3.5 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-500/25"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 animate-pulse-glow bg-gradient-to-r from-teal-500/20 to-cyan-600/20" />
              )}
              <Icon
                className={`relative z-10 h-5 w-5 transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`}
              />
              <span className="relative z-10">{item.label}</span>
              {isActive && <Sparkles className="relative z-10 ml-auto h-4 w-4 animate-pulse" />}
            </Link>
          )
        })}
      </div>
      <div className="border-t border-border/40 bg-gradient-to-r from-teal-500/5 to-cyan-500/5 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 font-semibold transition-all hover:bg-destructive/10 hover:text-destructive"
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </nav>
  )
}
