import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_public-routes/_autenticacao/logout')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
})
