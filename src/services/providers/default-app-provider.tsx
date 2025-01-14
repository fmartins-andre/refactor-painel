import { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AsyncConfirmationDialogProvider } from '@/components/async-confirmation-dialog'

export function DefaultAppProvider({ children }: PropsWithChildren) {
  const queryClient = new QueryClient()

  return (
    <>
      <TooltipProvider delayDuration={300}>
        <AsyncConfirmationDialogProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </AsyncConfirmationDialogProvider>
      </TooltipProvider>
      <Toaster />
    </>
  )
}
