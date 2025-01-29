import { AuthHashLogin } from '@/features/auth/hash-auth'
import { AuthLocalLogin } from '@/features/auth/local-auth'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_public-routes/_autenticacao/login')(
  {
    component: RouteComponent,
  }
)

function RouteComponent() {
  const { hashCode } = Route.useSearch()

  return (
    <>
      {hashCode?.length ? (
        <AuthHashLogin hashCode={hashCode} />
      ) : (
        <AuthLocalLogin />
      )}
    </>
  )
}
