import { AxiosError, HttpStatusCode, isAxiosError } from 'axios'
import { toast } from 'sonner'
import { ZodError } from 'zod'

import { CommonCnpjWsApiError } from './common-error.types'

export function handleCommonCnpjWsApiErrors<
  TError extends CommonCnpjWsApiError,
>(error: unknown, fallbackErrorMessage?: string) {
  console.error('error cnpjws api:\n', error)

  if (isAxiosError(error) && error.code === 'ERR_CANCELED') {
    // do nothing
    return
  }

  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<TError>

    const isNotFound = error.response?.status === HttpStatusCode.NotFound

    const description = isNotFound
      ? 'O CNPJ informado pode não existir ou estar errado.'
      : axiosError.response?.data?.detalhes
    const validations = isNotFound
      ? undefined
      : axiosError.response?.data?.validacao

    toast.error(
      isNotFound
        ? 'CNPJ não encontrado!'
        : (axiosError.response?.data.titulo ??
            fallbackErrorMessage ??
            'Erro na solicitação ao servidor.'),

      {
        description: (
          <>
            {Boolean(description?.length) && (
              <p className="font-semibold underline">{description}</p>
            )}

            {validations?.map((message, index) => <p key={index}>{message}</p>)}
          </>
        ),
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
