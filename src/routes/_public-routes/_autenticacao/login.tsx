import { lazy, Suspense } from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'

const AuthHashLogin = lazy(() =>
  import('@/features/auth/hash-auth').then((module) => ({
    default: module.AuthHashLogin,
  }))
)

const AuthLocalLogin = lazy(() =>
  import('@/features/auth/local-auth').then((module) => ({
    default: module.AuthLocalLogin,
  }))
)

export const Route = createFileRoute('/_public-routes/_autenticacao/login')({
  validateSearch: z.object({ hashCode: z.custom<string>().nullish() }),
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { hashCode } = Route.useSearch()

  return (
    <Suspense fallback={<div>carregando...</div>}>
      {hashCode?.length ? (
        <AuthHashLogin hashCode={hashCode} />
      ) : (
        <AuthLocalLogin />
      )}
    </Suspense>
  )
}
