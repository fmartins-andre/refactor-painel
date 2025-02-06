import { handleCommonAccountantPanelApiErrors } from '../../../errors/handle-errors'
import { accountantPanelApiHttpClientInstance } from '../../../http-client/http-client'
import {
  ClienteAtualizarRequestParams,
  clienteAtualizarRequestParamsSchema,
} from './cliente-atualizar.schemas'

export type ClienteAtualizarResponse = void

export async function clienteAtualizar(
  params: ClienteAtualizarRequestParams
): Promise<ClienteAtualizarResponse> {
  try {
    const { clienteId, payload } =
      clienteAtualizarRequestParamsSchema.parse(params)

    await accountantPanelApiHttpClientInstance.post<ClienteAtualizarResponse>(
      `/v1/Cliente/${clienteId}/Atualizar`,
      payload
    )
  } catch (error) {
    handleCommonAccountantPanelApiErrors(error)

    throw error
  }
}
