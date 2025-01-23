import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import {
  autenticacaoObterToken,
  AutenticacaoObterTokenResponse,
} from './obter-token.endpoint'
import { AutenticacaoObterTokenRequestPayload } from './obter-token.schemas'

export type UseAutenticacaoObterToken = Pick<
  UseMutationOptions<
    AutenticacaoObterTokenResponse,
    Error,
    AutenticacaoObterTokenRequestPayload,
    unknown
  >,
  'onError' | 'onMutate' | 'onSettled' | 'onSuccess'
>

export function useAutenticacaoObterToken(options?: UseAutenticacaoObterToken) {
  return useMutation({
    mutationFn: autenticacaoObterToken,
    ...options,
  })
}
