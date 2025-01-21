import { AuthTokenData, RouterContext } from '@/@types/route-context'
import { jwtDecode } from 'jwt-decode'
import { z } from 'zod'

const LS_ACCOUNTANT_PANEL_API_TOKEN = 'tkn-ccntnt-pnl'

export type AuthTokenAndData = Pick<
  NonNullableFields<RouterContext['auth']>,
  'token' | 'tokenData'
>

const authTokenAndDataSchema: z.ZodType<AuthTokenAndData> = z.object({
  token: z.string().jwt(),
  tokenData: z.object({
    emailUsuario: z.union([z.string().email(), z.literal('admin')]),
    usuarioId: z.string().uuid(),
    contadorId: z.string().uuid(),
  }),
})

function get(): AuthTokenAndData | null {
  if (typeof window === 'undefined') return null

  try {
    const stringifiedData = localStorage.getItem(LS_ACCOUNTANT_PANEL_API_TOKEN)

    if (!stringifiedData?.length) throw Error()

    const data = JSON.parse(stringifiedData)

    return authTokenAndDataSchema.parse(data)
  } catch (_e) {
    return null
  }
}

function set(token: string): AuthTokenAndData | null {
  if (typeof window === 'undefined') return null

  try {
    const tokenData = jwtDecode<AuthTokenData>(token)

    const data = authTokenAndDataSchema.parse({
      token,
      tokenData,
    })

    localStorage.setItem(LS_ACCOUNTANT_PANEL_API_TOKEN, JSON.stringify(data))

    return data
  } catch (_e) {
    return null
  }
}

function remove() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LS_ACCOUNTANT_PANEL_API_TOKEN)
  }
}

export const handleAccountantPanelApiLocalToken = {
  get,
  set,
  remove,
}
