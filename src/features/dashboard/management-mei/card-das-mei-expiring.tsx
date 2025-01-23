import { GenericOptionField } from '@/@types/options-field'
import {
  StatusListaDasMeiVisaoGeralModelEnum,
  useVisaoGeralDasListar,
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
import { DasMeiExpiringList } from './das-mei-expiring-list'
import { useDashboard } from './hooks/use-dashboard'

const selectOPtions: GenericOptionField<StatusListaDasMeiVisaoGeralModelEnum>[] =
  [
    {
      label: 'A Vencer',
      value: StatusListaDasMeiVisaoGeralModelEnum.PROXIMO_VENCIMENTO,
    },
    { label: 'Vencido', value: StatusListaDasMeiVisaoGeralModelEnum.VENCIDO },
  ]

export function CardDasMeiExpiring() {
  const { filterDasMeiFromStatus, handleSetFilterDasMeiFromStatus } =
    useDashboard()

  const { data, isLoading, isFetching, dataUpdatedAt, refetch } =
    useVisaoGeralDasListar({ status: filterDasMeiFromStatus })

  async function handleRefreshCache() {
    await refetch()
  }

  async function handleSetStatus(status: StatusListaDasMeiVisaoGeralModelEnum) {
    handleSetFilterDasMeiFromStatus(status)
  }

  const SearchComponent = () => {
    return (
      <Select onValueChange={handleSetStatus} value={filterDasMeiFromStatus}>
        <SelectTrigger className={'h-10 w-40'}>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="max-h-52">
            {selectOPtions.map((item, index) => {
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
        title="DAS MEI"
        tooltipText="Informações sobre os DAS MEI"
        refetch={handleRefreshCache}
        updatedAt={dataUpdatedAt}
        icon={<Icons.overview className="size-5" />}
        searchComponent={<SearchComponent />}
      />
      <CardContent className="min-h-[380px]">
        <DasMeiExpiringList isLoading={isLoading || isFetching} data={data} />
      </CardContent>
    </Card>
  )
}
