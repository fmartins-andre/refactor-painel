import { accountantPanelApiHttpClientInstance } from '../../../http-client/http-client'
import {
  AutenticacaoObterTokenRequestPayload,
  autenticacaoObterTokenRequestPayloadSchema,
  AutenticacaoObterTokenResponse,
  autenticacaoObterTokenResponseSchema,
} from './obter-token.schemas'

export async function autenticacaoObterToken(
  payload: AutenticacaoObterTokenRequestPayload
): Promise<AutenticacaoObterTokenResponse> {
  try {
    const body = autenticacaoObterTokenRequestPayloadSchema.parse(payload)

    const response =
      await accountantPanelApiHttpClientInstance.post<AutenticacaoObterTokenResponse>(
        '/v1/Autenticacao/ObterToken',
        body
      )

    const validatedResponse = autenticacaoObterTokenResponseSchema.parse(
      response.data
    )

    return validatedResponse
  } catch (error) {
    console.error(error)

    throw error
  }
}
