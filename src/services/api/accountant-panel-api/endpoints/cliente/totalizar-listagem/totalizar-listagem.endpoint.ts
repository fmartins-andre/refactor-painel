import { handleCommonAccountantPanelApiErrors } from '../../../errors/handle-errors'
import { accountantPanelApiHttpClientInstance } from '../../../http-client/http-client'
import {
  ClienteTotalizarListagemRequestPayload,
  clienteTotalizarListagemRequestPayloadSchema,
  SumarioTotalClientes,
  sumarioTotalClientesSchema,
} from './totalizar-listagem.schemas'

export type ClienteTotalizarListagemResponse = SumarioTotalClientes | undefined

export async function clienteTotalizarListagem(
  params?: ClienteTotalizarListagemRequestPayload,
  signal?: AbortSignal
): Promise<ClienteTotalizarListagemResponse> {
  try {
    const validParams = clienteTotalizarListagemRequestPayloadSchema.parse(
      params ?? {}
    )

    const response =
      await accountantPanelApiHttpClientInstance.get<ClienteTotalizarListagemResponse>(
        '/v1/Cliente/TotalizarListagem',
        { signal, params: validParams }
      )

    const validatedResponse = sumarioTotalClientesSchema.parse(response.data)

    return validatedResponse
  } catch (error) {
    handleCommonAccountantPanelApiErrors(error)

    throw error
  }
}
