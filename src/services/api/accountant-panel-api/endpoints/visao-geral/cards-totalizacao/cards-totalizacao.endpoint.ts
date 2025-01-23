import { handleCommonAccountantPanelApiErrors } from '../../../errors/handle-errors'
import { accountantPanelApiHttpClientInstance } from '../../../http-client/http-client'
import {
  VisaoGeralCardTotalizacao,
  visaoGeralCardTotalizacaoSchema,
} from './cards-totalizacao.schemas'

export type VisaoGeralCardTotalizacaoResponse =
  | VisaoGeralCardTotalizacao
  | undefined

export async function visaoGeralCardTotalizacao(
  params: undefined,
  signal?: AbortSignal
): Promise<VisaoGeralCardTotalizacaoResponse> {
  try {
    const response =
      await accountantPanelApiHttpClientInstance.get<VisaoGeralCardTotalizacaoResponse>(
        '/v1/VisaoGeral/CardsTotalizacao',
        { signal }
      )

    const validatedResponse = visaoGeralCardTotalizacaoSchema.parse(
      response.data
    )

    return validatedResponse
  } catch (error) {
    handleCommonAccountantPanelApiErrors(error)

    throw error
  }
}
