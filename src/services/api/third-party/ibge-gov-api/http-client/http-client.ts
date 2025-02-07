import axios from 'axios'

export const ibgeGovApiHttpClientInstance = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
