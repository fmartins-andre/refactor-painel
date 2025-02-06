import { handleCommonAccountantPanelApiErrors } from '../../../errors/handle-errors'
import { accountantPanelApiHttpClientInstance } from '../../../http-client/http-client'
import {
  ClienteViewModel,
  clienteViewModelSchema,
} from '../../../schemas/cliente-models'
import {
  ClienteObterDetalheRequestPayload,
  clienteObterDetalheRequestPayloadSchema,
} from './cliente-obter-detalhe.schemas'

export type ClienteObterDetalheResponse = ClienteViewModel | undefined

export async function clienteObterDetalhe(
  params?: ClienteObterDetalheRequestPayload,
  signal?: AbortSignal
): Promise<ClienteObterDetalheResponse> {
  try {
    const validParams = clienteObterDetalheRequestPayloadSchema.parse(
      params ?? {}
    )

    const response =
      await accountantPanelApiHttpClientInstance.get<ClienteObterDetalheResponse>(
        `/v1/Cliente/${validParams.clienteId}/ObterDetalhe`,
        { signal, params: validParams }
      )

    const validatedResponse = clienteViewModelSchema.parse(response.data)

    return validatedResponse
  } catch (error) {
    handleCommonAccountantPanelApiErrors(error)

    throw error
  }
}
