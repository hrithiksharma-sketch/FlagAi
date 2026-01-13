"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileSearch, Brain, BarChart3, Shield, Zap, Users, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-background via-background to-muted/20">
      {/* Animated Background Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Ambient Glow Effects */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary/20 opacity-20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/20 opacity-20 blur-[120px]" />

      {/* Futuristic Header */}
      <header className="relative z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 via-cyan-600 to-teal-700 shadow-lg shadow-teal-500/25">
              <FileSearch className="h-6 w-6 text-white" />
              <div className="absolute inset-0 animate-pulse rounded-xl bg-primary/20" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">FLAG AI</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="font-semibold">
                Dashboard
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost" className="font-semibold">
                Sign in
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 font-semibold shadow-lg shadow-teal-500/25 transition-all hover:shadow-xl hover:shadow-teal-500/30">
                Get started
                <Sparkles className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative flex-1">
        {/* Hero Section with Parallax */}
        <section ref={heroRef} className="relative overflow-hidden py-32">
          <div className="container relative z-10 mx-auto px-6">
            <div className="mx-auto max-w-5xl text-center">
              {/* Floating Badge with 3D effect */}
              <div
                className="mb-8 inline-flex items-center gap-3 rounded-full border border-teal-500/20 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-teal-500/10 px-6 py-3 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl"
                style={{
                  transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-600">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-sm font-bold text-transparent">
                  AI-Powered FLAG AI
                </span>
              </div>

              {/* Main Heading with Gradient */}
              <h2
                className="mb-8 text-balance bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-6xl font-black leading-[1.1] tracking-tighter text-transparent md:text-7xl lg:text-8xl"
                style={{
                  transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`,
                  transition: "transform 0.2s ease-out",
                }}
              >
                Transform Contracts Into{" "}
                <span className="bg-gradient-to-r from-teal-500 via-cyan-600 to-teal-400 bg-clip-text text-transparent">
                  Intelligence
                </span>
              </h2>

              {/* Subtitle */}
              <p
                className="mx-auto mb-12 max-w-3xl text-balance text-xl leading-relaxed text-muted-foreground md:text-2xl"
                style={{
                  transform: `translate(${mousePosition.x * 3}px, ${mousePosition.y * 3}px)`,
                  transition: "transform 0.25s ease-out",
                }}
              >
                Automated extraction, intelligent Q&A, and real-time insights for Legal, Finance, Sales, and Service
                teams.
              </p>

              {/* CTA Buttons with Hover Effects */}
              <div
                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                style={{
                  transform: `translate(${mousePosition.x * -3}px, ${mousePosition.y * -3}px)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="group relative gap-2 overflow-hidden bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 px-8 py-6 text-lg font-bold shadow-2xl shadow-teal-500/40 transition-all hover:scale-105 hover:shadow-teal-500/50"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Explore Demo
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-teal-500/20 bg-background/50 px-8 py-6 text-lg font-bold backdrop-blur-sm transition-all hover:scale-105 hover:border-teal-500/40 hover:bg-background/80 hover:shadow-xl"
                  >
                    Start Free Trial
                  </Button>
                </Link>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                No credit card required • Enterprise-ready security • 99.2% accuracy
              </p>
            </div>
          </div>

          {/* Floating Elements */}
          <div
            className="absolute left-1/4 top-1/4 h-32 w-32 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 blur-2xl"
            style={{
              transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px) rotate(${mousePosition.x * 10}deg)`,
              transition: "transform 0.5s ease-out",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 blur-2xl"
            style={{
              transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px) rotate(${mousePosition.x * -10}deg)`,
              transition: "transform 0.5s ease-out",
            }}
          />
        </section>

        {/* Features Grid with Glass-morphism */}
        <section className="relative border-t border-border/40 bg-gradient-to-b from-muted/30 to-background py-32">
          <div className="container mx-auto px-6">
            <div className="mb-20 text-center">
              <h3 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Enterprise FLAG AI</h3>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Powerful AI features designed for modern contract lifecycle management
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: FileSearch,
                  title: "Automated Extraction",
                  description:
                    "Upload contracts and let AI extract critical clauses, obligations, and key terms with 99.2% accuracy.",
                  gradient: "from-teal-500/20 to-cyan-500/20",
                },
                {
                  icon: Brain,
                  title: "AI Q&A Assistant",
                  description:
                    "Ask questions about your contracts and get trustworthy answers with evidence highlighting and citations.",
                  gradient: "from-purple-500/20 to-teal-500/20",
                },
                {
                  icon: BarChart3,
                  title: "Real-Time Dashboards",
                  description:
                    "Monitor obligations, track renewals, and understand exposure across your entire portfolio instantly.",
                  gradient: "from-emerald-500/20 to-teal-500/20",
                },
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  description:
                    "Bank-level encryption, role-based access control, and SOC 2 compliance keep your contracts secure.",
                  gradient: "from-amber-500/20 to-orange-500/20",
                },
                {
                  icon: Zap,
                  title: "Lightning Processing",
                  description:
                    "Process contracts in seconds, not hours. Bulk upload support with parallel AI extraction.",
                  gradient: "from-yellow-500/20 to-amber-500/20",
                },
                {
                  icon: Users,
                  title: "Team Collaboration",
                  description:
                    "Role-tailored views for Legal, Finance, Sales, and Service teams with unified insights.",
                  gradient: "from-pink-500/20 to-purple-500/20",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/50 p-8 backdrop-blur-sm transition-all hover:scale-[1.02] hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-500/10"
                >
                  {/* Background Gradient on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity group-hover:opacity-100`}
                  />

                  <div className="relative z-10">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10 shadow-lg transition-all group-hover:scale-110 group-hover:shadow-xl">
                      <feature.icon className="h-8 w-8 text-teal-500 transition-transform group-hover:rotate-6" />
                    </div>
                    <h4 className="mb-3 text-2xl font-bold tracking-tight">{feature.title}</h4>
                    <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden border-t border-border/40 bg-gradient-to-br from-teal-500/5 via-cyan-500/5 to-teal-500/5 py-32">
          <div className="container relative z-10 mx-auto px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h3 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
                Ready to unlock FLAG AI?
              </h3>
              <p className="mb-10 text-xl text-muted-foreground">
                Join leading organizations using AI to transform their contract management
              </p>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-6 text-lg font-bold shadow-2xl shadow-teal-500/40 transition-all hover:scale-105 hover:shadow-teal-500/50"
                >
                  Explore Live Demo
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Futuristic Footer */}
      <footer className="relative border-t border-border/40 bg-background/95 py-16 backdrop-blur-xl">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg">
                <FileSearch className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">FLAG AI</span>
            </div>
            <p className="max-w-md text-muted-foreground">
              AI-powered contract management platform for modern enterprises
            </p>
            <p className="text-sm text-muted-foreground">© 2026 FLAG AI Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
