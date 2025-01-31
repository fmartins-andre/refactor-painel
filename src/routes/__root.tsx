import { lazy, Suspense } from 'react'
import { RouterContext } from '@/@types/route-context'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

const IS_PROD = process.env.NODE_ENV === 'production'
const TanStackRouterDevtools = IS_PROD
  ? () => null // Render nothing in production
  : lazy(() =>
      import('@tanstack/router-devtools').then((module) => ({
        default: module.TanStackRouterDevtools,
      }))
    )

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools position="bottom-right" />
      </Suspense>
    </>
  )
}
