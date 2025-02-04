import { useState } from 'react'
import { AccountantCustomerUpdatePayload } from '@/@types/accountant/accountant-customer'

import { useToast } from '@/components/hooks/use-toast'

import { useHandleCustomerFormState } from './use-customer-form-state'

export function useCustomerDialogStateHandler() {
  const { toast } = useToast()
  const { setDialogState, setCustomerPayload } = useHandleCustomerFormState()
  // const getCustomerDetails = useLazyGetCustomerDetails()

  const [isFetchingCustomerData, setIsFetchingCustomerData] =
    useState<boolean>(false)
  const toggle = () => setIsFetchingCustomerData((prev) => !prev)

  const handleOpenDialog = async (
    customer?: Pick<
      AccountantCustomerUpdatePayload,
      'empresaId' | 'inscricaoId'
    >
  ) => {
    setDialogState(true)

    if (customer) {
      try {
        toggle()
        // const data = await getCustomerDetails(customer)

        // if (!data?.cnpjCpf) throw new Error('NOT_FOUND')

        // setCustomerPayload(data)
      } catch (error) {
        toast({
          title: 'Não foi possível abrir o cliente para edição!',
          description:
            'Houve um problem ao carregar as informações necessárias. Tente mais tarde.',
          variant: 'destructive',
        })
      } finally {
        toggle()
      }
    }
  }

  const handleCloseDialog = () => setDialogState(false)

  return {
    handleOpenDialog,
    handleCloseDialog,
    isFetchingCustomerData,
  }
}
