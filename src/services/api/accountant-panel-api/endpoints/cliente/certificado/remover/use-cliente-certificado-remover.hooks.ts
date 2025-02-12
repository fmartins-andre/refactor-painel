import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query'

import { clienteListarClientOptions } from '../../listar'
import { clienteObterDetalheClientOptions } from '../../obter-detalhes'
import {
  clienteCertificadoRemover,
  ClienteCertificadoRemoverResponse,
} from './cliente-certificado-remover.endpoint'
import { ClienteCertificadoRemoverRequestPayload } from './cliente-certificado-remover.schemas'

export type UseClienteCertificadoRemover = Pick<
  UseMutationOptions<
    ClienteCertificadoRemoverResponse,
    Error,
    ClienteCertificadoRemoverRequestPayload,
    unknown
  >,
  'onError' | 'onMutate' | 'onSettled' | 'onSuccess'
>

export function useClienteCertificadoRemover({
  onSettled,
  ...rest
}: UseClienteCertificadoRemover) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: clienteCertificadoRemover,
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
