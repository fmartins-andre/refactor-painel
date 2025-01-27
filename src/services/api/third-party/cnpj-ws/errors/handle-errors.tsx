import { AxiosError, isAxiosError } from 'axios'
import { ZodError } from 'zod'

import { toast } from '@/components/hooks/use-toast'

import { CommonCnpjWsApiError } from './common-error.types'

export function handleCommonCnpjWsApiErrors<
  TError extends CommonCnpjWsApiError,
>(error: unknown, fallbackErrorMessage?: string) {
  console.error('error cnpjws api:\n', error)

  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<TError>

    const description = axiosError.response?.data?.detalhes
    const validations = axiosError.response?.data?.validacao

    toast({
      title:
        axiosError.response?.data.titulo ??
        fallbackErrorMessage ??
        'Erro na solicitação ao servidor.',
      description: (
        <>
          {Boolean(description?.length) && (
            <p className="font-semibold underline">{description}</p>
          )}

          {validations?.map((message, index) => <p key={index}>{message}</p>)}
        </>
      ),
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
