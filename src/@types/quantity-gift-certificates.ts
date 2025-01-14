import { Pagination } from './pagination'

export type QuantityGiftCertificates = Pagination<{
  id: number
  status: { label: string; value: string }
  donoId: number
  empresaId: string
  cadastroId: string
  cnpjCpf: string
  razaoSocial: string
  dataUtilizacao: string
  dataCadastro: string
  dataEdicao: string
  senhaAgenda: string
}>

export interface ReturnGiftsAvailable {
  quantidade: number
}
