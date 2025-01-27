export interface CreateInterestResponse {
  status: boolean
  mensagem: string | null
  dados: {
    id: number
    empresaId: string | null | undefined
    nome: string | null | undefined
    email: string | null | undefined
    telefone: string | null | undefined
    termoDeUso: boolean | null | undefined
    codigo: string | null | undefined
    cnpjCpf: string | null | undefined
    crc: number | null | undefined
    razaoSocial: string | null | undefined
    nomeFantasia: string | null | undefined
    endereco: any
    servicoPrestado: any
    clientesAtendidos: any
    atendeMei: boolean | null | undefined
    atendeProdutorRural: boolean | null | undefined
    certificadoDigitalClientes: boolean | null | undefined
    emiteNotasClientes: boolean | null | undefined
    lead: any
    step: number
  }
  erros: any
}
