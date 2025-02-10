import { AxiosError, HttpStatusCode, isAxiosError } from 'axios'
import { toast } from 'sonner'
import { ZodError } from 'zod'

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

    toast.error(
      axiosError.response?.data?.title ??
        fallbackErrorMessage ??
        'Erro na solicitação ao servidor.',

      {
        description: axiosError.response?.data?.detail,
      }
    )

    return
  }

  if (error instanceof ZodError) {
    const messages = error.issues.map((err) => err.message)

    toast.error('Erro de validação de dados', {
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
    })

    return
  }

  const _error = error as Error
  toast.error('Erro inesperado...', {
    description: _error.message || 'Tente novamente mais tarde!',
  })
}
