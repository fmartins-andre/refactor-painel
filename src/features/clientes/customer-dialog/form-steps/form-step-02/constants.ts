import { CustomerFormStep02Input } from './customer-form-step-02.schema'

export const formDefaultValues: CustomerFormStep02Input = {
  endereco: {
    logradouro: '',
    numero: null,
    bairro: '',
    complemento: null,
    cidade: '',
    uf: null,
    cep: '',
  },
}
