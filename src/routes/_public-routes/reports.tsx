import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public-routes/reports')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(public)/reports"!</div>
}
