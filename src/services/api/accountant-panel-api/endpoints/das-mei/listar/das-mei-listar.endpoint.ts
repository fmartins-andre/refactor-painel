import { handleCommonAccountantPanelApiErrors } from '../../../errors/handle-errors'
import { accountantPanelApiHttpClientInstance } from '../../../http-client/http-client'
import {
  ListaPaginada,
  listaPaginadaSchema,
} from '../../../schemas/shared/list-pagination.schema'
import {
  DasMeiListarRequestPayload,
  dasMeiListarRequestPayloadSchema,
  DasMeiViewModel,
  dasMeiViewModelSchema,
} from './das-mei-listar.schemas'

export type DasMeiListarResponse = ListaPaginada<DasMeiViewModel> | undefined

export async function dasMeiListar(
  params?: DasMeiListarRequestPayload,
  signal?: AbortSignal
): Promise<DasMeiListarResponse> {
  try {
    const validParams = dasMeiListarRequestPayloadSchema.parse(params ?? {})

    const response =
      await accountantPanelApiHttpClientInstance.get<DasMeiListarResponse>(
        '/v1/DAS/Listar',
        {
          signal,
          params: validParams,
          paramsSerializer: {
            indexes: null, // no brackets at all
          },
        }
      )

    const validatedResponse = listaPaginadaSchema(dasMeiViewModelSchema).parse(
      response.data
    )

    return validatedResponse
  } catch (error) {
    handleCommonAccountantPanelApiErrors(error)

    throw error
  }
}
