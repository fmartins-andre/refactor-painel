import axios from 'axios'

export const viaCepHttpClientInstance = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
