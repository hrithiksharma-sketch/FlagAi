"use client"

import type React from "react"
import { FileSearch, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signInDemo } from "@/lib/demo-auth"

export default function LoginPage() {
  const router = useRouter()

  const handleDemoLogin = () => {
    signInDemo()
    router.push("/dashboard")
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Panel - Branding */}
      <div className="relative hidden flex-col justify-between bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 p-12 text-white lg:flex">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
              <FileSearch className="h-7 w-7" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">Contract Intelligence</h1>
              <p className="text-sm text-blue-100">Powered by AI</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="mb-4 text-4xl font-bold leading-tight">
              Turn contracts into
              <br />
              actionable insights
            </h2>
            <p className="text-lg text-blue-100">AI-powered contract analysis for Legal, Finance, and Sales teams</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Demo Login */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary lg:hidden">
              <FileSearch className="h-7 w-7 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Demo Access</h2>
            <p className="text-muted-foreground">Explore the Contract Intelligence platform</p>
          </div>

          <div className="space-y-6">
            <Button onClick={handleDemoLogin} className="w-full" size="lg">
              Enter Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="text-center">
              <Link href="/" className="text-sm text-muted-foreground hover:underline">
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
