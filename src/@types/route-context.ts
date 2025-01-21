import { QueryClient } from '@tanstack/react-query'

export interface AuthTokenData {
  emailUsuario: string
  usuarioId: string
  contadorId: string
}

export interface RouterContext {
  queryClient: QueryClient
  auth: {
    isAuthenticated: boolean
    login: (token: string) => Promise<void>
    logout: () => Promise<void>
    token: string | null
    tokenData: AuthTokenData | null
  }
}
