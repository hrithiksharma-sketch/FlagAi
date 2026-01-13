"use client"

// Demo authentication system
export interface DemoUser {
  id: string
  email: string
  name: string
}

const DEMO_USER: DemoUser = {
  id: "demo-user-123",
  email: "demo@example.com", 
  name: "Demo User"
}

export function getDemoUser(): DemoUser | null {
  if (typeof window === 'undefined') return DEMO_USER
  return localStorage.getItem('demo-auth') ? DEMO_USER : null
}

export function signInDemo(): DemoUser {
  if (typeof window !== 'undefined') {
    localStorage.setItem('demo-auth', 'true')
  }
  return DEMO_USER
}

export function signOutDemo(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('demo-auth')
  }
}