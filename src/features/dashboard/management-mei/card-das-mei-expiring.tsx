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
import { useGetExpiringDasMei } from '../hooks/use-get-das-mei-expiring'
import { DasMeiExpiringList } from './das-mei-expiring-list'
import { useDashboard } from './hooks/use-dashboard'

const selectOPtions = [
  { label: 'A Vencer', value: 'A Vencer' },
  { label: 'Vencido', value: 'Vencido' },
]

export function CardDasMeiExpiring() {
  const { filterDasMeiFromStatus, handleSetFilterDasMeiFromStatus } =
    useDashboard()

  const { data, isLoading, isFetching, dataUpdatedAt } = useGetExpiringDasMei(
    filterDasMeiFromStatus
  )

  async function handleRefreshCache() {
    // await queryClient.invalidateQueries({
    //   queryKey: ['total-expiring-das-mei', filterDasMeiFromStatus],
    // })
  }

  async function handleSetStatus(status: string) {
    handleSetFilterDasMeiFromStatus(status)
    // await queryClient.invalidateQueries({
    //   queryKey: ['total-expiring-das-mei', status],
    // })
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
