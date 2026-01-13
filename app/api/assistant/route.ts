import { consumeStream, convertToModelMessages, streamText, type UIMessage } from "ai"
import { createClient } from "@/lib/supabase/server"

export const maxDuration = 30

export async function POST(req: Request) {
  const {
    messages,
    userId,
    contractId,
    userRole,
  }: { messages: UIMessage[]; userId: string; contractId?: string; userRole: string } = await req.json()

  const supabase = await createClient()

  // Verify user authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user || user.id !== userId) {
    return new Response("Unauthorized", { status: 401 })
  }

  // Build context from contracts and clauses
  let contextData = ""

  if (contractId) {
    // Get specific contract with clauses
    const { data: contract } = await supabase
      .from("contracts")
      .select("*")
      .eq("id", contractId)
      .eq("user_id", userId)
      .single()

    const { data: clauses } = await supabase.from("clauses").select("*").eq("contract_id", contractId)

    const { data: obligations } = await supabase.from("obligations").select("*").eq("contract_id", contractId)

    if (contract) {
      contextData = `
Contract: ${contract.title}
Party A: ${contract.party_a || "N/A"}
Party B: ${contract.party_b || "N/A"}
Type: ${contract.contract_type || "N/A"}
Effective Date: ${contract.effective_date || "N/A"}
Expiration Date: ${contract.expiration_date || "N/A"}
Status: ${contract.status}
Total Value: ${contract.total_value ? `$${contract.total_value}` : "N/A"}
Jurisdiction: ${contract.jurisdiction || "N/A"}

Extracted Clauses:
${clauses?.map((c) => `- [${c.clause_type}] ${c.title}: ${c.content}`).join("\n") || "No clauses extracted yet"}

Obligations:
${obligations?.map((o) => `- ${o.description} (Due: ${o.due_date || "No date"}, Status: ${o.status}, Priority: ${o.priority})`).join("\n") || "No obligations"}
      `
    }
  } else {
    // Get all contracts summary
    const { data: contracts } = await supabase
      .from("contracts")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "active")

    const { data: allObligations } = await supabase
      .from("obligations")
      .select("*, contracts!inner(title, user_id)")
      .eq("contracts.user_id", userId)
      .eq("status", "pending")

    contextData = `
Active Contracts Summary:
${contracts?.map((c) => `- ${c.title} (${c.party_b}, expires ${c.expiration_date || "unknown"})`).join("\n") || "No active contracts"}

Pending Obligations Across All Contracts:
${allObligations?.map((o) => `- ${o.description} (Due: ${o.due_date || "No date"}, Priority: ${o.priority})`).join("\n") || "No pending obligations"}

Total Active Contracts: ${contracts?.length || 0}
Total Contract Value: $${contracts?.reduce((sum, c) => sum + (Number(c.total_value) || 0), 0).toLocaleString() || 0}
    `
  }

  const systemPrompt = `You are an AI contract assistant helping ${userRole} teams understand their contracts. 

You have access to the following contract data:
${contextData}

Your role is to:
1. Answer questions accurately based on the contract data provided
2. Tailor your responses to the ${userRole} perspective (focus on legal compliance, financial obligations, sales terms, or service requirements accordingly)
3. Cite specific clauses and obligations when answering
4. Highlight risks, deadlines, and important obligations
5. Be concise but thorough
6. If information is not available in the data, clearly state that

Always provide trustworthy, evidence-based answers.`

  const prompt = convertToModelMessages([
    {
      id: "system",
      role: "system",
      parts: [{ type: "text", text: systemPrompt }],
    },
    ...messages,
  ])

  const result = streamText({
    model: "openai/gpt-4o",
    prompt,
    abortSignal: req.signal,
    maxOutputTokens: 2000,
  })

  // Save Q&A to history
  result.then(async (response) => {
    const fullText = await response.text
    const lastUserMessage = messages.findLast((m) => m.role === "user")

    if (lastUserMessage && lastUserMessage.parts[0]?.type === "text") {
      await supabase.from("qa_history").insert({
        contract_id: contractId || null,
        question: lastUserMessage.parts[0].text,
        answer: fullText,
        user_role: userRole,
        user_id: userId,
      })
    }
  })

  return result.toUIMessageStreamResponse({
    consumeSseStream: consumeStream,
  })
}
