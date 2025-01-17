import { lazy, Suspense } from 'react'
import { createFileRoute } from '@tanstack/react-router'

const TabsDashboard = lazy(() =>
  import('@/features/dashboard/tabs-dashboard').then((module) => ({
    default: module.TabsDashboard,
  }))
)

export const Route = createFileRoute('/_authenticated-routes/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Suspense fallback={<div>carregando...</div>}>
      <TabsDashboard />
    </Suspense>
  )
}
