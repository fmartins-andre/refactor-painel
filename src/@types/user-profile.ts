export interface UserProfile {
  id: number
  email: string
  nomeUsuario: string
  empresaId: number
  codigoRecuperacao: string
  tipoPerfil: string
  primeiroAcesso: 0 | 1
  tokensValidos: string
  dataCadastro: string
  dataEdicao: string
  sistemaLegado: string
  telefone: string | null
  ativo: boolean
  current_token: string
  podeSolicitarCashback: boolean
  permissoes: UserProfilePermission[]
  infoParceiro: UserProfilePartnerInfo
  empresa: UserProfileCompanyInfo
  permissoesUsuario: UserProfileUserPermission
}

export interface UserProfileCompanyInfo {
  inicioRecorrencia: string
  assinaturaSistemaId: number | null
  iuguId: string | null
  plan_invoice_code: string | null
  id: number
  parceiroId: number
  dt_vencimento_assinatura: string | null
  sub_assinatura_dt: number | null
  produtorRuralId: number | null
  interesseSistemaId: number | null
  dadosMeiId: number | null
  dadosEmissaoCertificadoId: number | null
  assinaturaId: number | null
  regimeEspecialId: string
  emissaoRapida: unknown
  setorId: string | null
  segmentoId: string | null
  tipoPessoa: 'J' | 'F'
  tipoCertificado: unknown
  status: string
  lastStatus: string | null
  crt: string | null
  cnpjCpf: string | null
  dataVencimentoCertificado: string | null
  produtorRural: boolean
  credito: number
  empresaEstagioUsuario: number
  aplicacaoCertificado: unknown
  empresaEstagio: unknown
  ieSubstitutoTributario: string | null
  qtdNotasAnteriores: number | null
  valorNotasAnteriores: number
  aplicacao: string
  logo: string | null
  hubspotId: number | null
  tokenIbpt: string | null
  emailNota: string | null
  mensagemCadastro: string | null
  emailBoasVindas: 0 | 1
  bloqueioPagamento: 0 | 1
  parceiro: 0 | 1
  acessoriaContabil: 0 | 1
  emiteNotaCompra: 0 | 1
  limiteCompras: string
  dataFimAcessoriaContabil: string | null
  jaEmitiu: 0 | 1
  dataCadastro: string | null
  dataEdicao: string | null
  qtdNotasAEmitir: string | null
  lead: string | null
  emiteNfe: boolean
  emiteNfce: boolean
  emiteNfse: boolean
  emiteCte: boolean
  emiteCteos: false
  emiteMdfe: boolean
  videoCompetie: 0 | 1
  planoId: number | null
  fimRecorrencia: string | null
  iobId: number | null
  dadosBancarios?: {
    id: 1
    empresaId: 5
    cpfResponsavel: '45402602000'
    nomeResponsavel: 'NovoEmissor'
    telefoneResponsavel: '62992106443'
    agenciaBancaria: '111'
    digitoAgenciaBancaria: '111'
    contaBancaria: '1'
    digitoContaBancaria: '1'
    bancoId: '1'
    tipoContaBancaria: 'CC'
    status: 'P'
    chavePix: '111'
    dataCadastro: '2023-07-13T17:31:57.000000Z'
    dataEdicao: '2024-06-05T22:28:35.000000Z'
  } | null
  inscricao?: UserProfileCompanyRegistryInfo | null
}

interface UserProfileBasePartnerInfo {
  id: number
  parceiroPrincipalId: 0 | 1
  urlSufixo: string | null
  logoPadrao: string | null
  logoLogin: string | null
  prestaSuporte: 0 | 1
  tipo: string
  cliente: string | null
  valorCliente: number | null
  urlTawk: string | null
  urlWpp: string | null
  contrato: number | null
  cashback: number | null
  percentualCashback: number
  cashbackGratuito: unknown
  qtdLicencas: number | null
  valorEsperado: number | null
  solicitacao: unknown
  razaoSocial: string | null
  empresaDoParceiro?: UserProfileCompanyInfo | null
}

type UserProfilePartnerInfo = UserProfileBasePartnerInfo & {
  parceiroPrincipal?: UserProfileBasePartnerInfo | null
  assinatura?: UserProfilePartnerSubscriptionInfo | null
}

interface UserProfilePartnerSubscriptionInfo {
  id: number
  planoId: number
  gatewayId: string | null
  inicio: string | null
  fim: string | null
  status: number
  suspensa: 0 | 1
  dataCadastro: string | null
  dataEdicao: string | null
  parcelas: number | null
  contadorId: number
}

interface UserProfilePermission {
  id: number
  idPermissaoCategoria: number
  nome: string
  roleKey: string
}

interface UserProfileUserPermission {
  id: number
  idPermissao: number
  idUsuario: number
  permissao: UserProfilePermission
}

interface UserProfileCompanyRegistryAddressCityInfo {
  id: string
  ufId: string
  nome: string
  homologadaNfse: 0 | 1
  padraoNfse: string
  dataCadastro: string
  dataEdicao: string | null
}

interface UserProfileCompanyRegistryAddressCountryInfo {
  id: number
  nome: string
}

interface UserProfileCompanyRegistryAddress {
  id: number
  paisId: number
  cidadeId: string
  cep: string
  logradouro: string
  numero: string
  bairro: string
  complemento: string | null
  tipoLogradouro: string | null
  dataCadastro: string
  dataEdicao: string
  cidade: UserProfileCompanyRegistryAddressCityInfo | null
  pais: UserProfileCompanyRegistryAddressCountryInfo | null
}

interface UserProfileCompanyRegistryPhone {
  id: number
  inscricaoId: number
  tipo: string
  telefone: string
  dataCadastro: string
  dataEdicao: string
}

interface UserProfileCompanyRegistryEmail {
  id: number
  inscricaoId: number
  email: string
  dataCadastro: string
  dataEdicao: string
}

export interface UserProfileCompanyRegistryInfo {
  id: number
  empresaId: number
  motorFiscalId: number
  configuracaoCteId: number
  configuracaoCteOsId: number
  configuracaoMdfeId: number
  configuracaoNfeId: number
  configuracaoNfceId: number
  configuracaoNfseId: number
  contadorId: number
  enderecoId: number
  usaApp: 0 | 1
  inscricaoEstadual: string | null
  inscricaoMunicipal: string | null
  razaoSocial: string | null
  nomeFantasia: string | null
  status: string
  endereco?: UserProfileCompanyRegistryAddress | null
  telefoneWhatsapp?: UserProfileCompanyRegistryPhone | null
  telefonePrincipal?: UserProfileCompanyRegistryPhone | null
  emailPrincipal?: UserProfileCompanyRegistryEmail | null
}
