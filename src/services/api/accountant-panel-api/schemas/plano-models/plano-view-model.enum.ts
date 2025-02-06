export enum StatusPagamentoPlanoModelEnum {
  EM_DIA = 'EmDia',
  INADIMPLENTE = 'Inadimplente',
}

export enum TipoPlanoModelEnum {
  PLANO_FIXO = 'PlanoFixo',
  PLANO_PERSONALIZADO = 'PlanoPersonalizado',
}

export enum TipoPagamentoPlanoModelEnum {
  PRE_PAGO = 'PrePago',
  POS_PAGO = 'PosPago',
}

export enum StatusRecorrenciaPlanoModelEnum {
  PENDENTE = 'Pendente',
  PROCESSADO = 'Processado',
  ERRO = 'Erro',
}

export enum StatusCobrancaFaturaPlanoModelEnum {
  PENDENTE = 'Pendente',
  PAGA = 'Paga',
  VENCIDA = 'Vencida',
  EXPIRADA = 'Expirada',
  CANCELADA = 'Cancelada',
  ESTORNADA = 'Estornada',
}

export enum StatusTributacaoFaturaPlanoModelEnum {
  PENDENTE = 'Pendente',
  TRIBUTADO = 'Tributado',
}
