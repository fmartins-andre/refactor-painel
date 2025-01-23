import { handleCommonAccountantPanelApiErrors } from '../../../errors/handle-errors'
import { accountantPanelApiHttpClientInstance } from '../../../http-client/http-client'
import {
  VisaoGeralDas,
  VisaoGeralDasListarRequestPayload,
  visaoGeralDasListarRequestPayloadSchema,
  visaoGeralDasSchema,
} from './das-listar.schemas'

export type VisaoGeralDasListarResponse = VisaoGeralDas[] | undefined

export async function visaoGeralDasListar(
  params: VisaoGeralDasListarRequestPayload,
  signal?: AbortSignal
): Promise<VisaoGeralDasListarResponse> {
  try {
    const validParams = visaoGeralDasListarRequestPayloadSchema.parse(params)

    const response =
      await accountantPanelApiHttpClientInstance.get<VisaoGeralDasListarResponse>(
        '/v1/VisaoGeral/DAS/Listar',
        { params: validParams, signal }
      )

    const validatedResponse = visaoGeralDasSchema.array().parse(response.data)

    return validatedResponse
  } catch (error) {
    handleCommonAccountantPanelApiErrors(error)

    throw error
  }
}
