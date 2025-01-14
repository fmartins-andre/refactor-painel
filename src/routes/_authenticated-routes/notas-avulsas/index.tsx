import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated-routes/notas-avulsas/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated-routes/notas-avulsas/"!</div>
}
