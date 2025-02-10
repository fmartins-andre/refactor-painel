import { useAutenticacaoObterToken } from '@/services/api/accountant-panel-api/endpoints/autenticacao/obter-token'
import { useAuth } from '@/services/providers/auth-provider'
import { useNavigate } from '@tanstack/react-router'
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'
import { toast } from 'sonner'

import { LocalLoginFormSchema } from '../local-login.schema'

export type UseHandleLocalLogion = {
  handleSubmit: UseFormHandleSubmit<LocalLoginFormSchema>
}

export function useSubmitHandler({ handleSubmit }: UseHandleLocalLogion) {
  const navigate = useNavigate()
  const { login } = useAuth()

  const { mutate, isPending } = useAutenticacaoObterToken({
    onSuccess: async (data) => {
      await login(data.token)
      navigate({ to: '/dashboard' })
    },
  })

  const onValid: SubmitHandler<LocalLoginFormSchema> = (data) => {
    mutate(data)
  }

  const onInvalid: SubmitErrorHandler<LocalLoginFormSchema> = (error) => {
    console.error(error)
    toast.error('Credenciais inválidas')
  }

  const submitHandler = handleSubmit(onValid, onInvalid)

  return {
    submitHandler,
    isPending,
  }
}
