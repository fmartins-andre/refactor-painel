import { ReactNode } from 'react'
import { Info } from 'lucide-react'

import { CardHeader, CardTitle } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface Props {
  title: string
  icon: ReactNode
  tooltipText: string
  updatedAt?: number
  refetch?: () => void
  children?: ReactNode
  searchComponent?: ReactNode
}

export function DashboardCardHeader({
  title,
  icon,
  tooltipText,
  updatedAt,
  children,
  searchComponent,
}: Props) {
  return (
    <CardHeader>
      <CardTitle className="flex flex-col items-center justify-between gap-4 py-2 md:flex-row md:gap-2">
        <div className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="text-primary/60 size-3" />
              </TooltipTrigger>
              <TooltipContent>{tooltipText}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray500 text-xs font-light">
            {formatUpdatedAtDashboard(updatedAt)}
          </span>
          {searchComponent && <>{searchComponent}</>}
        </div>
      </CardTitle>
      <>{children && <>{children}</>}</>
    </CardHeader>
  )
}

function formatUpdatedAtDashboard(updatedAt?: number) {
  return updatedAt
    ? `Atualizado em ${new Date(updatedAt).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}`
    : ''
}
