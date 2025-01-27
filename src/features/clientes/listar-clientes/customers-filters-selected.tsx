import { parseISO } from 'date-fns'
import { XCircle } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { DataTableAppliedFilters } from '@/components/data-table'

import { REGIME_OPTIONS } from './constants/customer-regime-options'
import { SearchCustomers } from './validations/search-customers'

type Props = {
  filters: DataTableAppliedFilters<SearchCustomers>[]
}

export function CustomersFiltersSelected({ filters }: Props) {
  async function removeFilter(_key: string) {
    // const newParams = new URLSearchParams(searchParams)
    // newParams.delete(key)
    // await queryClient
    //   .invalidateQueries({
    //     queryKey: ['customers-list'],
    //   })
    //   .then(() => {
    //     router.push(`${pathname}?${newParams.toString()}`)
    //   })
  }

  function switchRenderStatus(status: string) {
    switch (status) {
      case 'A':
        return 'Ativo'
      case 'B':
        return 'Bloqueado'
      case 'C':
        return 'Cancelado'
      case 'I':
        return 'Inativo'
      default:
        return status
    }
  }

  function formatDate(date: string) {
    return new Date(parseISO(date)).toLocaleDateString('pt-BR')
  }

  function renderBadgesFiltered({
    id,
    title,
    value,
  }: DataTableAppliedFilters<SearchCustomers>) {
    switch (id) {
      case 'status':
        return (
          <>
            {title}: {switchRenderStatus(String(value))}{' '}
          </>
        )
      case 'dataInicial':
        return (
          <>
            {title}: {formatDate(value as string)}
          </>
        )
      case 'dataFinal':
        return (
          <>
            {title}: {formatDate(value as string)}
          </>
        )
      case 'regimeEspecialId':
        return (
          <>
            {title}:{' '}
            {REGIME_OPTIONS.find((option) => option.value === value)?.label}{' '}
          </>
        )
      default:
        return (
          <>
            {title}: {value}{' '}
          </>
        )
    }
  }

  return (
    <div className="my-1 flex flex-wrap gap-2">
      {filters.map((filter) =>
        filter.value ? (
          <Badge
            className="cursor-pointer"
            key={filter.id}
            variant="default"
            onClick={() => removeFilter(filter.id)}
          >
            {renderBadgesFiltered(filter)}
            <span className="ml-1">
              <XCircle className="size-2" />
            </span>
          </Badge>
        ) : null
      )}
    </div>
  )
}
