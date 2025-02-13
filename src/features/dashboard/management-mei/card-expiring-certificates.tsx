import { GenericOptionField } from '@/@types/options-field'
import {
  StatusListaCertificadosVisaoGeralModelEnum,
  useVisaoGeralCertificadosListar,
} from '@/services/api/accountant-panel-api/endpoints/visao-geral'

import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Icons } from '@/components/images/icons'

import { DashboardCardHeader } from '../dashboard-card-header'
import { ExpiringCertificatesList } from './expiring-certificates-list'
import { useDashboard } from './hooks/use-dashboard'

export function CardExpiringCertificates() {
  const { filterCertificateFromStatus, handleSetFilterCertificateFromStatus } =
    useDashboard()

  const { data, isLoading, isFetching, dataUpdatedAt, refetch } =
    useVisaoGeralCertificadosListar({ status: filterCertificateFromStatus })

  const selectOptions: GenericOptionField<StatusListaCertificadosVisaoGeralModelEnum>[] =
    [
      {
        label: 'A Vencer',
        value: StatusListaCertificadosVisaoGeralModelEnum.PROXIMO_VENCIMENTO,
      },
      {
        label: 'Vencido',
        value: StatusListaCertificadosVisaoGeralModelEnum.VENCIDO,
      },
    ]

  async function handleRefreshCache() {
    await refetch()
  }

  async function handleSetStatus(
    status: StatusListaCertificadosVisaoGeralModelEnum
  ) {
    handleSetFilterCertificateFromStatus(status)
  }

  const SearchComponent = () => {
    return (
      <Select
        onValueChange={handleSetStatus}
        value={filterCertificateFromStatus}
      >
        <SelectTrigger className={'h-10 w-40'}>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="max-h-52">
            {selectOptions.map((item, index) => {
              return (
                <SelectItem key={index} value={String(item.value)}>
                  {item.label}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  }

  return (
    <Card className="size-full">
      <DashboardCardHeader
        title="Certificados a vencer"
        tooltipText="Neste card você acompanha o quantitativo anual de notas fiscais emitidas, categorizadas por tipo."
        refetch={handleRefreshCache}
        updatedAt={dataUpdatedAt}
        icon={<Icons.overview className="size-5" />}
        searchComponent={<SearchComponent />}
      />
      <CardContent className="min-h-[380px]">
        <ExpiringCertificatesList
          data={data}
          isLoading={isLoading || isFetching}
        />
      </CardContent>
    </Card>
  )
}
