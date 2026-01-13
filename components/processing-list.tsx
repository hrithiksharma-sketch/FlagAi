"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, Loader2, AlertCircle, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface ProcessingRecord {
  id: string
  contract_id: string
  status: string
  progress: number
  current_step: string | null
  error_message: string | null
  started_at: string
  contracts: {
    title: string
  } | null
}

interface ProcessingListProps {
  records: ProcessingRecord[]
}

export function ProcessingList({ records: initialRecords }: ProcessingListProps) {
  const [records, setRecords] = useState(initialRecords)
  const router = useRouter()

  useEffect(() => {
    // Poll for updates every 3 seconds if there are active processing records
    const hasActiveProcessing = records.some((r) => r.status === "processing" || r.status === "pending")

    if (hasActiveProcessing) {
      const interval = setInterval(() => {
        router.refresh()
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [records, router])

  useEffect(() => {
    setRecords(initialRecords)
  }, [initialRecords])

  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Clock className="mb-3 h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">No processing activity yet</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {records.map((record) => {
        const StatusIcon =
          record.status === "completed"
            ? CheckCircle2
            : record.status === "failed"
              ? AlertCircle
              : record.status === "processing"
                ? Loader2
                : Clock

        return (
          <div key={record.id} className="flex flex-col gap-2 rounded-lg border bg-card p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <StatusIcon
                  className={`h-5 w-5 ${
                    record.status === "completed"
                      ? "text-green-500"
                      : record.status === "failed"
                        ? "text-destructive"
                        : record.status === "processing"
                          ? "animate-spin text-primary"
                          : "text-muted-foreground"
                  }`}
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium leading-tight text-pretty">{record.contracts?.title}</p>
                  <p className="text-xs text-muted-foreground">{record.current_step || "Initializing..."}</p>
                </div>
              </div>
              <Badge
                variant={
                  record.status === "completed"
                    ? "default"
                    : record.status === "failed"
                      ? "destructive"
                      : record.status === "processing"
                        ? "secondary"
                        : "outline"
                }
              >
                {record.status}
              </Badge>
            </div>

            {(record.status === "processing" || record.status === "pending") && (
              <div className="mt-2">
                <Progress value={record.progress} className="h-2" />
                <p className="mt-1 text-xs text-muted-foreground">{record.progress}% complete</p>
              </div>
            )}

            {record.error_message && <p className="text-xs text-destructive">{record.error_message}</p>}
          </div>
        )
      })}
    </div>
  )
}
