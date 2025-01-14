import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  HttpStatusCode,
} from 'axios'

import { handleAccountantPanelApiLocalToken } from '../handle-local-token'

export const onFulfilledResponse =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (apiInstance: AxiosInstance) =>
    (response: AxiosResponse): Promise<AxiosResponse> => {
      return Promise.resolve(response)
    }

export const onRejectedResponse =
  (apiInstance: AxiosInstance) =>
  async (error: AxiosError | Error): Promise<unknown> => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error)
    }

    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      return Promise.reject(error)
    }

    const currentToken = handleAccountantPanelApiLocalToken.get()

    if (!currentToken?.length) {
      return Promise.reject(error)
    }

    type OriginalRequest = typeof error.config & { _retry: boolean }
    const originalRequest = error.config as OriginalRequest

    if (originalRequest?._retry) {
      return Promise.reject(error)
    }

    originalRequest._retry = true // Mark the request as retried to avoid infinite loops.

    try {
      const response = await axios.post('https://your.auth.server/refresh', {
        refreshToken: currentToken,
      })
      const { token } = response.data

      handleAccountantPanelApiLocalToken.set(token)

      apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`

      return apiInstance(originalRequest) // Retry the original request with the new access token.
    } catch (refreshError) {
      console.error('Token refresh failed:', refreshError)
      handleAccountantPanelApiLocalToken.remove()
      return Promise.reject(refreshError)
    }
  }
