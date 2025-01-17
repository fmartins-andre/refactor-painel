import { AlertCircle, FileText, X, XCircle } from 'lucide-react'

import { useGetManagerMeiCards } from '../../hooks/use-get-manager-mei-cards'
import { ResultsCardsProps } from '../../results-cards'

export function useResultsCardsMeiConfig() {
  const { data, isLoading, isFetching } = useGetManagerMeiCards()

  const resultsManagementMeiCard: ResultsCardsProps[] = [
    {
      title: 'Clientes monitorados',
      icon: <FileText className="size-5 text-white" />,
      value: Array.isArray(data?.totalCustomers)
        ? data?.totalCustomers?.reduce((acc, item) => acc + item.total, 0)
        : 0,
      isLoading: isLoading || isFetching,
      style: 'bg-primary text-primary border-l-primary',
    },
    {
      title: 'DAS MEI Vencidos',
      icon: <AlertCircle className="size-5 text-white" />,
      value: Array.isArray(data?.dueDasMeiData)
        ? data?.dueDasMeiData?.data?.filter(
            (item) => item.situacao === 'Vencido'
          ).length
        : 0,
      isLoading: isLoading || isFetching,
      style: 'bg-secondary-dark text-secondary-dark border-l-secondary-dark',
    },
    {
      title: 'Certificado Vencidos',
      icon: <XCircle className="size-5 text-white" />,
      value: data?.expiringCertificates?.total || 0,
      isLoading: isLoading || isFetching,
      style: 'bg-info text-info border-l-info',
    },
    {
      title: 'MEIs com o limite atingido',
      icon: <X className="size-5 text-white" />,
      value: 0,
      isLoading: isLoading || isFetching,
      isComingSoon: true,
      style:
        'bg-muted-foreground text-muted-foreground border-muted-foreground',
    },
  ]

  return {
    resultsManagementMeiCard,
  }
}
