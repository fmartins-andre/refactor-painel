import axios from 'axios'

export const brasilApiHttpClientInstance = axios.create({
  baseURL: 'https://brasilapi.com.br/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
