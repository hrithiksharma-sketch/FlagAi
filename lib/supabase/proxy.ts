import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  // Simple pass-through for demo - no auth required
  return NextResponse.next({
    request,
  })
}
