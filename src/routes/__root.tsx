import { lazy, Suspense } from 'react'
import { RouterContext } from '@/@types/route-context'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

const TanStackRouterDevtools = lazy(() =>
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
        <TanStackRouterDevtools position="bottom-left" />
      </Suspense>
    </>
  )
}
