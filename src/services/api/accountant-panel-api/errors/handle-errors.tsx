import { AxiosError, HttpStatusCode, isAxiosError } from 'axios'
import { ZodError } from 'zod'

import { toast } from '@/components/hooks/use-toast'

import { CommonAccountantPanelApiError } from './common-error.types'

const expectedErrors: HttpStatusCode[] = [
  HttpStatusCode.BadRequest,
  HttpStatusCode.Unauthorized,
  HttpStatusCode.NotFound,
]

export function handleCommonAccountantPanelApiErrors<
  TError extends CommonAccountantPanelApiError,
>(error: unknown, fallbackErrorMessage?: string) {
  console.error('error accountant panel api:\n', error)

  if (isAxiosError(error) && error.code === 'ERR_CANCELED') {
    // do nothing
    return
  }

  if (
    isAxiosError(error) &&
    expectedErrors.includes(error.response?.status ?? 0)
  ) {
    const axiosError = error as AxiosError<TError>

    toast({
      title:
        axiosError.response?.data?.title ??
        fallbackErrorMessage ??
        'Erro na solicitação ao servidor.',
      description: axiosError.response?.data?.detail,
      variant: 'destructive',
    })

    return
  }

  if (error instanceof ZodError) {
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

    return
  }

  const _error = error as Error
  toast({
    title: 'Erro inesperado...',
    description: _error.message || 'Tente novamente mais tarde!',
    variant: 'destructive',
  })
}
