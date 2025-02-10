import { useClienteAtualizar } from '@/services/api/accountant-panel-api/endpoints/cliente'
import { useBlocker, useParams } from '@tanstack/react-router'
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'
import { toast } from 'sonner'

import { CustomerFormInput, CustomerFormOutput } from '../cliente-info.schema'

let toastId: string | number = ''

export type UseFormStep01SubmitHandler = {
  handleSubmit: UseFormHandleSubmit<CustomerFormInput>
}

export function useFormSubmitHandler({
  handleSubmit,
}: UseFormStep01SubmitHandler) {
  const clienteId = useParams({
    from: '/_authenticated-routes/clientes/$clienteId',
    select: ({ clienteId }) => clienteId,
  })

  const { mutate, isPending } = useClienteAtualizar({
    onMutate: () => {
      toastId = toast.loading('Atualizando cliente...')
    },
    onSuccess: () => {
      toast.success('Cliente atualizado com sucesso!', { id: toastId })
    },
    onError: () => {
      toast.dismiss(toastId)
    },
  })

  const { status } = useBlocker({
    shouldBlockFn: () => isPending,
    withResolver: true,
  })

  if (status === 'blocked') {
    toast.info('Atualizando cliente! Aguarde...', {
      id: clienteId,
      duration: 1500,
      position: 'top-center',
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onValid: SubmitHandler<any> = async (payload: CustomerFormOutput) => {
    mutate({ clienteId, payload })
  }

  const onInvalid: SubmitErrorHandler<CustomerFormInput> = (error) => {
    console.error('update customer form errors: ', error)
    toast.error('Erro ao validar dados', {
      description: 'Por favor, corrija as informações prestadas no formulário.',
    })
  }

  const submitHandler = handleSubmit(onValid, onInvalid)

  return { submitHandler, isPending }
}
