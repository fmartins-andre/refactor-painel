export enum AccountantSubscriptionInvoiceStatusEnum {
  PAGA = 'paga',
  PENDENTE = 'pendente',
  EXPIRADA = 'expirada',
  CANCELADA = 'cancelada',
  ESTORNADA = 'estornada',
  EM_PROTESTO = 'emProtesto',
  PROTESTADA = 'protestada',
  PARCIALMENTE_PAGA = 'parcialmentePaga',
  PREVISTA = 'prevista',
  VENCIDA = 'vencida',
}

export enum AccountantSubscriptionInvoicePaymentMethodEnum {
  CARTAO = 'cartao',
  PIX = 'pix',
  BOLETO = 'boleto',
}

export interface AccountantSubscriptionInvoiceOnList {
  id: number
  pedidoNfseId: number
  status: AccountantSubscriptionInvoiceStatusEnum
  valorTotal: number
  dataCadastro: string
  dataPagamento: string
  dataVencimento: string
}

export type AccountantSubscriptionInvoicesParams = Partial<{
  dataCriacaoInicial: string
  dataCriacaoFinal: string
  dataPagamentoInicial: string
  dataPagamentoFinal: string
  dataVencimentoInicial: string
  dataVencimentoFinal: string
  status: AccountantSubscriptionInvoiceStatusEnum[]
  formaPagamento: AccountantSubscriptionInvoicePaymentMethodEnum[]
  page: number
  perPage: number
}>
