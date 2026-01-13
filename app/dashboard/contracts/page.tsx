"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Calendar, Building2, Search, Filter, Download, Eye, Edit, Trash2, DollarSign, Clock, AlertCircle, TrendingUp, BarChart3, Grid3x3, List, ArrowLeft, Sparkles, Upload, PieChart, Brain, Zap, Shield, CheckCircle2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { UploadZone } from "@/components/upload-zone"
import { ProcessingList } from "@/components/processing-list"

interface Contract {
  id: string
  title: string
  contract_type: string
  status: string
  party_b: string
  expiration_date: string
  total_value: number | null
  created_at: string
}

function getContracts(): Contract[] {
  return [
    {
      id: "1",
      title: "Master Service Agreement - TechCorp Inc.",
      contract_type: "Service Agreement",
      status: "active",
      party_b: "TechCorp Inc.",
      expiration_date: "2026-12-31",
      total_value: 250000,
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Software License Agreement - DataSoft",
      contract_type: "License",
      status: "active",
      party_b: "DataSoft Solutions",
      expiration_date: "2026-06-30",
      total_value: 180000,
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Consulting Services Contract - Acme Corp",
      contract_type: "Consulting",
      status: "active",
      party_b: "Acme Corporation",
      expiration_date: "2026-03-15",
      total_value: 95000,
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      title: "Non-Disclosure Agreement - SecureTech",
      contract_type: "NDA",
      status: "active",
      party_b: "SecureTech Ltd.",
      expiration_date: "2027-01-01",
      total_value: null,
      created_at: new Date().toISOString(),
    },
    {
      id: "5",
      title: "Equipment Lease Agreement",
      contract_type: "Lease",
      status: "active",
      party_b: "EquipRent Services",
      expiration_date: "2026-02-28",
      total_value: 48000,
      created_at: new Date().toISOString(),
    },
    {
      id: "6",
      title: "Partnership Agreement - InnovateLabs",
      contract_type: "Partnership",
      status: "active",
      party_b: "InnovateLabs LLC",
      expiration_date: "2028-12-31",
      total_value: 500000,
      created_at: new Date().toISOString(),
    },
  ]
}

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [filteredContracts, setFilteredContracts] = useState<Contract[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
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

  useEffect(() => {
    setMounted(true)
    const data = getContracts()
    setContracts(data)
    setFilteredContracts(data)
  }, [])

  useEffect(() => {
    let filtered = contracts

    if (searchQuery) {
      filtered = filtered.filter(
        (contract) =>
          contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contract.party_b.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((contract) => contract.status === statusFilter)
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((contract) => contract.contract_type === typeFilter)
    }

    setFilteredContracts(filtered)
  }, [searchQuery, statusFilter, typeFilter, contracts])

  if (!mounted) {
    return null
  }

  const totalValue = contracts.reduce((sum, c) => sum + (c.total_value || 0), 0)
  const activeCount = contracts.filter((c) => c.status === "active").length
  const expiringCount = contracts.filter((c) => {
    const daysUntilExpiry = Math.floor(
      (new Date(c.expiration_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    )
    return daysUntilExpiry <= 90 && daysUntilExpiry > 0
  }).length

  const contractTypes = Array.from(new Set(contracts.map((c) => c.contract_type)))

  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Enhanced Header with Gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 via-cyan-600 to-teal-700 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <FileText className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">Contract Management</h1>
                <p className="mt-2 text-cyan-100">Upload, process, and manage all your contracts with AI-powered analysis</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="shadow-lg">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/dashboard/assistant">
                <Button size="lg" variant="secondary" className="shadow-lg">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Ask AI
                </Button>
              </Link>
              <Button size="lg" variant="secondary" className="shadow-lg">
                <Download className="mr-2 h-4 w-4" />
                Export All
              </Button>
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

          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-4 gap-4">
            <div className="rounded-lg bg-white/10 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5" />
                <span className="text-sm opacity-80">Total Contracts</span>
              </div>
              <p className="text-3xl font-bold">{contracts.length}</p>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm opacity-80">Active</span>
              </div>
              <p className="text-3xl font-bold">{activeCount}</p>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm opacity-80">Expiring Soon</span>
              </div>
              <p className="text-3xl font-bold">{expiringCount}</p>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5" />
                <span className="text-sm opacity-80">Total Value</span>
              </div>
              <p className="text-3xl font-bold">${(totalValue / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for Upload, Processing, and Contracts */}
      <Tabs defaultValue="contracts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="space-y-6">
          <Card className="shadow-lg border-2">
            <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
              <div className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                <CardTitle>Upload Contracts</CardTitle>
              </div>
              <CardDescription>Upload PDF contracts for AI-powered analysis and extraction</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <UploadZone userId={userId} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="processing" className="space-y-6">
          <Card className="shadow-lg border-2">
            <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <CardTitle>Processing Status</CardTitle>
              </div>
              <CardDescription>Track the progress of your contract analysis</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ProcessingList records={processingRecords} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contracts" className="space-y-6">
          {/* Filters and Search */}
          <Card className="shadow-lg border-2">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[300px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search contracts by title or party..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[200px]">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {contractTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex gap-2 border-l pl-4">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {(searchQuery || statusFilter !== "all" || typeFilter !== "all") && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Showing {filteredContracts.length} of {contracts.length} contracts
                  </span>
                  {(searchQuery || statusFilter !== "all" || typeFilter !== "all") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("")
                        setStatusFilter("all")
                        setTypeFilter("all")
                      }}
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analytics Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="transition-all hover:shadow-lg border-2">
              <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
                <div className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  <CardTitle>Contract Distribution by Type</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ChartContainer
                  config={{
                    value: {
                      label: "Contracts",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <RechartsPieChart>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Pie
                      data={contractTypes.map((type, index) => ({
                        name: type,
                        value: contracts.filter(c => c.contract_type === type).length,
                        fill: [
                          "hsl(180, 70%, 50%)",
                          "hsl(271, 91%, 65%)",
                          "hsl(142, 76%, 36%)",
                          "hsl(38, 92%, 50%)",
                          "hsl(330, 81%, 60%)",
                          "hsl(199, 89%, 48%)"
                        ][index % 6]
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      dataKey="value"
                    />
                  </RechartsPieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-lg border-2">
              <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <CardTitle>Contract Value by Type</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ChartContainer
                  config={{
                    value: {
                      label: "Total Value",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <BarChart
                    data={contractTypes.map(type => ({
                      type,
                      value: contracts
                        .filter(c => c.contract_type === type)
                        .reduce((sum, c) => sum + (c.total_value || 0), 0)
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      dataKey="type"
                      className="text-xs"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis
                      className="text-xs"
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Value"]}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {contractTypes.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={[
                            "hsl(180, 70%, 50%)",
                            "hsl(271, 91%, 65%)",
                            "hsl(142, 76%, 36%)",
                            "hsl(38, 92%, 50%)",
                            "hsl(330, 81%, 60%)",
                            "hsl(199, 89%, 48%)"
                          ][index % 6]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Contracts Display */}
          {filteredContracts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {contracts.length === 0
                    ? "No contracts yet. Upload contracts to get started."
                    : "No contracts match your filters."}
                </p>
              </CardContent>
            </Card>
          ) : viewMode === "grid" ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredContracts.map((contract) => {
                const daysUntilExpiry = Math.floor(
                  (new Date(contract.expiration_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                )
                const isExpiringSoon = daysUntilExpiry <= 90 && daysUntilExpiry > 0

                return (
                  <Card
                    key={contract.id}
                    className="group relative overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02] border-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <CardHeader className="relative">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg">
                          <FileText className="h-6 w-6" />
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
                      <CardTitle className="text-base leading-tight">{contract.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {contract.contract_type}
                        </Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative flex flex-col gap-3">
                      {contract.party_b && (
                        <div className="flex items-center gap-2 text-sm">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{contract.party_b}</span>
                        </div>
                      )}
                      {contract.expiration_date && (
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Expires: {new Date(contract.expiration_date).toLocaleDateString()}
                          </span>
                          {isExpiringSoon && (
                            <Badge variant="destructive" className="text-xs ml-auto">
                              {daysUntilExpiry}d left
                            </Badge>
                          )}
                        </div>
                      )}
                      {contract.total_value && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-bold text-green-600">
                            ${Number(contract.total_value).toLocaleString()}
                          </span>
                        </div>
                      )}

                      {isExpiringSoon && (
                        <div className="mt-2">
                          <Progress value={((90 - daysUntilExpiry) / 90) * 100} className="h-1" />
                        </div>
                      )}

                      <div className="mt-4 flex gap-2 border-t pt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="mr-1 h-3 w-3" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="shadow-lg border-2">
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredContracts.map((contract) => {
                    const daysUntilExpiry = Math.floor(
                      (new Date(contract.expiration_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                    )
                    const isExpiringSoon = daysUntilExpiry <= 90 && daysUntilExpiry > 0

                    return (
                      <div
                        key={contract.id}
                        className="group flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg">
                          <FileText className="h-6 w-6" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold truncate">{contract.title}</h3>
                            <Badge variant="outline" className="text-xs shrink-0">
                              {contract.contract_type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {contract.party_b}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(contract.expiration_date).toLocaleDateString()}
                            </span>
                            {contract.total_value && (
                              <span className="flex items-center gap-1 text-green-600 font-medium">
                                <DollarSign className="h-3 w-3" />
                                ${Number(contract.total_value).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {isExpiringSoon && (
                            <Badge variant="destructive" className="text-xs">
                              <Clock className="mr-1 h-3 w-3" />
                              {daysUntilExpiry}d left
                            </Badge>
                          )}
                          <Badge
                            variant={
                              contract.status === "active"
                                ? "default"
                                : contract.status === "expired"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {contract.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-1 h-3 w-3" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="mr-1 h-3 w-3" />
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}