'use client'

import { useEffect, useState } from 'react'
import type { AxiosError } from 'axios'

import { useToast } from '@/components/hooks/use-toast'

export type AuthHashLoginProps = {
  hashCode: string
}

export function AuthHashLogin({ hashCode }: AuthHashLoginProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const loginWithHashCode = async () => {
    if (!hashCode) return
    setLoading(true)
    try {
      const hashCodeDecoded = decodeURIComponent(hashCode)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/login/crm`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': `${process.env.NEXT_PUBLIC_X_API_KEY}`,
          },
          body: JSON.stringify({ hashCode: hashCodeDecoded }),
        }
      )

      if (!response.ok) {
        throw new Error('Falha na autenticação')
      }

      const data = await response.json()
      const token = data.token

      // const signInResponse = await signIn('credentials', {
      //   token,
      //   redirect: false,
      // })

      // if (signInResponse?.error) {
      //   throw new Error(signInResponse.error)
      // }

      console.log('Usuário logado com sucesso')
    } catch (error: AxiosError | any) {
      console.error(error)

      setLoading(false)

      toast({
        title: 'Erro ao realizar login',
        description: 'message' in error ? error.message : 'Erro desconhecido',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    loginWithHashCode()
  }, [hashCode])

  return <></>
}
