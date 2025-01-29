import { TabsDashboard } from '@/features/dashboard/tabs-dashboard'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated-routes/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TabsDashboard />
}
