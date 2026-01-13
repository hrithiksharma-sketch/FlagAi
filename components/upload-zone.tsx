"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Upload, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

interface UploadZoneProps {
  userId: string
}

export function UploadZone({ userId }: UploadZoneProps) {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) => file.type === "application/pdf")

    setFiles((prev) => [...prev, ...droppedFiles])
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter((file) => file.type === "application/pdf")
      setFiles((prev) => [...prev, ...selectedFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setIsUploading(true)
    setError(null)
    const supabase = createClient()

    try {
      for (const file of files) {
        // Create contract record
        const { data: contract, error: contractError } = await supabase
          .from("contracts")
          .insert({
            title: file.name.replace(".pdf", ""),
            document_url: `/documents/${file.name}`,
            user_id: userId,
            status: "pending",
          })
          .select()
          .single()

        if (contractError) throw contractError

        // Create processing record
        const { error: processingError } = await supabase.from("contract_processing").insert({
          contract_id: contract.id,
          user_id: userId,
          status: "pending",
          progress: 0,
          current_step: "Queued for processing",
        })

        if (processingError) throw processingError

        // Simulate AI processing (in production, this would trigger actual AI extraction)
        setTimeout(() => {
          simulateProcessing(contract.id, userId)
        }, 1000)
      }

      setFiles([])
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload contracts")
    } finally {
      setIsUploading(false)
    }
  }

  const simulateProcessing = async (contractId: string, userId: string) => {
    const supabase = createClient()

    // Update to processing
    await supabase
      .from("contract_processing")
      .update({
        status: "processing",
        progress: 25,
        current_step: "Extracting text from PDF",
      })
      .eq("contract_id", contractId)
      .eq("user_id", userId)

    // Simulate extraction steps
    await new Promise((resolve) => setTimeout(resolve, 2000))

    await supabase
      .from("contract_processing")
      .update({
        progress: 50,
        current_step: "Identifying clauses with AI",
      })
      .eq("contract_id", contractId)
      .eq("user_id", userId)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    await supabase
      .from("contract_processing")
      .update({
        progress: 75,
        current_step: "Extracting obligations and dates",
      })
      .eq("contract_id", contractId)
      .eq("user_id", userId)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Complete processing
    await supabase
      .from("contract_processing")
      .update({
        status: "completed",
        progress: 100,
        current_step: "Processing complete",
        completed_at: new Date().toISOString(),
      })
      .eq("contract_id", contractId)
      .eq("user_id", userId)

    // Update contract status
    await supabase.from("contracts").update({ status: "active" }).eq("id", contractId).eq("user_id", userId)
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-all ${
          isDragging
            ? "scale-[1.02] border-primary bg-primary/10"
            : "border-muted-foreground/25 hover:border-muted-foreground/50"
        }`}
      >
        <Upload
          className={`mb-4 h-12 w-12 transition-colors ${isDragging ? "text-primary" : "text-muted-foreground"}`}
        />
        <p className="mb-2 text-sm font-medium">Drag and drop PDF files here</p>
        <p className="mb-4 text-xs text-muted-foreground">or click to browse your computer</p>
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button type="button" variant="secondary" size="sm" asChild>
            <span>Browse files</span>
          </Button>
        </label>
      </div>

      {files.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">
            {files.length} {files.length === 1 ? "file" : "files"} selected
          </p>
          <div className="flex flex-col gap-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border bg-card p-3 shadow-sm transition-shadow hover:shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">{file.name}</span>
                    <span className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button onClick={handleUpload} disabled={isUploading} className="mt-2" size="lg">
            {isUploading ? "Uploading..." : `Upload ${files.length} ${files.length === 1 ? "contract" : "contracts"}`}
          </Button>
        </div>
      )}

      {error && <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
    </div>
  )
}
