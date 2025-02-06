import { ClienteViewModel } from '@/services/api/accountant-panel-api/schemas/cliente-models'

import { useToast } from '@/components/hooks/use-toast'

import { initialCustomerPayload } from '../constants'
import { useHandleCustomerFormState } from './use-customer-form-state'

export function useCustomerDialogStateHandler() {
  const { toast } = useToast()
  const { setDialogState, setCustomerPayload } = useHandleCustomerFormState()

  const handleOpenDialog = async (customer?: ClienteViewModel) => {
    setDialogState(true)

    if (customer) {
      try {
        const {
          certificadoDigital: _, // remove certificado
          ...rest
        } = customer

        if (!customer.id) throw new Error('NOT_FOUND')

        setCustomerPayload({
          ...initialCustomerPayload,
          ...rest,
        })
      } catch (error) {
        console.error('error open customer dialog: ', error)

        toast({
          title: 'Não foi possível abrir o cliente para edição!',
          description:
            'Houve um problem ao carregar as informações necessárias. Tente mais tarde.',
          variant: 'destructive',
        })
      }
    }
  }

  const handleCloseDialog = () => setDialogState(false)

  return {
    handleOpenDialog,
    handleCloseDialog,
  }
}
