"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadZone } from "@/components/upload-zone"
import { ProcessingList } from "@/components/processing-list"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, Zap, Upload, FileText, Brain, Sparkles, TrendingUp, Activity, Shield, Calendar, ArrowLeft, MessageSquare, BarChart3, PieChart } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar } from "recharts"
import { useState, useEffect } from "react"

export default function IngestionPage() {
  const [mounted, setMounted] = useState(false)
  const userId = "demo-user"

  // Demo processing records
  const processingRecords = [
    {
      id: "1",
      status: "completed",
      progress: 100,
      started_at: new Date(Date.now() - 300000).toISOString(),
      contracts: { title: "Service Agreement - TechCorp" },
    },
    {
      id: "2",
      status: "processing",
      progress: 65,
      started_at: new Date(Date.now() - 120000).toISOString(),
      contracts: { title: "Master Services Agreement" },
    },
  ]

  // Processing statistics data
  const processingStats = {
    daily: [
      { day: "Mon", processed: 45, failed: 2 },
      { day: "Tue", processed: 52, failed: 1 },
      { day: "Wed", processed: 48, failed: 3 },
      { day: "Thu", processed: 61, failed: 1 },
      { day: "Fri", processed: 55, failed: 2 },
      { day: "Sat", processed: 38, failed: 1 },
      { day: "Sun", processed: 42, failed: 0 },
    ],
    byType: [
      { type: "PDF", count: 856, color: "hsl(217, 91%, 60%)" },
      { type: "DOCX", count: 391, color: "hsl(271, 91%, 65%)" },
    ],
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Enhanced Header with Gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <Upload className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">Contract Ingestion & Processing</h1>
                <p className="mt-2 text-blue-100">
                  Bulk upload documents with real-time AI extraction and clause analysis
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="shadow-lg">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/dashboard/contracts">
                <Button size="lg" variant="secondary" className="shadow-lg">
                  <FileText className="mr-2 h-4 w-4" />
                  View Contracts
                </Button>
              </Link>
              <Link href="/dashboard/assistant">
                <Button size="lg" variant="secondary" className="shadow-lg">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Ask AI
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm p-3">
              <Brain className="h-5 w-5" />
              <div>
                <p className="text-xs opacity-80">AI Powered</p>
                <p className="font-semibold">GPT-4 Analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm p-3">
              <Zap className="h-5 w-5" />
              <div>
                <p className="text-xs opacity-80">Processing</p>
                <p className="font-semibold">Real-time</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm p-3">
              <Shield className="h-5 w-5" />
              <div>
                <p className="text-xs opacity-80">Security</p>
                <p className="font-semibold">Enterprise Grade</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm p-3">
              <FileText className="h-5 w-5" />
              <div>
                <p className="text-xs opacity-80">Formats</p>
                <p className="font-semibold">PDF, DOCX</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Performance Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-green-950" />
          <CardContent className="relative flex items-center gap-3 p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <div>
              <p className="text-3xl font-bold">99.2%</p>
              <p className="text-xs text-muted-foreground">Extraction Accuracy</p>
              <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="h-3 w-3" />
                <span>+2.1% this month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-blue-950" />
          <CardContent className="relative flex items-center gap-3 p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
              <Clock className="h-7 w-7" />
            </div>
            <div>
              <p className="text-3xl font-bold">14s</p>
              <p className="text-xs text-muted-foreground">Avg. Processing Time</p>
              <Progress value={85} className="mt-2 h-1" />
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-purple-950" />
          <CardContent className="relative flex items-center gap-3 p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
              <Zap className="h-7 w-7" />
            </div>
            <div>
              <p className="text-3xl font-bold">24/7</p>
              <p className="text-xs text-muted-foreground">Real-time Processing</p>
              <Badge variant="secondary" className="mt-2 text-xs">
                <Activity className="mr-1 h-3 w-3" />
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-amber-950" />
          <CardContent className="relative flex items-center gap-3 p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg">
              <FileText className="h-7 w-7" />
            </div>
            <div>
              <p className="text-3xl font-bold">1,247</p>
              <p className="text-xs text-muted-foreground">Documents Processed</p>
              <div className="mt-2 flex items-center gap-1 text-xs text-amber-600">
                <Sparkles className="h-3 w-3" />
                <span>+156 this week</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Processing Pipeline Visualization */}
      <Card className="border-2 transition-all hover:shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Processing Pipeline
              </CardTitle>
              <CardDescription>Automated extraction and analysis workflow</CardDescription>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="h-3 w-3" />
              Powered by GPT-4
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-5 gap-4">
            {[
              { step: 1, title: "Upload", icon: Upload, desc: "PDF/DOCX", color: "blue" },
              { step: 2, title: "Extract", icon: FileText, desc: "Text & Structure", color: "purple" },
              { step: 3, title: "Analyze", icon: Brain, desc: "AI Processing", color: "pink" },
              { step: 4, title: "Classify", icon: Sparkles, desc: "Clause Detection", color: "amber" },
              { step: 5, title: "Complete", icon: CheckCircle2, desc: "Ready to Query", color: "green" },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 text-white shadow-lg mb-3`}>
                    <item.icon className="h-8 w-8" />
                  </div>
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  <Badge variant="outline" className="mt-2 text-xs">Step {item.step}</Badge>
                </div>
                {index < 4 && (
                  <div className="absolute top-8 left-[calc(100%+0.5rem)] w-4 h-0.5 bg-gradient-to-r from-muted-foreground/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upload & Processing */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="transition-all hover:shadow-xl border-2">
          <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                <Upload className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Upload Contracts</CardTitle>
                <CardDescription>Drag and drop PDF files or click to browse. Supports batch uploads.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <UploadZone userId={userId} />
            
            {/* Upload Tips */}
            <div className="mt-6 space-y-2 rounded-lg bg-muted/50 p-4">
              <p className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Pro Tips
              </p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• Upload multiple files at once for batch processing</li>
                <li>• Supported formats: PDF, DOCX (up to 50MB each)</li>
                <li>• Processing typically takes 10-20 seconds per document</li>
                <li>• AI extracts clauses, obligations, dates, and parties automatically</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-xl border-2">
          <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Processing Queue</CardTitle>
                  <CardDescription>Real-time extraction progress tracking</CardDescription>
                </div>
              </div>
              {processingRecords.length > 0 && (
                <Badge variant="secondary" className="gap-1">
                  <Activity className="h-3 w-3 animate-pulse" />
                  {processingRecords.length} in queue
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ProcessingList records={processingRecords} />
          </CardContent>
        </Card>
      </div>

      {/* Processing Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="transition-all hover:shadow-lg border-2">
          <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <CardTitle>Weekly Processing Activity</CardTitle>
            </div>
            <CardDescription>Documents processed per day over the last week</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ChartContainer
              config={{
                processed: {
                  label: "Processed",
                  color: "hsl(142, 76%, 36%)",
                },
                failed: {
                  label: "Failed",
                  color: "hsl(0, 84%, 60%)",
                },
              }}
              className="h-[300px]"
            >
              <BarChart data={processingStats.daily}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="processed" fill="hsl(142, 76%, 36%)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="failed" fill="hsl(0, 84%, 60%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-lg border-2">
          <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              <CardTitle>Document Types Processed</CardTitle>
            </div>
            <CardDescription>Distribution of processed document formats</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ChartContainer
              config={{
                pdf: {
                  label: "PDF",
                  color: "hsl(217, 91%, 60%)",
                },
                docx: {
                  label: "DOCX",
                  color: "hsl(271, 91%, 65%)",
                },
              }}
              className="h-[300px]"
            >
              <RechartsPieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={processingStats.byType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, count }) => `${type}: ${count}`}
                  outerRadius={100}
                  dataKey="count"
                >
                  {processingStats.byType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ChartContainer>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {processingStats.byType.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium">{item.type}</span>
                  </div>
                  <span className="text-sm font-bold">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Features */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <CardContent className="relative p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950 mb-4">
              <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold mb-2">Smart Clause Detection</h3>
            <p className="text-sm text-muted-foreground">
              AI automatically identifies and categorizes contract clauses including termination, liability, and payment terms.
            </p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <CardContent className="relative p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950 mb-4">
              <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold mb-2">Obligation Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Automatically extracts deadlines, renewal dates, and action items with intelligent reminders.
            </p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <CardContent className="relative p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-950 mb-4">
              <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold mb-2">Risk Assessment</h3>
            <p className="text-sm text-muted-foreground">
              Identifies potential risks and unfavorable terms with AI-powered analysis and recommendations.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
