export interface RouterContext {
  auth: {
    isAuthenticated: boolean
    login: (token: string) => Promise<void>
    logout: () => Promise<void>
    token: string | null
  }
}
