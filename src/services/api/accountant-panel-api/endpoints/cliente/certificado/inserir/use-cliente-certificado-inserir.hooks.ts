import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query'

import { clienteListarClientOptions } from '../../listar'
import { clienteObterDetalheClientOptions } from '../../obter-detalhes'
import {
  clienteCertificadoInserir,
  ClienteCertificadoInserirResponse,
} from './cliente-certificado-inserir.endpoint'
import { ClienteCertificadoInserirRequestPayload } from './cliente-certificado-inserir.schemas'

export type UseClienteCertificadoInserir = Pick<
  UseMutationOptions<
    ClienteCertificadoInserirResponse,
    Error,
    ClienteCertificadoInserirRequestPayload,
    unknown
  >,
  'onError' | 'onMutate' | 'onSettled' | 'onSuccess'
>

export function useClienteCertificadoInserir({
  onSettled,
  ...rest
}: UseClienteCertificadoInserir) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: clienteCertificadoInserir,
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: clienteListarClientOptions().queryKey,
      })

      queryClient.invalidateQueries({
        queryKey: clienteObterDetalheClientOptions({
          clienteId: variables.clienteId,
        }).queryKey,
      })

      onSettled?.(data, error, variables, context)
    },
    ...rest,
  })
}
