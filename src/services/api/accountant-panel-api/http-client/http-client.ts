import axios from 'axios'

import { handleAccountantPanelApiLocalToken } from './handle-local-token'
import {
  onFulfilledRequest,
  onRejectedRequest,
} from './interceptors/request-interceptors'
import {
  onFulfilledResponse,
  onRejectedResponse,
} from './interceptors/response-interceptor'

const token = handleAccountantPanelApiLocalToken.get()

export const accountantPanelApiHttpClientInstance = axios.create({
  baseURL: '',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Api-Key': '',
    'X-Aplicacao-Id': '',
    ...(token?.length ? { Authorization: `Bearer ${token}` } : {}),
  },
})

accountantPanelApiHttpClientInstance.interceptors.response.use(
  onFulfilledResponse(accountantPanelApiHttpClientInstance),
  onRejectedResponse(accountantPanelApiHttpClientInstance)
)

accountantPanelApiHttpClientInstance.interceptors.request.use(
  onFulfilledRequest(accountantPanelApiHttpClientInstance),
  onRejectedRequest(accountantPanelApiHttpClientInstance)
)
