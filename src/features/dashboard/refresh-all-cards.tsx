import {
  visaoGeralCardTotalizacaoClientOptions,
  visaoGeralCertificadosListarClientOptions,
  visaoGeralDasListarClientOptions,
} from '@/services/api/accountant-panel-api/endpoints/visao-geral'
import { useQueryClient } from '@tanstack/react-query'
import { RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function RefreshAllCards() {
  const queryClient = useQueryClient()

  async function handleRefreshAllCards() {
    queryClient.invalidateQueries({
      queryKey: visaoGeralCardTotalizacaoClientOptions().queryKey,
    })

    queryClient.invalidateQueries({
      queryKey: visaoGeralCertificadosListarClientOptions({}).queryKey,
    })

    queryClient.invalidateQueries({
      queryKey: visaoGeralDasListarClientOptions({}).queryKey,
    })
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
