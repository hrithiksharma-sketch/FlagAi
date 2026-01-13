"use client"

import type React from "react"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { SendHorizontal, Loader2, FileText, User, Bot, Sparkles, Copy, ThumbsUp, ThumbsDown, RefreshCw, BookOpen } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface Contract {
  id: string
  title: string
  status: string
}

interface AssistantInterfaceProps {
  userId: string
  contracts: Contract[]
}

export function AssistantInterface({ userId, contracts }: AssistantInterfaceProps) {
  const [input, setInput] = useState("")
  const [selectedContract, setSelectedContract] = useState<string>("all")
  const [userRole, setUserRole] = useState<string>("legal")

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/assistant" }),
    body: {
      userId,
      contractId: selectedContract === "all" ? null : selectedContract,
      userRole,
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status !== "ready") return

    sendMessage({ text: input })
    setInput("")
  }

  const suggestedQuestions = [
    "What are the key termination clauses?",
    "When are the renewal dates?",
    "What are my payment obligations?",
    "Show me liability limitations",
    "What are the confidentiality terms?",
    "Are there any penalties or fees?",
  ]

  return (
    <div className="flex flex-1 gap-6 overflow-hidden p-8 pt-6">
      {/* Main Chat Panel */}
      <div className="flex flex-1 flex-col">
        <Card className="flex flex-1 flex-col overflow-hidden shadow-xl border-2">
          <ScrollArea className="flex-1 p-6">
            <div className="flex flex-col gap-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-2xl">
                    <Bot className="h-10 w-10" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold">Ask me anything about your contracts</h3>
                  <p className="mb-8 max-w-md text-sm text-muted-foreground">
                    I can help you understand clauses, obligations, deadlines, and more with evidence-based answers.
                  </p>
                  
                  {/* Suggested Questions */}
                  <div className="w-full max-w-2xl">
                    <p className="mb-4 text-sm font-medium text-muted-foreground">Suggested questions:</p>
                    <div className="grid grid-cols-2 gap-3">
                      {suggestedQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="h-auto justify-start text-left p-4 hover:bg-primary/5 hover:border-primary transition-all"
                          onClick={() => setInput(question)}
                        >
                          <Sparkles className="mr-2 h-4 w-4 shrink-0 text-primary" />
                          <span className="text-sm">{question}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                messages.map((message, messageIndex) => (
                  <div key={message.id} className="flex gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-lg ${
                        message.role === "user"
                          ? "bg-gradient-to-br from-cyan-500 to-teal-600 text-white"
                          : "bg-gradient-to-br from-teal-500 to-cyan-500 text-white"
                      }`}
                    >
                      {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                          {message.role === "user" ? "You" : "AI Assistant"}
                        </span>
                        {message.role === "assistant" && (
                          <Badge variant="secondary" className="gap-1 text-xs">
                            <Sparkles className="h-3 w-3" />
                            AI
                          </Badge>
                        )}
                      </div>
                      <div className="rounded-xl bg-muted/50 p-4">
                        {message.parts.map((part, index) => {
                          if (part.type === "text") {
                            return (
                              <div key={index} className="prose prose-sm max-w-none dark:prose-invert">
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{part.text}</p>
                              </div>
                            )
                          }
                          return null
                        })}
                      </div>
                      {message.role === "assistant" && (
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 gap-1">
                            <Copy className="h-3 w-3" />
                            Copy
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 gap-1">
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 gap-1">
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 gap-1">
                            <RefreshCw className="h-3 w-3" />
                            Regenerate
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}

              {status === "streaming" && (
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-lg">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">AI Assistant</span>
                      <Badge variant="secondary" className="gap-1 text-xs">
                        <Sparkles className="h-3 w-3" />
                        AI
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-muted/50 p-4">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Analyzing your contracts...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <Separator />

          <div className="border-t bg-muted/30 p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex gap-2">
                <Select value={userRole} onValueChange={setUserRole}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="legal">Legal Team</SelectItem>
                    <SelectItem value="finance">Finance Team</SelectItem>
                    <SelectItem value="sales">Sales Team</SelectItem>
                    <SelectItem value="service">Service Team</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedContract} onValueChange={setSelectedContract}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select contract" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        All Contracts
                      </div>
                    </SelectItem>
                    {contracts.map((contract) => (
                      <SelectItem key={contract.id} value={contract.id}>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          {contract.title}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about SLA terms, renewal dates, obligations, or any contract details..."
                  className="min-h-[100px] resize-none"
                  disabled={status !== "ready"}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit(e)
                    }
                  }}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || status !== "ready"}
                  className="h-[100px] w-14 shadow-lg"
                >
                  {status === "streaming" ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <SendHorizontal className="h-5 w-5" />
                  )}
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground">
                Press <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs">Enter</kbd> to send, <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs">Shift + Enter</kbd> for new line
              </p>
            </form>
          </div>
        </Card>
      </div>

      {/* Enhanced Document Viewer Panel */}
      <div className="w-96">
        <Card className="flex h-full flex-col shadow-xl border-2">
          <div className="border-b bg-gradient-to-r from-muted/50 to-transparent p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Document Context</h3>
                <p className="text-xs text-muted-foreground">Evidence & References</p>
              </div>
            </div>
          </div>
          
          <CardContent className="flex flex-1 flex-col items-center justify-center p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-center text-sm font-medium mb-2">Evidence Viewer</p>
            <p className="text-center text-xs text-muted-foreground mb-4">
              When you ask questions, relevant contract sections will be highlighted here with evidence
            </p>
            
            {/* Sample Evidence Cards */}
            <div className="w-full space-y-3">
              <div className="rounded-lg border bg-card p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">Clause 4.2</Badge>
                  <span className="text-xs text-muted-foreground">Termination</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Evidence will appear here when AI references specific contract sections
                </p>
              </div>
              
              <div className="rounded-lg border bg-card p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">Section 7</Badge>
                  <span className="text-xs text-muted-foreground">Payment Terms</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Click to view full context in document
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
