import { TabsDashboard } from '@/features/dashboard/tabs-dashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated-routes/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TabsDashboard />
}
