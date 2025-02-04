import { RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function CustomerInvoicesFilterRefreshButton() {
  async function handleRefresh() {
    // await queryClient.invalidateQueries({
    //   queryKey: ['customer-invoices-list'],
    // })
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="tertiary"
            size="icon"
            type="button"
            className="h-12 items-center justify-center text-muted-foreground"
            onClick={handleRefresh}
          >
            <RefreshCw className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Atualizar listagem</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
