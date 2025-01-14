import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated-routes/clientes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated-routes/clientes/"!</div>
}
