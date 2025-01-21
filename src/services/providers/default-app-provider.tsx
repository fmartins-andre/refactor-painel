import { lazy, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'

import { AuthProvider } from './auth-provider'

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
        </QueryClientProvider>
      </TooltipProvider>
      <Toaster />
    </>
  )
}
