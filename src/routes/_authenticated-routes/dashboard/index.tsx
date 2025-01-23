import { lazy, Suspense } from 'react'
import {
  StatusListaCertificadosVisaoGeralModelEnum,
  StatusListaDasMeiVisaoGeralModelEnum,
  visaoGeralCardTotalizacaoClientOptions,
  visaoGeralCertificadosListarClientOptions,
  visaoGeralDasListarClientOptions,
} from '@/services/api/accountant-panel-api/endpoints/visao-geral'
import { createFileRoute } from '@tanstack/react-router'

const TabsDashboard = lazy(() =>
  import('@/features/dashboard/tabs-dashboard').then((module) => ({
    default: module.TabsDashboard,
  }))
)

export const Route = createFileRoute('/_authenticated-routes/dashboard/')({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(
      visaoGeralCardTotalizacaoClientOptions()
    )
    context.queryClient.ensureQueryData(
      visaoGeralCertificadosListarClientOptions({
        status: StatusListaCertificadosVisaoGeralModelEnum.VENCIDO,
      })
    )
    context.queryClient.ensureQueryData(
      visaoGeralDasListarClientOptions({
        status: StatusListaDasMeiVisaoGeralModelEnum.PROXIMO_VENCIMENTO,
      })
    )
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Suspense fallback={<div>carregando...</div>}>
      <TabsDashboard />
    </Suspense>
  )
}
