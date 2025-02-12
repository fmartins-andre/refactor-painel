import {
  CertificadoDigitalViewModel,
  certificadoDigitalViewModelSchema,
} from '@/services/api/accountant-panel-api/schemas'

import { handleCommonAccountantPanelApiErrors } from '../../../../errors/handle-errors'
import { accountantPanelApiHttpClientInstance } from '../../../../http-client/http-client'
import {
  ClienteCertificadoInserirRequestPayload,
  clienteCertificadoInserirRequestPayloadSchema,
} from './cliente-certificado-inserir.schemas'

export type ClienteCertificadoInserirResponse =
  | CertificadoDigitalViewModel
  | undefined

export async function clienteCertificadoInserir(
  params: ClienteCertificadoInserirRequestPayload
): Promise<ClienteCertificadoInserirResponse> {
  try {
    const validParams =
      clienteCertificadoInserirRequestPayloadSchema.parse(params)

    const response =
      await accountantPanelApiHttpClientInstance.post<ClienteCertificadoInserirResponse>(
        `/v1/Cliente/${validParams.clienteId}/Certificado/Inserir`,
        validParams.payload
      )

    const validatedResponse = certificadoDigitalViewModelSchema.parse(
      response.data
    )

    return validatedResponse
  } catch (error) {
    handleCommonAccountantPanelApiErrors(error)

    throw error
  }
}
