import { dasMeiListarClientOptions } from '@/services/api/accountant-panel-api/endpoints/das-mei'
import { TooltipArrow } from '@radix-ui/react-tooltip'
import { useQueryClient } from '@tanstack/react-query'
import { RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { useHandleDasMeiListarFilters } from '../helpers/use-handle-das-mei-listar-filter-params.hook'

export function DasMeiListarRefreshButton() {
  const queryClient = useQueryClient()

  const { filters } = useHandleDasMeiListarFilters()

  function handleRefreshList() {
    // apaga o cache para forçar o isLoading
    queryClient.resetQueries({
      queryKey: dasMeiListarClientOptions(filters).queryKey,
    })
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="tertiary" size="icon" onClick={handleRefreshList}>
            <RefreshCw className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <TooltipArrow className="fill-primary" />
          <span>Atualizar listagem</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
