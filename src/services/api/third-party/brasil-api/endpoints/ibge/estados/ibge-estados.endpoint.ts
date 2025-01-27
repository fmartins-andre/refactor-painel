import { brasilApiHttpClientInstance } from '../../../http-client/http-client'
import { handleCommonBrasilApiIbgeErrors } from '../errors/handle-errors'
import { BrasilApiIbgeUf, brasilApiIbgeUfSchema } from './ibge-estados.schemas'

export type BrasilApiIbgeEstadosListarResponse = BrasilApiIbgeUf[] | undefined

export async function brasilApiIbgeEstadosListar(
  params: undefined,
  signal?: AbortSignal
): Promise<BrasilApiIbgeEstadosListarResponse> {
  try {
    const response =
      await brasilApiHttpClientInstance.get<BrasilApiIbgeEstadosListarResponse>(
        'https://brasilapi.com.br/api/ibge/uf/v1',
        { signal }
      )

    const validatedResponse = brasilApiIbgeUfSchema.array().parse(response.data)

    return validatedResponse
  } catch (error) {
    handleCommonBrasilApiIbgeErrors(error)

    throw error
  }
}
