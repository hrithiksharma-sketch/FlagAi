// Demo server client - no Supabase dependency
export async function createClient() {
  return {
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          count: 0,
          data: []
        })
      })
    })
  }
}

// Export createClient as an alias for consistency with imports
export { createClient as createServerClient }
