import { AlertCircleIcon, FileTextIcon, XCircleIcon, XIcon } from 'lucide-react'

import { ResultsCards } from '../results-cards'

export type RenderManagementMeiCardsProps = {
  isLoading: boolean
  data: {
    totalClientesAtivos: number
    totalDasVencidos: number
    totalCertificadosVencidos: number
  }
}

export function RenderManagementMeiCards({
  isLoading,
  data,
}: RenderManagementMeiCardsProps) {
  return (
    <div className="grid-cols-1 grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-4">
      <ResultsCards
        title={'Clientes monitorados'}
        icon={<FileTextIcon className="size-5 text-white" />}
        value={data.totalClientesAtivos}
        isLoading={isLoading}
        style={'bg-primary text-primary border-l-primary'}
      />

      <ResultsCards
        title={'DAS MEI Vencidos'}
        icon={<AlertCircleIcon className="size-5 text-white" />}
        value={data.totalDasVencidos}
        isLoading={isLoading}
        style={'bg-secondary-dark text-secondary-dark border-l-secondary-dark'}
      />

      <ResultsCards
        title={'Certificado Vencidos'}
        icon={<XCircleIcon className="size-5 text-white" />}
        value={data.totalCertificadosVencidos}
        isLoading={isLoading}
        style={'bg-info text-info border-l-info'}
      />

      <ResultsCards
        title={'MEIs com o limite atingido'}
        icon={<XIcon className="size-5 text-white" />}
        value={0}
        isLoading={isLoading}
        isComingSoon={true}
        style={
          'bg-muted-foreground text-muted-foreground border-muted-foreground'
        }
      />
    </div>
  )
}
