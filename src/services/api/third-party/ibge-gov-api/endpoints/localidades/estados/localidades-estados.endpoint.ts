import { ibgeGovApiHttpClientInstance } from '../../../http-client/http-client'
import { handleCommonIbgeGovApiLocalidadesErrors } from '../errors/handle-errors'
import {
  IbgeGovApiLocalidadesUf,
  ibgeGovApiLocalidadesUfSchema,
} from './localidades-estados.schemas'

export type IbgeGovApiLocalidadesEstadosListarResponse =
  | IbgeGovApiLocalidadesUf[]
  | undefined

export async function ibgeGovApiLocalidadesEstadosListar(
  params: undefined,
  signal?: AbortSignal
): Promise<IbgeGovApiLocalidadesEstadosListarResponse> {
  try {
    const response =
      await ibgeGovApiHttpClientInstance.get<IbgeGovApiLocalidadesEstadosListarResponse>(
        '/v1/localidades/estados',
        { signal }
      )

    const validatedResponse = ibgeGovApiLocalidadesUfSchema
      .array()
      .parse(response.data)

    return validatedResponse
  } catch (error) {
    handleCommonIbgeGovApiLocalidadesErrors(error)

    throw error
  }
}
