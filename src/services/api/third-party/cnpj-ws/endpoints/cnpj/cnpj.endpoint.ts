import { handleCommonCnpjWsApiErrors } from '../../errors/handle-errors'
import { cnpjWsHttpClientInstance } from '../../http-client/http-client'
import {
  CnpjWsDadosEmpresa,
  CnpjWsDadosEmpresaRequestParams,
  cnpjWsDadosEmpresaRequestParamsSchema,
  cnpjWsDadosEmpresaSchema,
} from './cnpj.schemas'

export type CnpjWsDadosEmpresaResponse = CnpjWsDadosEmpresa | undefined

export async function cnpjWsDadosEmpresa(
  params: CnpjWsDadosEmpresaRequestParams,
  signal?: AbortSignal
): Promise<CnpjWsDadosEmpresaResponse> {
  try {
    const validParams = cnpjWsDadosEmpresaRequestParamsSchema.parse(params)

    const response =
      await cnpjWsHttpClientInstance.get<CnpjWsDadosEmpresaResponse>(
        `/cnpj/${validParams.cnpj}`,
        { signal }
      )

    const validatedResponse = cnpjWsDadosEmpresaSchema.parse(response.data)

    return validatedResponse
  } catch (error) {
    handleCommonCnpjWsApiErrors(error)

    throw error
  }
}
