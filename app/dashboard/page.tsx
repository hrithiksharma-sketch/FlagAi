"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, AlertCircle, Calendar, DollarSign, TrendingUp, Clock, Activity, ArrowUpRight, ArrowDownRight, Sparkles, Target, Users, BarChart3, PieChart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, ResponsiveContainer, Legend, Tooltip } from "recharts"

function getDashboardMetrics() {
  return {
    totalContracts: 12,
    activeContracts: 8,
    expiringContracts: 3,
    pendingObligations: 5,
    totalValue: 2450000,
    monthlyGrowth: 12.5,
    complianceScore: 94,
    avgProcessingTime: 14,
    recentContracts: [
      {
        id: "demo-1",
        title: "Master Services Agreement - Acme Corp",
        party_b: "Acme Corporation",
        status: "active",
        created_at: new Date(2024, 0, 15).toISOString(),
        value: 250000,
      },
      {
        id: "demo-2",
        title: "Software License Agreement - TechFlow",
        party_b: "TechFlow Solutions",
        status: "active",
        created_at: new Date(2024, 1, 3).toISOString(),
        value: 180000,
      },
      {
        id: "demo-3",
        title: "Vendor Agreement - DataSync Inc",
        party_b: "DataSync Inc",
        status: "active",
        created_at: new Date(2024, 2, 20).toISOString(),
        value: 95000,
      },
    ],
    upcomingObligations: [
      {
        id: "demo-ob-1",
        description: "Quarterly performance review and compliance audit",
        due_date: new Date(2024, 3, 15).toISOString(),
        priority: "high",
        contracts: { title: "Master Services Agreement - Acme Corp" },
      },
      {
        id: "demo-ob-2",
        description: "Annual license renewal payment due",
        due_date: new Date(2024, 4, 1).toISOString(),
        priority: "critical",
        contracts: { title: "Software License Agreement - TechFlow" },
      },
      {
        id: "demo-ob-3",
        description: "Submit monthly service report",
        due_date: new Date(2024, 3, 30).toISOString(),
        priority: "medium",
        contracts: { title: "Vendor Agreement - DataSync Inc" },
      },
    ],
    contractsByType: [
      { type: "Service Agreement", count: 4, value: 850000 },
      { type: "License", count: 3, value: 620000 },
      { type: "NDA", count: 2, value: 0 },
      { type: "Partnership", count: 2, value: 750000 },
      { type: "Consulting", count: 1, value: 230000 },
    ],
    monthlyActivity: [
      { month: "Jan", contracts: 2, value: 450000 },
      { month: "Feb", contracts: 3, value: 680000 },
      { month: "Mar", contracts: 4, value: 920000 },
      { month: "Apr", contracts: 3, value: 400000 },
    ],
  }
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState(getDashboardMetrics())
  const [mounted, setMounted] = useState(false)
  const hasContracts = metrics.totalContracts > 0

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col gap-8 p-8">
      {/* Header with Gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 via-cyan-700 to-teal-700 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Activity className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">FLAG AI Hub</h1>
              <p className="mt-2 text-cyan-100">
                {hasContracts
                  ? "AI-powered contract lifecycle management and insights"
                  : "Welcome! Start by uploading your first contract"}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/ingestion">
              <Button size="lg" variant="secondary" className="shadow-lg">
                <FileText className="mr-2 h-4 w-4" />
                Upload Contract
              </Button>
            </Link>
            <Link href="/dashboard/assistant">
              <Button size="lg" variant="secondary" className="shadow-lg">
                <Sparkles className="mr-2 h-4 w-4" />
                Ask AI
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {!hasContracts && (
        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <FileText className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">No contracts yet</h3>
            <p className="mb-6 max-w-md text-center text-muted-foreground">
              Upload your first contract to unlock AI-powered clause extraction, obligation tracking, and intelligent
              Q&A
            </p>
            <Link href="/dashboard/ingestion">
              <Button size="lg">
                <FileText className="mr-2 h-4 w-4" />
                Upload First Contract
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {hasContracts && (
        <>
          {/* Enhanced Metrics Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="group relative overflow-hidden border-l-4 border-l-teal-600 transition-all hover:shadow-xl hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-teal-950" />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-950">
                  <FileText className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-4xl font-bold">{metrics.activeContracts}</div>
                <p className="mt-2 flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                  <span className="text-green-600 font-medium">+{metrics.monthlyGrowth}%</span>
                  <span className="ml-1">from last month</span>
                </p>
                <Progress value={(metrics.activeContracts / metrics.totalContracts) * 100} className="mt-3 h-1" />
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-l-4 border-l-amber-600 transition-all hover:shadow-xl hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-amber-950" />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-950">
                  <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-4xl font-bold">{metrics.expiringContracts}</div>
                <p className="mt-2 flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  Within 90 days
                </p>
                <div className="mt-3 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded ${i < metrics.expiringContracts ? "bg-amber-600" : "bg-muted"}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-l-4 border-l-purple-600 transition-all hover:shadow-xl hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-purple-950" />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Obligations</CardTitle>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950">
                  <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-4xl font-bold">{metrics.pendingObligations}</div>
                <p className="mt-2 flex items-center text-xs text-muted-foreground">
                  <Target className="mr-1 h-3 w-3" />
                  Action items due
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="destructive" className="text-xs">2 Critical</Badge>
                  <Badge variant="secondary" className="text-xs">3 Normal</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-l-4 border-l-green-600 transition-all hover:shadow-xl hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-green-950" />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Contract Value</CardTitle>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-950">
                  <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-4xl font-bold">${(metrics.totalValue / 1000000).toFixed(1)}M</div>
                <p className="mt-2 flex items-center text-xs text-muted-foreground">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-green-600" />
                  <span className="text-green-600 font-medium">+18.2%</span>
                  <span className="ml-1">vs last quarter</span>
                </p>
                <Progress value={75} className="mt-3 h-1" />
              </CardContent>
            </Card>
          </div>

          {/* Analytics Dashboard */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Contract Distribution */}
            <Card className="lg:col-span-2 transition-all hover:shadow-lg">
              <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <CardTitle>Contract Portfolio Analysis</CardTitle>
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    <Sparkles className="h-3 w-3" />
                    AI Insights
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs defaultValue="type" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="type">By Type</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  </TabsList>
                  <TabsContent value="type" className="mt-6">
                    <ChartContainer
                      config={{
                        count: {
                          label: "Contracts",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <BarChart data={metrics.contractsByType}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis
                          dataKey="type"
                          className="text-xs"
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis className="text-xs" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]}>
                          {metrics.contractsByType.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                index === 0 ? "hsl(180, 70%, 50%)" :
                                index === 1 ? "hsl(271, 91%, 65%)" :
                                index === 2 ? "hsl(142, 76%, 36%)" :
                                index === 3 ? "hsl(38, 92%, 50%)" :
                                "hsl(330, 81%, 60%)"
                              }
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ChartContainer>
                  </TabsContent>
                  <TabsContent value="timeline" className="mt-6">
                    <ChartContainer
                      config={{
                        value: {
                          label: "Contract Value",
                          color: "hsl(var(--chart-2))",
                        },
                        contracts: {
                          label: "Number of Contracts",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <LineChart data={metrics.monthlyActivity}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis yAxisId="left" className="text-xs" />
                        <YAxis yAxisId="right" orientation="right" className="text-xs" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="contracts"
                          stroke="hsl(180, 70%, 50%)"
                          strokeWidth={3}
                          dot={{ fill: "hsl(180, 70%, 50%)", r: 5 }}
                          activeDot={{ r: 7 }}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="value"
                          stroke="hsl(142, 76%, 36%)"
                          strokeWidth={3}
                          dot={{ fill: "hsl(142, 76%, 36%)", r: 5 }}
                          activeDot={{ r: 7 }}
                        />
                      </LineChart>
                    </ChartContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Compliance Score */}
            <Card className="transition-all hover:shadow-lg">
              <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Compliance Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center">
                  <ChartContainer
                    config={{
                      met: {
                        label: "Obligations Met",
                        color: "hsl(142, 76%, 36%)",
                      },
                      pending: {
                        label: "Pending",
                        color: "hsl(38, 92%, 50%)",
                      },
                      overdue: {
                        label: "Overdue",
                        color: "hsl(0, 84%, 60%)",
                      },
                    }}
                    className="h-[200px] w-full"
                  >
                    <RechartsPieChart>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Pie
                        data={[
                          { name: "met", value: 45, fill: "hsl(142, 76%, 36%)" },
                          { name: "pending", value: 5, fill: "hsl(38, 92%, 50%)" },
                          { name: "overdue", value: 2, fill: "hsl(0, 84%, 60%)" },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                      </Pie>
                    </RechartsPieChart>
                  </ChartContainer>
                  <div className="mt-4 w-full space-y-3">
                    <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-green-50 dark:bg-green-950/20">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-600" />
                        <span className="text-muted-foreground">Obligations Met</span>
                      </div>
                      <span className="font-bold text-green-600">45 (87%)</span>
                    </div>
                    <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-amber-50 dark:bg-amber-950/20">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-amber-600" />
                        <span className="text-muted-foreground">Pending</span>
                      </div>
                      <span className="font-bold text-amber-600">5 (10%)</span>
                    </div>
                    <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-red-50 dark:bg-red-950/20">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-600" />
                        <span className="text-muted-foreground">Overdue</span>
                      </div>
                      <span className="font-bold text-red-600">2 (3%)</span>
                    </div>
                    <div className="mt-4 pt-3 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Overall Score</span>
                        <Badge variant="secondary" className="text-lg font-bold">
                          {metrics.complianceScore}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Feed */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="transition-all hover:shadow-lg">
              <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                  <Link href="/dashboard/contracts">
                    <Button variant="ghost" size="sm">
                      View all
                      <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {metrics.recentContracts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">No recent contracts</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {metrics.recentContracts.map((contract) => (
                      <div
                        key={contract.id}
                        className="group flex items-start justify-between rounded-xl border bg-gradient-to-r from-card to-muted/20 p-4 transition-all hover:shadow-md hover:scale-[1.02]"
                      >
                        <div className="flex gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg">
                            <FileText className="h-6 w-6" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium leading-tight">{contract.title}</p>
                            <p className="text-sm text-muted-foreground">{contract.party_b}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-muted-foreground">
                                {new Date(contract.created_at).toLocaleDateString()}
                              </p>
                              {contract.value && (
                                <>
                                  <span className="text-xs text-muted-foreground">•</span>
                                  <p className="text-xs font-medium text-green-600">
                                    ${(contract.value / 1000).toFixed(0)}K
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={
                            contract.status === "active"
                              ? "default"
                              : contract.status === "expired"
                                ? "destructive"
                                : "secondary"
                          }
                          className="shadow-sm"
                        >
                          {contract.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Upcoming Obligations
                  </CardTitle>
                  <Link href="/dashboard/contracts">
                    <Button variant="ghost" size="sm">
                      View all
                      <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {metrics.upcomingObligations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Calendar className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">No pending obligations</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {metrics.upcomingObligations.map((obligation) => (
                      <div
                        key={obligation.id}
                        className="group flex items-start justify-between rounded-xl border bg-gradient-to-r from-card to-muted/20 p-4 transition-all hover:shadow-md hover:scale-[1.02]"
                      >
                        <div className="flex gap-3">
                          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-lg ${
                            obligation.priority === "critical"
                              ? "bg-gradient-to-br from-red-500 to-red-600 text-white"
                              : obligation.priority === "high"
                                ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white"
                                : "bg-gradient-to-br from-teal-500 to-cyan-600 text-white"
                          }`}>
                            <Target className="h-6 w-6" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium leading-tight">{obligation.description}</p>
                            <p className="text-sm text-muted-foreground">{obligation.contracts?.title}</p>
                            <p className="text-xs text-muted-foreground">
                              Due: {obligation.due_date ? new Date(obligation.due_date).toLocaleDateString() : "No date"}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            obligation.priority === "critical"
                              ? "destructive"
                              : obligation.priority === "high"
                                ? "default"
                                : "secondary"
                          }
                          className="shadow-sm"
                        >
                          {obligation.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="border-2 border-dashed transition-all hover:border-primary hover:shadow-lg">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-white">
                  <Sparkles className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-semibold">Need help with your contracts?</h3>
                  <p className="text-sm text-muted-foreground">Ask our AI assistant anything about your contracts</p>
                </div>
              </div>
              <Link href="/dashboard/assistant">
                <Button size="lg" className="shadow-lg">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Ask AI Assistant
                </Button>
              </Link>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
