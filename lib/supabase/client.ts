// Demo client - no Supabase dependency
export function createClient() {
  return {
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null })
    }
  }
}
