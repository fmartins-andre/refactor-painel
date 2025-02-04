import { handleCommonAccountantPanelApiErrors } from '../../../errors/handle-errors'
import { accountantPanelApiHttpClientInstance } from '../../../http-client/http-client'
import {
  DasMeiArquivoPagamento,
  dasMeiArquivoPagamentoSchema,
  DasMeiObterArquivoPagamentoRequestPayload,
  dasMeiObterArquivoPagamentoRequestPayloadSchema,
} from './das-mei-obter-arquivo-pagamento.schemas'

export type DasMeiObterArquivoPagamentoResponse =
  | DasMeiArquivoPagamento
  | undefined

export async function dasMeiObterArquivoPagamento(
  params?: DasMeiObterArquivoPagamentoRequestPayload,
  signal?: AbortSignal
): Promise<DasMeiObterArquivoPagamentoResponse> {
  try {
    const validParams = dasMeiObterArquivoPagamentoRequestPayloadSchema.parse(
      params ?? {}
    )

    const response =
      await accountantPanelApiHttpClientInstance.get<DasMeiObterArquivoPagamentoResponse>(
        `/v1/Cliente/${validParams.dasMeiId}/ObterDetalhe`,
        { signal, params: validParams }
      )

    const validatedResponse = dasMeiArquivoPagamentoSchema.parse(response.data)

    return validatedResponse
  } catch (error) {
    handleCommonAccountantPanelApiErrors(error)

    throw error
  }
}
