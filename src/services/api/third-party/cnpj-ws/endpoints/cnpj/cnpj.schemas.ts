import { validateCNPJ } from 'validations-br'

import { z } from '@/lib/translated-zod'
import { zodTransformFromIsoToDate } from '@/lib/zod-transform-api-date'

export const cnpjWsDadosEmpresaRequestParamsSchema = z.object({
  cnpj: z.string().transform((arg, ctx): string => {
    const cleanedValue = arg.replace(/\D/g, '')

    if (validateCNPJ(cleanedValue)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'CNPJ inválido',
      })

      return z.NEVER
    }

    return cleanedValue
  }),
})

export type CnpjWsDadosEmpresaRequestParams = z.input<
  typeof cnpjWsDadosEmpresaRequestParamsSchema
>

// response

type basicInfo = {
  id: string
  descricao: string
}

type pais = {
  id: string
  iso2: string
  iso3: string
  nome: string
  comex_id: string
}

type estado = {
  id: string
  nome: string
  sigla: string
  ibge_id: number
}

type cidade = {
  id: string
  nome: string
  siafi_id: string
  ibge_id: number
}

type atividade = {
  id: string
  secao: string
  divisao: string
  grupo: string
  classe: string
  subclasse: string
  descricao: string
}

const socioSchema = z.object({
  cpf_cnpj_socio: z.custom<string>(),
  nome: z.custom<string>(),
  tipo: z.custom<string>(),
  data_entrada: z.custom<string>().transform(zodTransformFromIsoToDate),
  cpf_representante_legal: z.custom<string>(),
  nome_representante: z.custom<string>().nullable(),
  faixa_etaria: z.custom<string>(),
  atualizado_em: z.custom<string>().transform(zodTransformFromIsoToDate),
  pais_id: z.custom<string>(),
  pais: z.custom<pais>(),
  qualificacao_socio: z.custom<basicInfo>(),
  qualificacao_representante: z.custom<string>().nullable(),
})

const ieSchema = z.object({
  inscricao_estadual: z.custom<string>(),
  ativo: z.coerce.boolean(),
  atualizado_em: z.custom<string>().transform(zodTransformFromIsoToDate),
  estado: z.custom<estado>(),
})

const estabelecimentoSchema = z.object({
  cnpj: z.custom<string>(),
  atividades_secundarias: z.custom<atividade[]>(),
  cnpj_raiz: z.custom<string>(),
  cnpj_ordem: z.custom<string>(),
  cnpj_digito_verificador: z.custom<string>(),
  nome_fantasia: z.custom<string>(),
  situacao_cadastral: z.custom<string>(),
  data_situacao_cadastral: z
    .custom<string>()
    .transform(zodTransformFromIsoToDate),
  data_inicio_atividade: z
    .custom<string>()
    .transform(zodTransformFromIsoToDate),
  nome_cidade_exterior: z.custom<string>().nullable(),
  tipo_logradouro: z.custom<string>(),
  logradouro: z.custom<string>(),
  numero: z.custom<string>(),
  complemento: z.custom<string>(),
  bairro: z.custom<string>(),
  cep: z.custom<string>(),
  ddd1: z.custom<string>(),
  telefone1: z.custom<string>(),
  ddd2: z.custom<string>().nullable(),
  telefone2: z.custom<string>().nullable(),
  ddd_fax: z.custom<string>().nullable(),
  fax: z.custom<string>().nullable(),
  email: z.custom<string>(),
  situacao_especial: z.custom<string>().nullable(),
  data_situacao_especial: z
    .custom<string>()
    .transform(zodTransformFromIsoToDate),
  atualizado_em: z.custom<string>().transform(zodTransformFromIsoToDate),
  atividade_principal: z.custom<atividade[]>(),
  pais: z.custom<pais>(),
  estado: z.custom<estado>(),
  cidade: z.custom<cidade>(),
  motivo_situacao_cadastral: z.custom<string>().nullable(),
  inscricoes_estaduais: ieSchema.array(),
})

const simplesSchema = z.object({
  simples: z.custom<string>(),
  data_opcao_simples: z.custom<string>().transform(zodTransformFromIsoToDate),
  data_exclusao_simples: z
    .custom<string>()
    .nullable()
    .transform(zodTransformFromIsoToDate),
  mei: z.custom<string>(),
  data_opcao_mei: z
    .custom<string>()
    .nullable()
    .transform(zodTransformFromIsoToDate),
  data_exclusao_mei: z
    .custom<string>()
    .nullable()
    .transform(zodTransformFromIsoToDate),
  atualizado_em: z.custom<string>().transform(zodTransformFromIsoToDate),
})

export const cnpjWsDadosEmpresaSchema = z.object({
  cnpj_raiz: z.custom<string>(),
  razao_social: z.custom<string>(),
  capital_social: z.custom<string>(),
  responsavel_federativo: z.custom<string>().nullish(),
  atualizado_em: z.custom<string>().transform(zodTransformFromIsoToDate),
  porte: z.custom<basicInfo>(),
  natureza_juridica: z.custom<basicInfo>(),
  qualificacao_do_responsavel: z.custom<basicInfo>(),
  socios: socioSchema.array(),
  simples: simplesSchema,
  estabelecimento: estabelecimentoSchema,
})

export type CnpjWsDadosEmpresa = z.output<typeof cnpjWsDadosEmpresaSchema>
