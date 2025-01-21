import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError, isAxiosError } from 'axios'
import { ZodError } from 'zod'

import { useToast } from '@/components/hooks/use-toast'

import { autenticacaoObterToken } from './obter-token.endpoint'
import {
  AutenticacaoObterTokenError400,
  AutenticacaoObterTokenRequestPayload,
  AutenticacaoObterTokenResponse,
} from './obter-token.schemas'

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
  // const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: autenticacaoObterToken,
    onError: (error) => {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError<AutenticacaoObterTokenError400>

        toast({
          title: axiosError.response?.data.title ?? 'Erro ao obter token...',
          description: axiosError.response?.data.detail,
          variant: 'destructive',
        })
      } else if (error instanceof ZodError) {
        const [title, ...messages] = error.issues.map((err) => err.message)

        toast({
          title,
          description: messages.join('. '),
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Erro inesperado...',
          description: error.message || 'Tente novamente mais tarde!',
          variant: 'destructive',
        })
      }
    },
    // onSettled: (data, error, variables) => {
    //   queryClient.invalidateQueries({
    //     queryKey: getXmlRadarReportsList({
    //       customerId: variables.customerId,
    //     }).queryKey,
    //   })
    // },
    ...options,
  })
}
