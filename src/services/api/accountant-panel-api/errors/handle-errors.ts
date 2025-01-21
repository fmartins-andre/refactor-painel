import { AxiosError, isAxiosError } from 'axios'
import { ZodError } from 'zod'

import { toast } from '@/components/hooks/use-toast'

import { CommonAccountantPanelApiError } from './common-error.types'

export function handleCommonAccountantPanelApiErrors<
  TError extends CommonAccountantPanelApiError,
>(error: unknown, fallbackErrorMessage?: string) {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<TError>

    toast({
      title:
        axiosError.response?.data.title ??
        fallbackErrorMessage ??
        'Erro na solicitação ao servidor.',
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
    const _error = error as Error
    toast({
      title: 'Erro inesperado...',
      description: _error.message || 'Tente novamente mais tarde!',
      variant: 'destructive',
    })
  }
}
