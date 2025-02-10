import { UfBrasilEnum } from '@/@types/system-wide-enums'
import { TipoPessoaModelEnum } from '@/services/api/accountant-panel-api/schemas'
import {
  EstabelecimentoModelEnum,
  IndicadorAtividadeModelEnum,
  RegimeEspecialModelEnum,
  RegimeTributarioClienteModelEnum,
  TipoRegimeSubstituicaoModelEnum,
} from '@/services/api/accountant-panel-api/schemas/cliente-models'

import { CustomerFormInput } from './cliente-info.schema'

export const formDefaultValues: CustomerFormInput = {
  tipoPessoa: TipoPessoaModelEnum.JURIDICA,
  documento: '',
  nomeRazaoSocial: '',
  nomeFantasia: null,
  telefone: '',
  email: '',
  endereco: {
    logradouro: '',
    numero: null,
    bairro: '',
    complemento: null,
    cidade: '',
    uf: UfBrasilEnum.ACRE,
    cep: '',
  },
  pessoaJuridica: {
    regimeTributario: RegimeTributarioClienteModelEnum.NENHUM,
    regimeSubstituicao: TipoRegimeSubstituicaoModelEnum.AMBOS,
    indicadorAtividade: IndicadorAtividadeModelEnum.OUTROS,
    estabelecimento: EstabelecimentoModelEnum.COMERCIOVAREJISTA,
    regimeEspecial: RegimeEspecialModelEnum.SEM_REGIME_ESPECIAL,
    inscricaoEstadual: null,
    inscricaoMunicipal: null,
    dataAbertura: null,
    monitorarDas: false,
  },
}
