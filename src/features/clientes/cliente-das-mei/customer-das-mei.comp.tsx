import { useDasMeiListar } from '@/services/api/accountant-panel-api/endpoints/das-mei'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { DataTable } from '@/components/data-table'

import { generateDasMeiListarTableColumns } from './helpers/das-mei-listar-table-columns-handler'
import { useHandleDasMeiListarFilters } from './helpers/use-handle-das-mei-listar-filter-params.hook'
import { DasMeiListarRefreshButton } from './subcomponents/das-mei-listar-refresh-button.comp'
import { DasMeiListarFiltersFormProvider } from './subcomponents/filters'
import { DasMeiListarFiltersActive } from './subcomponents/filters/das-mei-listar-filters-active.comp'

export function CustomerDetailsDasMeiTable() {
  const { filters, setFilters } = useHandleDasMeiListarFilters()

  const { data: dasMeiList, isLoading: isLoadingDasMeiList } =
    useDasMeiListar(filters)

  const { tableColumns } = generateDasMeiListarTableColumns()

  return (
    <DataTable.Root
      columns={tableColumns}
      data={dasMeiList?.data || []}
      pageSize={dasMeiList?.per_page ?? 10}
      page={dasMeiList?.current_page ?? 1}
      total={dasMeiList?.total ?? 0}
      isLoading={isLoadingDasMeiList}
      handlePage={(page) => setFilters({ page })}
      handlePageSize={(perPage) => setFilters({ perPage })}
    >
      <DasMeiListarFiltersFormProvider className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2 md:flex-row">
          <DasMeiListarFiltersActive />
          <DasMeiListarRefreshButton />
        </div>

        <ScrollArea>
          <DataTable.Main />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <DataTable.Pagination />
      </DasMeiListarFiltersFormProvider>
    </DataTable.Root>
  )
}
