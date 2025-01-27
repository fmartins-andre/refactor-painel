import { AccountantCustomerTypeEnum } from '@/@types/accountant/accountant-customer'

import { CustomerFormStep01Input } from './customer-form-step-01.schema'

export const formDefaultValues: CustomerFormStep01Input = {
  tipoPessoa: AccountantCustomerTypeEnum.PJ,
  cnpjCpf: '',
  telefoneWhatsapp: '',
  razaoSocial: '',
  email: '',
  meiDataAbertura: null,
  inscricaoEstadual: null,
  inscricaoMunicipal: null,
  isMei: false,
}

export const customerTypeOptions = [
  { label: 'Pessoa Física', value: AccountantCustomerTypeEnum.PF },
  { label: 'Pessoa Jurídica', value: AccountantCustomerTypeEnum.PJ },
]
