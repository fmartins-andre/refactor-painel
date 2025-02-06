import { handleCommonAccountantPanelApiErrors } from '../../../errors/handle-errors'
import { accountantPanelApiHttpClientInstance } from '../../../http-client/http-client'
import {
  ClienteInputModel,
  clienteInputModelSchema,
} from '../../../schemas/cliente-models'
import {
  ClienteInserirReturnedId,
  clienteInserirReturnedIdSchema,
} from './cliente-inserir.schemas'

export type ClienteInserirResponse = ClienteInserirReturnedId | undefined

export async function clienteInserir(
  payload: ClienteInputModel
): Promise<ClienteInserirResponse> {
  try {
    const validPayload = clienteInputModelSchema.parse(payload)

    const response =
      await accountantPanelApiHttpClientInstance.post<ClienteInserirResponse>(
        '/v1/Cliente/Inserir',
        validPayload
      )

    const validatedResponse = clienteInserirReturnedIdSchema.parse(
      response.data
    )

    return validatedResponse
  } catch (error) {
    handleCommonAccountantPanelApiErrors(error)

    throw error
  }
}
