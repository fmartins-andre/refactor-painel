import { AxiosError, HttpStatusCode, isAxiosError } from 'axios'
import { ZodError } from 'zod'

import { toast } from '@/components/hooks/use-toast'

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
    toast({
      title: axiosError.response?.data?.message ?? 'UF não encontrada.',
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
