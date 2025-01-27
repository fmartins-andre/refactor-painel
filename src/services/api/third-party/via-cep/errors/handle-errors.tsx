import { AxiosError, HttpStatusCode, isAxiosError } from 'axios'
import { ZodError } from 'zod'

import { toast } from '@/components/hooks/use-toast'

import { CommonViaCepApi400Error } from './common-error.types'

export function handleCommonCnpjWsApiErrors(error: unknown) {
  console.error('error cnpjws api:\n', error)

  if (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.BadRequest
  ) {
    const axiosError = error as AxiosError<CommonViaCepApi400Error>

    toast({
      title: axiosError.response?.data.erro
        ? 'CEP não encontrado!'
        : 'Erro ao buscar CEP.',
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
