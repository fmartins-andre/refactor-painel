import { AxiosError, HttpStatusCode, isAxiosError } from 'axios'
import { toast } from 'sonner'
import { ZodError } from 'zod'

import { CommonIbgeGovApiIbge404Error } from './common-error.types'

export function handleCommonIbgeGovApiLocalidadesErrors(error: unknown) {
  console.error('error ibge gov api:\n', error)

  if (isAxiosError(error) && error.code === 'ERR_CANCELED') {
    // do nothing
    return
  }

  if (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.NotFound
  ) {
    const axiosError = error as AxiosError<CommonIbgeGovApiIbge404Error>
    toast.error(axiosError.response?.data?.message ?? 'UF não encontrada.')

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
