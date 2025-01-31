import { useVisaoGeralCardTotalizacao } from '@/services/api/accountant-panel-api/endpoints/visao-geral'

import { TabsContent } from '@/components/ui/tabs'

import { CardDasMeiExpiring } from './card-das-mei-expiring'
import { CardExpiringCertificates } from './card-expiring-certificates'
import { RenderManagementMeiCards } from './render-management-mei-cards'

export function ManagementMeiContent() {
  const { data: cardTotalizcaoData, isFetching: isFetchingCardTotalizacao } =
    useVisaoGeralCardTotalizacao()

  return (
    <TabsContent className="mt-0" value="mei">
      <div className="flex flex-col gap-8">
        <RenderManagementMeiCards
          isLoading={isFetchingCardTotalizacao}
          data={{
            totalCertificadosVencidos:
              cardTotalizcaoData?.totalCertificadosVencidos ?? 0,
            totalClientesAtivos: cardTotalizcaoData?.totalClientesAtivos ?? 0,
            totalDasVencidos: cardTotalizcaoData?.totalDasVencidos ?? 0,
          }}
        />
        <div className="flex w-full flex-col items-start gap-8 md:flex-row">
          <CardExpiringCertificates />
          <CardDasMeiExpiring />
        </div>
      </div>
    </TabsContent>
  )
}
