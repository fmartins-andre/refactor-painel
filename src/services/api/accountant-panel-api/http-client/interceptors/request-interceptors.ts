import { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

import { handleAccountantPanelApiLocalToken } from '../handle-local-token'
import { onRejectedResponse } from './response-interceptor'

export const onFulfilledRequest =
  (apiInstance: AxiosInstance) =>
  (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const currentToken = handleAccountantPanelApiLocalToken.get()?.token

    if (currentToken) {
      apiInstance.defaults.headers.common.Authorization = `Bearer ${currentToken}`
      config.headers.Authorization = `Bearer ${currentToken}`
    }

    return Promise.resolve(config)
  }

export const onRejectedRequest = onRejectedResponse
