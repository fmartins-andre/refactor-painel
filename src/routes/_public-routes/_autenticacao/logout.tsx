import { getBrandDetails } from '@/utils/get-brand-details'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

const brand = getBrandDetails()

export const Route = createFileRoute('/_public-routes/_autenticacao/logout')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const logout = Route.useRouteContext({ select: (ctx) => ctx.auth.logout })
  const navigate = Route.useNavigate()

  async function handleLogoutOnClick() {
    await logout()
    navigate({ to: '/login' })
  }

  return (
    <div className="flex w-full h-full flex-col items-center justify-center gap-8">
      <img
        src={brand.logoPath.alternative}
        alt={`${brand.name} logo`}
        width={200}
        height={60}
      />

      <div className="flex flex-col bg-white p-8 rounded-2xl shadow-lg gap-8">
        <span className="text-lg text-center">
          Você está se deslogando do sistema.
          <br /> Tem certeza de que deseja proseguir?
        </span>

        <div className="flex gap-4">
          <Link to="/dashboard">
            <Button variant="secondary">Não! Leve-me de volta.</Button>
          </Link>
          <Button variant="outline" onClick={handleLogoutOnClick}>
            Sim. Quero sair!
          </Button>
        </div>
      </div>
    </div>
  )
}
