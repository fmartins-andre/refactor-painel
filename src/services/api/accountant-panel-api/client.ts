import { ApiOf, Zodios } from '@zodios/core'
import { ZodiosHooks } from '@zodios/react'

import { authGetToken } from './endpoints/auth/get-token.enpoint'
import { accountantPanelApiHttpClientInstance } from './http-client/http-client'

export const accountantPanelApiClient = new Zodios([authGetToken], {
  axiosInstance: accountantPanelApiHttpClientInstance,
})

export type AccountantPanelApi = ApiOf<typeof accountantPanelApiClient>

export const accountantPanelApiHooks = new ZodiosHooks(
  'accountantPanelApiClient',
  accountantPanelApiClient
)
