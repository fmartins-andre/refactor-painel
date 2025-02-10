import { useClienteAtualizar } from '@/services/api/accountant-panel-api/endpoints/cliente'
import { useBlocker } from '@tanstack/react-router'
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'
import { toast } from 'sonner'

import { useGetCurrentCustomerData } from '../../helpers/use-get-current-customer-data.hook'
import {
  ClienteConfigFormInput,
  ClienteConfigFormOutput,
} from '../cliente-config.schema'

let toastId: string | number = ''

export type UseFormStep01SubmitHandler = {
  handleSubmit: UseFormHandleSubmit<ClienteConfigFormInput>
}

export function useFormSubmitHandler({
  handleSubmit,
}: UseFormStep01SubmitHandler) {
  const { data: customer, clienteId } = useGetCurrentCustomerData()

  const { mutate, isPending } = useClienteAtualizar({
    onMutate: () => {
      toastId = toast.loading('Atualizando configurações do cliente...')
    },
    onSuccess: () => {
      toast.success('Configurações do cliente atualizadas com sucesso!', {
        id: toastId,
      })
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
    toast.info('Atualizando configurações do cliente! Aguarde...', {
      id: clienteId,
      duration: 1500,
      position: 'top-center',
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onValid: SubmitHandler<any> = async (
    modulesPayload: ClienteConfigFormOutput
  ) => {
    if (!customer) return

    const {
      certificadoDigital: _,
      telefone,
      email,
      endereco,
      ...rest
    } = customer

    if (telefone == null || email == null || endereco == null) {
      toast.warning('Cadastro incompleto!', {
        description:
          'Por favor, acesse o menu "Informações do Cliente" e ' +
          'complete o cadastro antes de seguir com a alteração dos módulos!',
        duration: 1000 * 7,
      })

      return
    }

    mutate({
      clienteId: customer.id,
      payload: {
        ...rest,
        telefone,
        email,
        endereco,
        ...modulesPayload,
      },
    })
  }

  const onInvalid: SubmitErrorHandler<ClienteConfigFormInput> = (error) => {
    console.error('update customer config form errors: ', error)
    toast.error('Erro ao validar dados', {
      description: 'Por favor, corrija as informações prestadas no formulário.',
    })
  }

  const submitHandler = handleSubmit(onValid, onInvalid)

  return { submitHandler, isPending }
}
