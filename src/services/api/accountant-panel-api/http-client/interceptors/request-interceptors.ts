import { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

import { onRejectedResponse } from './response-interceptor'

export const onFulfilledRequest =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (apiInstance: AxiosInstance) =>
    (
      response: InternalAxiosRequestConfig
    ): Promise<InternalAxiosRequestConfig> => {
      return Promise.resolve(response)
    }

export const onRejectedRequest = onRejectedResponse
