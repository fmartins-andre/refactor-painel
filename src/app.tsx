import { createRouter, RouterProvider } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'
import { useAuth } from './services/providers/auth-provider'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    auth: undefined!,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function App() {
  const auth = useAuth()

  return (
    <RouterProvider
      router={router}
      context={{
        auth,
      }}
    />
  )
}
