import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_public-routes/_autenticacao/recuperar-senha'
)({
  component: RouteComponent,
})

function RouteComponent() {
  // eslint-disable-next-line react/no-unescaped-entities
  return <div>Hello "/_public-routes/autenticacao/recuperar-senha"!</div>
}
