import { AxiosError, HttpStatusCode, isAxiosError } from 'axios'
import { toast } from 'sonner'
import { ZodError } from 'zod'

import { CommonViaCepApi400Error } from './common-error.types'

export function handleCommonCnpjWsApiErrors(error: unknown) {
  console.error('error cnpjws api:\n', error)

  if (isAxiosError(error) && error.code === 'ERR_CANCELED') {
    // do nothing
    return
  }

  if (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.BadRequest
  ) {
    const axiosError = error as AxiosError<CommonViaCepApi400Error>

    toast.error(
      axiosError.response?.data.erro
        ? 'CEP não encontrado!'
        : 'Erro ao buscar CEP.'
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
