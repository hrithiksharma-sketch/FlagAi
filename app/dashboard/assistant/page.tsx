import { createClient } from "@/lib/supabase/server"
import { AssistantInterface } from "@/components/assistant-interface"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Brain, MessageSquare, FileSearch, Zap, Shield, FileText, Upload, ArrowLeft } from "lucide-react"
import Link from "next/link"

async function getContracts(userId: string) {
  const supabase = await createClient()

  const { data: contracts } = await supabase
    .from("contracts")
    .select("id, title, status")
    .eq("user_id", userId)
    .eq("status", "active")
    .order("title", { ascending: true })

  return contracts || []
}

export default async function AssistantPage() {
  const supabase = await createClient()

  const { data } = await supabase.auth.getUser()
  const userId = data?.user?.id || "demo-user"

  // Demo contracts if no user
  const contracts = data?.user
    ? await getContracts(userId)
    : [
        { id: "1", title: "Master Service Agreement - TechCorp Inc.", status: "active" },
        { id: "2", title: "Software License Agreement - DataSoft", status: "active" },
        { id: "3", title: "Consulting Services Contract - Acme Corp", status: "active" },
        { id: "4", title: "Non-Disclosure Agreement - SecureTech", status: "active" },
        { id: "5", title: "Equipment Lease Agreement", status: "active" },
        { id: "6", title: "Partnership Agreement - InnovateLabs", status: "active" },
      ]

  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Enhanced Header with Gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 via-cyan-600 to-teal-700 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <Sparkles className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">AI Contract Assistant</h1>
                <p className="mt-2 text-cyan-100">
                  Ask questions about your contracts and get instant answers with evidence
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
              <Link href="/dashboard/ingestion">
                <Button size="lg" variant="secondary" className="shadow-lg">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
              </Link>
            </div>
          </div>

          {/* Capability Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { icon: MessageSquare, text: "Natural Language Q&A" },
              { icon: FileSearch, text: "Evidence-Based Answers" },
              { icon: Zap, text: "Instant Response" },
              { icon: Shield, text: "Secure & Private" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm px-3 py-1.5 text-sm"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assistant Interface */}
      <Card className="transition-all hover:shadow-lg border-2">
        <CardContent className="p-0">
          <AssistantInterface userId={userId} contracts={contracts} />
        </CardContent>
      </Card>
    </div>
  )
}
