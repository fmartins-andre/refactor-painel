import { ibgeGovApiHttpClientInstance } from '../../../http-client/http-client'
import { handleCommonIbgeGovApiLocalidadesErrors } from '../errors/handle-errors'
import {
  IbgeGovApiLocalidadesMunicipio,
  ibgeGovApiLocalidadesMunicipioSchema,
  IbgeGovApiLocalidadesMunicipiosListarRequestParams,
  ibgeGovApiLocalidadesMunicipiosListarRequestParamsSchema,
} from './localidades-municipios.schemas'

export type IbgeGovApiLocalidadesMunicipiosListarResponse =
  | IbgeGovApiLocalidadesMunicipio[]
  | undefined

export async function ibgeGovApiLocalidadesMunicipiosListar(
  params: IbgeGovApiLocalidadesMunicipiosListarRequestParams,
  signal?: AbortSignal
): Promise<IbgeGovApiLocalidadesMunicipiosListarResponse> {
  try {
    const validParams =
      ibgeGovApiLocalidadesMunicipiosListarRequestParamsSchema.parse(params)

    const response =
      await ibgeGovApiHttpClientInstance.get<IbgeGovApiLocalidadesMunicipiosListarResponse>(
        `/v1/localidades/estados/${validParams.uf}/municipios`,
        { signal }
      )

    const validatedResponse = ibgeGovApiLocalidadesMunicipioSchema
      .array()
      .parse(response.data)

    return validatedResponse
  } catch (error) {
    handleCommonIbgeGovApiLocalidadesErrors(error)

    throw error
  }
}
