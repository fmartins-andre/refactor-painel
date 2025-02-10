import { AxiosError, HttpStatusCode } from 'axios'

import { handleCommonCnpjWsApiErrors } from '../../errors/handle-errors'
import { viaCepHttpClientInstance } from '../../http-client/http-client'
import {
  ViaCepApiLocalidadeDetalhes,
  ViaCepApiLocalidadeDetalhesRequestParams,
  viaCepApiLocalidadeDetalhesRequestParamsSchema,
  viaCepApiLocalidadeDetalhesSchema,
} from './cep.schemas'

export type ViaCepApiLocalidadeDetalhesResponse =
  | ViaCepApiLocalidadeDetalhes
  | undefined

export async function viaCepApiLocalidadeDetalhes(
  params: ViaCepApiLocalidadeDetalhesRequestParams,
  signal?: AbortSignal
): Promise<ViaCepApiLocalidadeDetalhesResponse> {
  try {
    const validParams =
      viaCepApiLocalidadeDetalhesRequestParamsSchema.parse(params)

    const response =
      await viaCepHttpClientInstance.get<ViaCepApiLocalidadeDetalhesResponse>(
        `/${validParams.cep}/json/`,
        { signal }
      )

    if (response.data && 'erro' in response.data)
      throw new AxiosError(
        'CEP não encontrado.',
        'BAD_REQUEST',
        response.config,
        response.request,
        {
          ...response,
          status: HttpStatusCode.BadRequest,
        }
      )

    const validatedResponse = viaCepApiLocalidadeDetalhesSchema.parse(
      response.data
    )

    return validatedResponse
  } catch (error) {
    handleCommonCnpjWsApiErrors(error)

    throw error
  }
}
