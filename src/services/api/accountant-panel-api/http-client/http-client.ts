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

const token = handleAccountantPanelApiLocalToken.get()?.token

export const accountantPanelApiHttpClientInstance = axios.create({
  baseURL: import.meta.env.VITE_ACCOUNTANT_PANEL_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Api-Key': import.meta.env.VITE_ACCOUNTANT_PANEL_API_KEY,
    'X-Aplicacao-Id': import.meta.env.VITE_ACCOUNTANT_PANEL_API_APP_ID,
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
