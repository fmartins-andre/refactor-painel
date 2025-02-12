import { TipoPessoaModelEnum } from '@/services/api/accountant-panel-api/schemas'

import { CustomerFormStep01Input } from './customer-form-step-01.schema'

export const formDefaultValues: CustomerFormStep01Input = {
  tipoPessoa: TipoPessoaModelEnum.JURIDICA,
  documento: '',
  telefone: '',
  nomeRazaoSocial: '',
  email: '',
  inscricaoMunicipal: null,
  nomeFantasia: null,
  inscricaoEstadual: '',
}
