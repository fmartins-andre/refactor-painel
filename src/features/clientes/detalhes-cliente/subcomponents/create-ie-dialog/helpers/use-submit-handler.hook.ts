import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'
import { toast } from 'sonner'

import { useGetCurrentCustomerData } from '../../../helpers/use-get-current-customer-data.hook'
import { CreateInscricaoEstadualSchema } from '../modal-create-inscricao-estadual.schema'

export type UseCreateIEDialogSubmitHandler = {
  handleSubmit: UseFormHandleSubmit<CreateInscricaoEstadualSchema>
  handleCloseDialog: () => void
}

export function useCreateIEDialogSubmitHandler({
  handleSubmit,
  handleCloseDialog,
}: UseCreateIEDialogSubmitHandler) {
  const { data: customer } = useGetCurrentCustomerData()

  // const { mutate, isPending } = useCreateAccountantCustomerIE({
  //   onSuccess: () => {
  //     toast({
  //       title: 'Nova IE criada com sucesso',
  //       variant: 'success',
  //     })
  //   },
  // })

  const onValid: SubmitHandler<any> = async (
    data: CreateInscricaoEstadualSchema
  ) => {
    toast.error('Erro ao submeter o fomulário!', {
      description: 'Não desenvolvido ainda... informar ao dev!',
    })
    // if (customer?.empresaId) {
    //   mutate({ empresaId: customer.empresaId, ...data })
    // }
  }

  const onInvalid: SubmitErrorHandler<CreateInscricaoEstadualSchema> = (
    error
  ) => {
    toast.error('Erro no formulário', {
      description: 'Corrija os erros indicados para seguir',
    })
    console.error('Erro no formulário de IE do usuário: ', error)
  }

  const handleOnSubmit = handleSubmit(onValid, onInvalid)

  const isPending = false
  return { handleOnSubmit, isPending }
}
