import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  HttpStatusCode,
} from 'axios'

import { handleAccountantPanelApiLocalToken } from '../handle-local-token'

export const onFulfilledResponse =
  (_apiInstance: AxiosInstance) =>
  (response: AxiosResponse): Promise<AxiosResponse> => {
    return Promise.resolve(response)
  }

export const onRejectedResponse =
  (apiInstance: AxiosInstance) =>
  async (error: AxiosError | Error): Promise<unknown> => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error)
    }

    // rejeita errors que não pode ser resolvidos com a atualização do token
    if (
      // erro 401 será tratado a partir daqui. erros diferente são rejeitados
      error.response?.status !== HttpStatusCode.Unauthorized &&
      // erro de rede (possível CORS) será tratado aqui. erros diferente são rejeitados
      error.code !== 'ERR_NETWORK'
    ) {
      return Promise.reject(error)
    }

    const currentStoredToken = handleAccountantPanelApiLocalToken.get()?.token

    // se é erro 401 e não tem token na aplicação, então desloga
    if (!currentStoredToken?.length) {
      handleAccountantPanelApiLocalToken.remove()
      window.location.reload()
      return Promise.reject(error)
    }

    // separa o request original para uso posterior, adicionado do parâmetro _retry
    type OriginalRequest = typeof error.config & { _retry: number }
    const originalRequest = error.config as OriginalRequest
    if (originalRequest._retry == null) originalRequest._retry = 0

    // se a mesma requisição foi tentada 2 vezes e continua em 401, então desloga
    if (originalRequest._retry >= 2) {
      handleAccountantPanelApiLocalToken.remove()
      window.location.reload()
      return Promise.reject(error)
    }

    // incrementa as tentativas de atualização do token
    originalRequest._retry++

    try {
      // tenta a revalidação do token
      // ATENÇÃO: não usar a instância existente. Chamar com instância nova/avulsa do axios
      const response = await axios.post<{ token: string } | undefined>(
        '/v1/Autenticacao/AtualizarToken',
        { token: currentStoredToken },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Api-Key': import.meta.env.VITE_ACCOUNTANT_PANEL_API_KEY,
            'X-Aplicacao-Id': import.meta.env.VITE_ACCOUNTANT_PANEL_API_APP_ID,
          },
        }
      )

      if (!response?.data?.token?.length) throw Error('Token Inválido')

      const { token } = response.data

      // armazenar o token. no interceptador de request, vai precisar dele atualizado
      handleAccountantPanelApiLocalToken.set(token)

      apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`
      originalRequest.headers.Authorization = `Bearer ${token}`

      // tenta novamente a requisição original com o novo token
      return apiInstance(originalRequest)
    } catch (refreshError) {
      // se a aquisição do token der erro, então desloga
      console.error('Token refresh failed:', refreshError)
      handleAccountantPanelApiLocalToken.remove()
      window.location.reload()
      return Promise.reject(error)
    }
  }
