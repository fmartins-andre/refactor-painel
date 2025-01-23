import { CheckIcon, FileIcon, UserIcon, XIcon } from 'lucide-react'

import { ResultsCards } from '../results-cards'

export type RenderInvoicesCardProps = {
  isLoading: boolean
  data?: {
    totalNotas: number
    totalNotasValidadas: number
    totalNotasRejeitadas: number
    totalNotasCanceladas: number
  }
}

export function RenderInvoicesCard({
  isLoading,
  data,
}: RenderInvoicesCardProps) {
  return (
    <div className="flex w-full flex-col gap-4 md:flex-row md:gap-10">
      <ResultsCards
        title="Total de notas"
        icon={<UserIcon className="size-5 text-white" />}
        value={data?.totalNotas ?? 0}
        isLoading={isLoading}
        style="bg-primary text-primary border-l-primary"
      />

      <ResultsCards
        title="Notas validadas"
        icon={<FileIcon className="size-5 text-white" />}
        value={data?.totalNotasValidadas ?? 0}
        isLoading={isLoading}
        style="bg-secondary-dark text-secondary-dark border-l-secondary-dark"
      />

      <ResultsCards
        title="Notas rejeitadas"
        icon={<CheckIcon className="size-5 text-white" />}
        value={data?.totalNotasRejeitadas ?? 0}
        isLoading={isLoading}
        style="bg-info text-info border-l-info"
      />

      <ResultsCards
        title="Notas canceladas"
        icon={<XIcon className="size-5 text-white" />}
        value={data?.totalNotasCanceladas ?? 0}
        isLoading={isLoading}
        style="bg-muted-foreground text-muted-foreground border-muted-foreground"
      />
    </div>
  )
}
