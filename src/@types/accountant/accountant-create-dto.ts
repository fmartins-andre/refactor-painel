export interface CreateInterestSystemDTO {
  step?: number
  nome: string | null | undefined
  email: string | null | undefined
  telefone: string | null | undefined
  termoDeUso: boolean | null | undefined
  id: number | null | undefined
  codigo: string | null | undefined
  cnpjCpf: string | null | undefined
  razaoSocial: string | null | undefined
  nomeFantasia: string | null | undefined
  crc: number | null | undefined
  endereco:
    | {
        cep: string
        cidadeId: string
        estadoId: string
        bairro: string
        logradouro: string
      }
    | null
    | undefined

  atendeMei: boolean | null | undefined
  atendeProdutorRural: boolean | null | undefined
  certificadoDigitalClientes: boolean | null | undefined
  clientesAtendidos: number | null | undefined
  emiteNotasClientes: boolean | null | undefined
  lead: number | null | undefined
  servicoPrestado: number | null | undefined
  senha: string | null | undefined
  senha_confirmation: string | null | undefined
}
