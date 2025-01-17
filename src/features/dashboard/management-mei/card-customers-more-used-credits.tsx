import { useState } from 'react'
import type { DateRange } from 'react-day-picker'

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CalendarDateRangePickerNoForm } from '@/components/date-picker/calendar-date-picker-range-noform'
import { Icons } from '@/components/images/icons'

import { DashboardCardHeader } from '../dashboard-card-header'
import { useGetCustomersMoreUsingCredit } from '../hooks/use-get-customers-more-used-credit'
import { CustomersMoreUsingCredit } from '../tables/customers-more-using-credit'

export function CardCustomersMoreUsedCredits() {
  const [searchFilter, setSearchFilter] = useState('')

  const currentDate = new Date()
  const [initialDateFilter, setInitialDateFilter] = useState(
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  )
  const [finallyDateFilter, setFinallyDateFilter] = useState(currentDate)

  const handleSearchFilterChange = (event: any) => {
    setSearchFilter(event.target.value)
  }

  const handleDateFilterChange = (newDate: DateRange) => {
    if (newDate?.from) {
      setInitialDateFilter(newDate.from)
    } else {
      setInitialDateFilter(new Date(0))
    }

    if (newDate?.to) {
      setFinallyDateFilter(newDate.to)
    } else {
      setFinallyDateFilter(currentDate)
    }
  }

  const { data, isLoading, isFetching, dataUpdatedAt } =
    useGetCustomersMoreUsingCredit({
      searchFilter,
      initialDateFilter,
      finallyDateFilter,
    })

  async function handleRefreshCache() {
    // await queryClient.invalidateQueries({
    //   queryKey: ['more-using-credit'],
    // })
  }

  const SearchDateComponent = () => {
    return (
      <CalendarDateRangePickerNoForm
        initialDate={initialDateFilter}
        selectDate={finallyDateFilter}
        onDateChange={handleDateFilterChange}
      />
    )
  }

  return (
    <Card className="mb-10 size-full">
      <DashboardCardHeader
        title="Clientes que Mais Utilizaram os Créditos da Assinatura"
        tooltipText="Este painel exibe o número de notas fiscais que cada cliente utilizou dentro do período da sua assinatura."
        refetch={handleRefreshCache}
        updatedAt={dataUpdatedAt}
        icon={<Icons.overview className="size-5" />}
        searchComponent={<SearchDateComponent />}
      />
      <CardContent>
        <div className="flex flex-col gap-1 py-2">
          <Label>Buscar:</Label>
          <Input
            placeholder={`Pesquisar cliente pelo nome ou documento..`}
            onChange={handleSearchFilterChange}
            width="full"
          />
        </div>

        <CustomersMoreUsingCredit
          isLoading={isLoading || isFetching}
          data={data}
        />
      </CardContent>
    </Card>
  )
}
