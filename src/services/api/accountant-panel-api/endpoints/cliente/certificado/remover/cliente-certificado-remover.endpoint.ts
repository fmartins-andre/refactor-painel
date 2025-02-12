import { handleCommonAccountantPanelApiErrors } from '../../../../errors/handle-errors'
import { accountantPanelApiHttpClientInstance } from '../../../../http-client/http-client'
import {
  ClienteCertificadoRemoverRequestPayload,
  clienteCertificadoRemoverRequestPayloadSchema,
} from './cliente-certificado-remover.schemas'

export type ClienteCertificadoRemoverResponse = void

export async function clienteCertificadoRemover(
  params: ClienteCertificadoRemoverRequestPayload
): Promise<ClienteCertificadoRemoverResponse> {
  try {
    const validParams =
      clienteCertificadoRemoverRequestPayloadSchema.parse(params)

    await accountantPanelApiHttpClientInstance.delete<ClienteCertificadoRemoverResponse>(
      `/v1/Cliente/${validParams.clienteId}/Certificado/Remover`
    )
  } catch (error) {
    handleCommonAccountantPanelApiErrors(error)

    throw error
  }
}
