import * as React from 'react'
import { RouterContext } from '@/@types/route-context'
import sleep from '@/utils/sleep'

import { handleAccountantPanelApiLocalToken } from '../api/accountant-panel-api/http-client/handle-local-token'

export type AuthContext = RouterContext['auth']

const AuthContext = React.createContext<AuthContext | null>(null)

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [token, setToken] = React.useState<string | null>(
    handleAccountantPanelApiLocalToken.get()
  )
  const isAuthenticated = !!token

  const logout = React.useCallback(async () => {
    handleAccountantPanelApiLocalToken.remove()
    setToken(null)
    await sleep(100)
  }, [])

  const login = React.useCallback(async (token: string) => {
    handleAccountantPanelApiLocalToken.set(token)
    setToken(token)
    await sleep(100)
  }, [])

  React.useLayoutEffect(() => {
    setToken(handleAccountantPanelApiLocalToken.get())
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
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
