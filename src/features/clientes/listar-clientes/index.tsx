import { lazy, Suspense, useEffect, useRef } from 'react'
import { Pagination } from '@/@types/pagination'
import {
  FileDownIcon,
  InfoIcon,
  PrinterIcon,
  RefreshCcw,
  UserPlusIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useToast } from '@/components/hooks/use-toast'

import { CustomerDialogRef } from '../customer-dialog'
import { CustomersFiltersSelected } from './customers-filters-selected'
import { useFetchCustomers } from './helpers/use-fetch-values-from-api'
import { SearchCustomers } from './search-customers'
import { useAccountantCustomers } from './use-accountant-customers'
import { CustomerListSchemaInput } from './validations/customer-list'

const CustomerDialog = lazy(() =>
  import('../customer-dialog').then((module) => ({
    default: module.CustomerDialog,
  }))
)

const ResumeCards = lazy(() =>
  import('./resume-cards').then((module) => ({
    default: module.ResumeCards,
  }))
)

const ListCustomers = lazy(() =>
  import('./list-customers').then((module) => ({
    default: module.ListCustomers,
  }))
)

export function CustomerList() {
  const { customers, errors } = useFetchCustomers()
  const { toast } = useToast()
  const { appliedFilters } = useAccountantCustomers()

  async function handleRefetchList() {
    // await queryClient.invalidateQueries({
    //   queryKey: ['customers-list', page, perPage],
    // })
    // await queryClient.invalidateQueries({
    //   queryKey: getTotalCustomersCards().queryKey,
    // })
  }

  const customerDialogRef = useRef<CustomerDialogRef>(null)

  function handleOpenDialog() {
    customerDialogRef.current?.open?.()
  }

  useEffect(() => {
    if (errors.errorCustomerList) {
      toast({
        title: 'Erro ao buscar clientes',
        description: 'Erro ao buscar clientes, tente novamente',
        variant: 'destructive',
      })
    }
  }, [errors.errorCustomerList, toast])

  return (
    <div className="flex w-full flex-col gap-8 pt-5">
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

      <div className="w-full">
        <Card className="w-full">
          <CardHeader className="flex w-full flex-col items-center justify-center md:flex-row md:justify-between">
            <div className="flex w-full flex-col items-center gap-2 md:flex-row">
              {/* <Icons.customers_list className="size-6" /> */}
              <span className="font-bold md:text-lg">
                Todos os Meus Clientes Cadastrados na Plataforma
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="hidden md:block">
                    <InfoIcon className="text-gray500 size-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <span className="text-xs">
                      Aqui você encontra todos os clientes cadastrados na
                      plataforma, podendo visualizar, editar e excluir os
                      cadastros.
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex flex-col items-center gap-2 md:flex-row">
              <Button variant="tertiary" disabled>
                Baixar Lista CSV
                <FileDownIcon className="size-4" />
              </Button>
              <Button variant="tertiary" disabled>
                Imprimir Lista
                <PrinterIcon className="size-4" />
              </Button>
              <Button
                size="icon"
                variant="tertiary"
                onClick={handleRefetchList}
              >
                <RefreshCcw className="size-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="w-full">
            <div className="my-2 flex flex-col gap-1 px-1">
              <span className="font-bold"></span>
              <CustomersFiltersSelected filters={appliedFilters} />
              <SearchCustomers />
            </div>
            <div className="w-full px-2">
              <Suspense fallback={<div>carregando...</div>}>
                <ListCustomers
                  customers={customers as Pagination<CustomerListSchemaInput>}
                />
              </Suspense>
            </div>
          </CardContent>
        </Card>
      </div>

      <Suspense fallback={<div>carregando...</div>}>
        <CustomerDialog ref={customerDialogRef} />
      </Suspense>
    </div>
  )
}
