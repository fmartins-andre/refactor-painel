import { lazy, Suspense } from 'react'
import { createFileRoute } from '@tanstack/react-router'

const CustomerList = lazy(() =>
  import('@/features/clientes/listar-clientes').then((module) => ({
    default: module.CustomerList,
  }))
)

export const Route = createFileRoute('/_authenticated-routes/clientes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Suspense fallback={<div>carregando...</div>}>
      <CustomerList />
    </Suspense>
  )
}
