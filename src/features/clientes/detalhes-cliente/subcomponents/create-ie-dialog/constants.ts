import { AccountantIEStatusEnum } from '@/@types/accountant/accountant-customer'

import { CreateInscricaoEstadualSchema } from './modal-create-inscricao-estadual.schema'

export const formDefaultValues: CreateInscricaoEstadualSchema = {
  status: AccountantIEStatusEnum.ATIVA,
  inscricaoEstadual: '',
  razaoSocial: '',
  nomeFantasia: '',
  endereco: {
    cep: '',
    logradouro: '',
    bairro: '',
    numero: '',
    cidadeId: '',
    uf: '',
    paisId: '1058',
  },
}
