import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query'

import { ClienteInputModel } from '../../../schemas/cliente-models'
import { clienteListarClientOptions } from '../listar'
import {
  clienteInserir,
  ClienteInserirResponse,
} from './cliente-inserir.endpoint'

export type UseClienteInserir = Pick<
  UseMutationOptions<ClienteInserirResponse, Error, ClienteInputModel, unknown>,
  'onError' | 'onMutate' | 'onSettled' | 'onSuccess'
>

export function useClienteInserir(options?: UseClienteInserir) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: clienteInserir,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: clienteListarClientOptions().queryKey,
      })
    },
    ...options,
  })
}
