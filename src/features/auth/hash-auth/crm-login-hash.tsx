import { useEffect, useState } from 'react'
import type { AxiosError } from 'axios'
import { toast } from 'sonner'

export type AuthHashLoginProps = {
  hashCode: string
}

export function AuthHashLogin({ hashCode }: AuthHashLoginProps) {
  const [loading, setLoading] = useState(false)

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

      toast.error('Erro ao realizar login', {
        description: 'message' in error ? error.message : 'Erro desconhecido',
      })
    }
  }

  useEffect(() => {
    loginWithHashCode()
  }, [hashCode])

  return <></>
}
