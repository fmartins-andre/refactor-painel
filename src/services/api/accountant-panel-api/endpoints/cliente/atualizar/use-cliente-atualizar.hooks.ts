import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query'

import { clienteListarClientOptions } from '../listar'
import { clienteObterDetalheClientOptions } from '../obter-detalhes'
import {
  clienteAtualizar,
  ClienteAtualizarResponse,
} from './cliente-atualizar.endpoint'
import { ClienteAtualizarRequestParams } from './cliente-atualizar.schemas'

export type UseClienteAtualizar = Pick<
  UseMutationOptions<
    ClienteAtualizarResponse,
    Error,
    ClienteAtualizarRequestParams,
    unknown
  >,
  'onError' | 'onMutate' | 'onSettled' | 'onSuccess'
>

export function useClienteAtualizar(options?: UseClienteAtualizar) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: clienteAtualizar,
    onSettled: (_data, _errors, { clienteId }) => {
      queryClient.invalidateQueries({
        queryKey: clienteListarClientOptions().queryKey,
      })

      queryClient.invalidateQueries({
        queryKey: clienteObterDetalheClientOptions({ clienteId }).queryKey,
      })
    },
    ...options,
  })
}
