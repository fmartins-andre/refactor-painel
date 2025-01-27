import { brasilApiHttpClientInstance } from '../../../http-client/http-client'
import { handleCommonBrasilApiIbgeErrors } from '../errors/handle-errors'
import {
  BrasilApiIbgeMunicipio,
  brasilApiIbgeMunicipioSchema,
  BrasilApiIbgeMunicipiosListarRequestParams,
  brasilApiIbgeMunicipiosListarRequestParamsSchema,
} from './ibge-municipios.schemas'

export type BrasilApiIbgeMunicipiosListarResponse =
  | BrasilApiIbgeMunicipio[]
  | undefined

export async function brasilApiIbgeMunicipiosListar(
  params: BrasilApiIbgeMunicipiosListarRequestParams,
  signal?: AbortSignal
): Promise<BrasilApiIbgeMunicipiosListarResponse> {
  try {
    const validParams =
      brasilApiIbgeMunicipiosListarRequestParamsSchema.parse(params)

    const response =
      await brasilApiHttpClientInstance.get<BrasilApiIbgeMunicipiosListarResponse>(
        `/ibge/municipios/v1/${validParams.uf}?providers=dados-abertos-br,gov,wikipedia`,
        { signal }
      )

    const validatedResponse = brasilApiIbgeMunicipioSchema
      .array()
      .parse(response.data)

    return validatedResponse
  } catch (error) {
    handleCommonBrasilApiIbgeErrors(error)

    throw error
  }
}
