import { lazy, PropsWithChildren, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

import { TooltipProvider } from '@/components/ui/tooltip'

import { AuthProvider } from './auth-provider'

const IS_PROD = process.env.NODE_ENV === 'production'

const ReactQueryDevtools = IS_PROD
  ? () => null // Render nothing in production
  : lazy(() =>
      import('@tanstack/react-query-devtools').then((module) => ({
        default: module.ReactQueryDevtools,
      }))
    )

const AsyncConfirmationDialogProvider = lazy(() =>
  import('@/components/async-confirmation-dialog').then((module) => ({
    default: module.AsyncConfirmationDialogProvider,
  }))
)
export function DefaultAppProvider({ children }: PropsWithChildren) {
  const queryClient = new QueryClient()

  return (
    <>
      <TooltipProvider delayDuration={300}>
        <QueryClientProvider client={queryClient}>
          <AsyncConfirmationDialogProvider>
            <AuthProvider>{children}</AuthProvider>
          </AsyncConfirmationDialogProvider>

          <Suspense>
            <ReactQueryDevtools
              initialIsOpen={false}
              position="bottom"
              buttonPosition="bottom-left"
            />
          </Suspense>
        </QueryClientProvider>
      </TooltipProvider>
      <Toaster
        richColors
        position="top-right"
        toastOptions={{
          classNames: {
            title: 'text-base font-semibold',
            description: 'text-base',
          },
        }}
      />
    </>
  )
}
