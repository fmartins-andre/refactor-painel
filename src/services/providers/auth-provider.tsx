import * as React from 'react'
import { RouterContext } from '@/@types/route-context'
import sleep from '@/utils/sleep'
import { useQueryClient } from '@tanstack/react-query'

import {
  AuthTokenAndData,
  handleAccountantPanelApiLocalToken,
} from '../api/accountant-panel-api/http-client/handle-local-token'

export type AuthContext = RouterContext['auth']

const AuthContext = React.createContext<AuthContext | null>(null)

export function AuthProvider({ children }: React.PropsWithChildren) {
  const queryClient = useQueryClient()

  const [data, setData] = React.useState<AuthTokenAndData | null>(
    handleAccountantPanelApiLocalToken.get()
  )
  const isAuthenticated = !!data

  const logout: AuthContext['logout'] = React.useCallback(async () => {
    handleAccountantPanelApiLocalToken.remove()
    setData(null)
    await sleep(100)
    await queryClient.cancelQueries()
    queryClient.clear()
  }, [queryClient])

  const login: AuthContext['login'] = React.useCallback(
    async (token: string) => {
      const data = handleAccountantPanelApiLocalToken.set(token)
      setData(data)
      await sleep(100)
    },
    []
  )

  React.useLayoutEffect(() => {
    setData(handleAccountantPanelApiLocalToken.get())
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token: data?.token ?? null,
        tokenData: data?.tokenData ?? null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
