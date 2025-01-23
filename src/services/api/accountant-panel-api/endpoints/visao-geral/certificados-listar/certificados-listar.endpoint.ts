import { handleCommonAccountantPanelApiErrors } from '../../../errors/handle-errors'
import { accountantPanelApiHttpClientInstance } from '../../../http-client/http-client'
import {
  VisaoGeralCertificado,
  visaoGeralCertificadoSchema,
  VisaoGeralCertificadosListarRequestPayload,
  visaoGeralCertificadosListarRequestPayloadSchema,
} from './certificados-listar.schemas'

export type VisaoGeralCertificadosListarResponse =
  | VisaoGeralCertificado[]
  | undefined

export async function visaoGeralCertificadosListar(
  params: VisaoGeralCertificadosListarRequestPayload,
  signal?: AbortSignal
): Promise<VisaoGeralCertificadosListarResponse> {
  try {
    const validParams =
      visaoGeralCertificadosListarRequestPayloadSchema.parse(params)

    const response =
      await accountantPanelApiHttpClientInstance.get<VisaoGeralCertificadosListarResponse>(
        '/v1/VisaoGeral/Certificados/Listar',
        { params: validParams, signal }
      )

    const validatedResponse = visaoGeralCertificadoSchema
      .array()
      .parse(response.data)

    return validatedResponse
  } catch (error) {
    handleCommonAccountantPanelApiErrors(error)

    throw error
  }
}
