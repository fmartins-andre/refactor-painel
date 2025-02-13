import {
  EstabelecimentoModelEnum,
  IndicadorAtividadeModelEnum,
  RegimeEspecialModelEnum,
  RegimeTributarioClienteModelEnum,
  TipoRegimeSubstituicaoModelEnum,
} from '@/services/api/accountant-panel-api/schemas/cliente-models'

import { CustomerFormStatePayload } from './helpers/use-customer-form-state'

export const REQUIRED_FIELD_MESSAGE = 'Obrigatório'

export const initialCustomerPayload: DeepNullable<CustomerFormStatePayload> = {
  id: null,
  tipoPessoa: null,
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
    uf: null,
    cep: '',
  },

  inscricoesEstaduais: [
    {
      ie: null,
      endereco: null,
      nomeFantasia: null,
    },
  ],

  regimeTributario: RegimeTributarioClienteModelEnum.NENHUM,
  regimeEspecial: RegimeEspecialModelEnum.SEM_REGIME_ESPECIAL,
  inscricaoMunicipal: null,
  // campos fora do formulário
  regimeSubstituicao: TipoRegimeSubstituicaoModelEnum.AMBOS,
  indicadorAtividade: IndicadorAtividadeModelEnum.OUTROS,
  estabelecimento: EstabelecimentoModelEnum.COMERCIOVAREJISTA,
  monitorarDas: false,

  certificadoDigital: null,
  sincronizarNfseTomado: false,
  usuarioLoginNfse: null,
  senhaLoginNfse: null,
  utilizaRadarxml: false,
  utilizaValidadorTributario: false,
  integracaoGdfe: false,
  integracaoDominio: false,
  tokenIntegracaoDominio: null,
  utilizaEmissor: false,
  modulosEmissor: {
    nfe: false,
    nfce: false,
    nfse: false,
    cte: false,
    mdfe: false,
  },
}
