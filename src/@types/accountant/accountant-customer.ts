export enum AccountantCustomerTypeEnum {
  PJ = 'J',
  PF = 'F',
}

export interface AccountantCustomer {
  tipoPessoa: AccountantCustomerTypeEnum
  cnpjCpf: string
  razaoSocial: string
  nomeFantasia: string
  isProdutorRural: boolean
  telefoneWhatsapp: string
  telefoneFinanceiro: string
  inscricaoEstadual: string
  inscricaoMunicipal: string
  cep: string
  logradouro: string
  numero: string
  bairro: string
  complemento: string | null
  cidadeId: string
  uf: string
  paisId: string
  crt: string
  email: string
  isMei: boolean
  meiDataAbertura: string
  regimeEspecialId: string
  emiteNfe: boolean
  emiteNfce: boolean
  emiteNfse: boolean
  emiteMdfe: boolean
  emiteCte: boolean
  emiteCteos: boolean
}

export enum AccountantIEStatusEnum {
  ATIVA = 'A',
  CANCELADA = 'C',
  DESATIVADA = 'D',
}

interface AccountantCustomerIEAddress {
  cep: string
  logradouro: string
  bairro: string
  cidadeId: string
  paisId: string
}

export interface CreateAccountantCustomerIEPayload {
  empresaId: number
  status: AccountantIEStatusEnum
  inscricaoEstadual: string
  razaoSocial: string
  nomeFantasia: string
  endereco: AccountantCustomerIEAddress
}

export type AccountantCustomerUpdatePayload = AccountantCustomer & {
  empresaId: number
  inscricaoId: number
}
