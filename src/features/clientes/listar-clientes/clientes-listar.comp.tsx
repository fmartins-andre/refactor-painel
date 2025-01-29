import { lazy, Suspense, useRef } from 'react'
import { useClienteListar } from '@/services/api/accountant-panel-api/endpoints/cliente'
import { RefreshCcw, UserPlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { DataTable } from '@/components/data-table'

import { CustomerDialogRef } from '../customer-dialog'
import { useHandleClientesListarFilters } from './helpers/use-handle-clientes-listar-filter-params.hook'
import { ClientesListarFiltersFormProvider } from './subcomponents/filters'
import { ClientesListarFiltersActive } from './subcomponents/filters/cliente-listar-filters-active.comp'
import { ClientesListarFiltersSearchBarSection } from './subcomponents/filters/sections/search-bar.comp'
import { useAccountantCustomers } from './subcomponents/use-accountant-customers'

const CustomerDialog = lazy(() =>
  import('../customer-dialog').then((module) => ({
    default: module.CustomerDialog,
  }))
)

const ResumeCards = lazy(() =>
  import('./subcomponents/resume-cards').then((module) => ({
    default: module.ResumeCards,
  }))
)

export function CustomerList() {
  const { filters, setFilters } = useHandleClientesListarFilters()

  const {
    data: clientes,
    isLoading: isLoadingClientes,
    refetch: refetchClientes,
  } = useClienteListar(filters)

  async function handleRefetchList() {
    await refetchClientes()
  }

  const customerDialogRef = useRef<CustomerDialogRef>(null)

  function handleOpenDialog() {
    customerDialogRef.current?.open?.()
  }

  const { tableColumns } = useAccountantCustomers()

  return (
    <DataTable.Root
      columns={tableColumns}
      data={clientes?.data ?? []}
      pageSize={clientes?.per_page ?? 10}
      page={clientes?.current_page ?? 1}
      total={clientes?.total ?? 0}
      isLoading={isLoadingClientes}
      handlePage={(page) => setFilters({ page })}
      handlePageSize={(pageSize) => setFilters({ perPage: pageSize })}
    >
      <ClientesListarFiltersFormProvider className="flex w-full flex-col gap-8 pt-5">
        <div className="flex w-full flex-col justify-center gap-2 md:flex-row md:justify-between">
          <span className="text-2xl font-bold">Meus Clientes</span>
          <Button
            variant="default"
            type="button"
            className="inline-flex w-full items-center gap-2 md:w-52"
            onClick={handleOpenDialog}
          >
            <UserPlusIcon className="size-5" />
            Cadastrar Cliente
          </Button>
        </div>

        <Suspense fallback={<div>carregando...</div>}>
          <ResumeCards />
        </Suspense>

        <Card className="w-full">
          <CardHeader className="flex flex-col gap-2">
            <div className="flex w-full flex-col items-center gap-2 md:flex-row">
              {/* <Icons.customers_list className="size-6" /> */}
              <span className="font-bold md:text-lg">
                Todos os meus clientes cadastrados na plataforma
              </span>
            </div>

            <div className="flex flex-col items-center gap-2 md:flex-row">
              <ClientesListarFiltersActive />
              <Button
                size="icon"
                variant="tertiary"
                onClick={handleRefetchList}
              >
                <RefreshCcw className="size-4" />
              </Button>
            </div>

            <ClientesListarFiltersSearchBarSection />
          </CardHeader>

          <CardContent className="w-full">
            <div className="w-full px-2">
              <ScrollArea>
                <div className="flex flex-col gap-2">
                  <DataTable.Main />
                  <DataTable.Pagination />
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        <Suspense fallback={<div>carregando...</div>}>
          <CustomerDialog ref={customerDialogRef} />
        </Suspense>
      </ClientesListarFiltersFormProvider>
    </DataTable.Root>
  )
}
