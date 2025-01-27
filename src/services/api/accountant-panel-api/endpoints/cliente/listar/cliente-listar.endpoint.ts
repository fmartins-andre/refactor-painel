import { handleCommonAccountantPanelApiErrors } from '../../../errors/handle-errors'
import { accountantPanelApiHttpClientInstance } from '../../../http-client/http-client'
import {
  ClienteListagemViewModel,
  clienteListagemViewModelSchema,
} from '../../../schemas/cliente-view-model'
import {
  ListaPaginada,
  listaPaginadaSchema,
} from '../../../schemas/shared/list-pagination.schema'
import {
  ClienteListarRequestPayload,
  clienteListarRequestPayloadSchema,
} from './cliente-listar.schemas'

export type ClienteListarResponse =
  | ListaPaginada<ClienteListagemViewModel>
  | undefined

export async function clienteListar(
  params?: ClienteListarRequestPayload,
  signal?: AbortSignal
): Promise<ClienteListarResponse> {
  try {
    const validParams = clienteListarRequestPayloadSchema.parse(params ?? {})

    const response =
      await accountantPanelApiHttpClientInstance.get<ClienteListarResponse>(
        '/v1/Cliente/Listar',
        { signal, params: validParams }
      )

    const validatedResponse = listaPaginadaSchema(
      clienteListagemViewModelSchema
    ).parse(response.data)

    return validatedResponse
  } catch (error) {
    handleCommonAccountantPanelApiErrors(error)

    throw error
  }
}
