import { handleCommonAccountantPanelApiErrors } from '../../../errors/handle-errors'
import { accountantPanelApiHttpClientInstance } from '../../../http-client/http-client'
import {
  AutenticacaoObterToken,
  AutenticacaoObterTokenRequestPayload,
  autenticacaoObterTokenRequestPayloadSchema,
  autenticacaoObterTokenSchema,
} from './obter-token.schemas'

export type AutenticacaoObterTokenResponse = AutenticacaoObterToken

export async function autenticacaoObterToken(
  payload: AutenticacaoObterTokenRequestPayload,
  signal?: AbortSignal
): Promise<AutenticacaoObterTokenResponse> {
  try {
    const body = autenticacaoObterTokenRequestPayloadSchema.parse(payload)

    const response =
      await accountantPanelApiHttpClientInstance.post<AutenticacaoObterTokenResponse>(
        '/v1/Autenticacao/ObterToken',
        body,
        { signal }
      )

    const validatedResponse = autenticacaoObterTokenSchema.parse(response.data)

    return validatedResponse
  } catch (error) {
    handleCommonAccountantPanelApiErrors(error)

    throw error
  }
}
