import { handleCommonAccountantPanelApiErrors } from '../../../errors/handle-errors'
import { accountantPanelApiHttpClientInstance } from '../../../http-client/http-client'
import { UsuarioViewModel, usuarioViewModelSchema } from '../../../schemas'

export type CredenciamentoObterDetalheUsuarioResponse =
  | UsuarioViewModel
  | undefined

export async function credenciamentoObterDetalheUsuario(
  params: undefined,
  signal?: AbortSignal
): Promise<CredenciamentoObterDetalheUsuarioResponse> {
  try {
    const response =
      await accountantPanelApiHttpClientInstance.get<CredenciamentoObterDetalheUsuarioResponse>(
        '/v1/Credenciamento/ObterDetalheUsuario',
        { signal }
      )

    const validatedResponse = usuarioViewModelSchema.parse(response.data)

    return validatedResponse
  } catch (error) {
    handleCommonAccountantPanelApiErrors(error)

    throw error
  }
}
