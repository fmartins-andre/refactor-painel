import { RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function RefreshAllCards() {
  async function handleRefreshAllCards() {
    // TODO: corrigir isso
    // await queryClient.invalidateQueries()
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="default"
            className="bg-primary size-9 rounded-full"
            onClick={handleRefreshAllCards}
          >
            <RefreshCw className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Atualizar todo conteúdo</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
