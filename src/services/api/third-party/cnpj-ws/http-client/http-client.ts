import axios from 'axios'

export const cnpjWsHttpClientInstance = axios.create({
  baseURL: 'https://comercial.cnpj.ws/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    x_api_token: import.meta.env.VITE_CNPJWS_API_KEY,
  },
})
