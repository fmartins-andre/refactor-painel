import { ChevronRightIcon, Loader } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { TextSkeleton } from '@/components/text-skeleton'

import { useGetCurrentCustomerData } from '../../../helpers/use-get-current-customer-data.hook'
import { CustomerDetailsHeaderStatusSelect } from './header-status-select.comp'

export function CustomerDetailsHeader() {
  const { data: customer, isLoading: isLoadingCustomer } =
    useGetCurrentCustomerData()

  async function handleAccessEmitter() {
    toast.error('Erro ao acessar emissor', {
      description: 'Não implementado ainda... informar o dev',
    })
  }

  async function handleCustomerStatusChange() {
    toast.error('Erro ao alterar o status do cliente', {
      description: 'Não implementado ainda... informar o dev',
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap gap-y-2 gap-x-8 items-center">
        <div className="flex gap-x-8 gap-y-2 flex-wrap items-center grow ">
          <span className="max-w-[72ch] line-clamp-1 text-lg font-bold md:max-w-[120ch]">
            {isLoadingCustomer ? <TextSkeleton /> : customer?.nomeRazaoSocial}
          </span>
          <div className="flex w-full sm:w-fit gap-2">
            <CustomerDetailsHeaderStatusSelect
              status={customer?.status}
              onStatusChange={handleCustomerStatusChange}
              isLoading={isLoadingCustomer}
            />
            {/* {
              // !!'customer?.nomePlano' && (
              <>
                <span className="text-sm font-semibold">|</span>
                <span className="text-secondary text-md">
                  Plano:{' '}
                  <span className="font-semibold">{customer?.}</span>
                </span>
              </>
              // )
            } */}
          </div>
        </div>

        <Button
          type="button"
          className="mt-4 w-full sm:w-fit"
          onClick={handleAccessEmitter}
          disabled={isLoadingCustomer}
        >
          {isLoadingCustomer ? (
            <Loader className="size-5 animate-spin" />
          ) : (
            <span className="flex items-center gap-2">
              Acessar Emissor de Notas
              <ChevronRightIcon className="size-5 pt-0.5" />
            </span>
          )}
        </Button>
      </CardHeader>
    </Card>
  )
}
