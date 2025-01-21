export interface AuthTokenData {
  emailUsuario: string
  usuarioId: string
  contadorId: string
}

export interface RouterContext {
  auth: {
    isAuthenticated: boolean
    login: (token: string) => Promise<void>
    logout: () => Promise<void>
    token: string | null
    tokenData: AuthTokenData | null
  }
}
