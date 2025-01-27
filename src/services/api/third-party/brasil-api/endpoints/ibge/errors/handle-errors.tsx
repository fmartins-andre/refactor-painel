import { AxiosError, HttpStatusCode, isAxiosError } from 'axios'
import { ZodError } from 'zod'

import { toast } from '@/components/hooks/use-toast'

import { CommonBrasilApiIbge404Error } from './common-error.types'

export function handleCommonBrasilApiIbgeErrors(error: unknown) {
  console.error('error brasil api:\n', error)

  if (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.NotFound
  ) {
    const axiosError = error as AxiosError<CommonBrasilApiIbge404Error>
    toast({
      title: axiosError.response?.data?.message ?? 'UF não encontrada.',
      variant: 'destructive',
    })
  } else if (error instanceof ZodError) {
    const messages = error.issues.map((err) => err.message)

    toast({
      title: 'Erro de validação de dados',
      description: (
        <>
          {messages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
          <p className="font-semibold underline">
            Por favor, comunique esse erro ao suporte!
          </p>
        </>
      ),
      variant: 'destructive',
    })
  } else {
    const _error = error as Error
    toast({
      title: 'Erro inesperado...',
      description: _error.message || 'Tente novamente mais tarde!',
      variant: 'destructive',
    })
  }
}
