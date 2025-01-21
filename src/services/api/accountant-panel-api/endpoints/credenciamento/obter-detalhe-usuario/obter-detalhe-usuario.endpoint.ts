import { handleCommonAccountantPanelApiErrors } from '../../../errors/handle-errors'
import { accountantPanelApiHttpClientInstance } from '../../../http-client/http-client'
import { UsuarioViewModel, usuarioViewModelSchema } from '../../../schemas'

export async function credenciamentoObterDetalheUsuario(): Promise<UsuarioViewModel> {
  try {
    const response =
      await accountantPanelApiHttpClientInstance.get<UsuarioViewModel>(
        '/v1/Credenciamento/ObterDetalheUsuario'
      )

    const validatedResponse = usuarioViewModelSchema.parse(response.data)

    return validatedResponse
  } catch (error) {
    handleCommonAccountantPanelApiErrors(error)

    throw error
  }
}
