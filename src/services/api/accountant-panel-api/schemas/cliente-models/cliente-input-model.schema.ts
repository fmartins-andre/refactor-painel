import { validateCNPJ, validateCPF, validatePhone } from 'validations-br'

import { z } from '@/lib/translated-zod'

import { certificadoDigitalInputModelSchema } from '../certificado-digital-models'
import { enderecoInputModelSchema } from '../endereco-models'
import { TipoPessoaModelEnum } from '../shared'
import {
  EstabelecimentoModelEnum,
  IndicadorAtividadeModelEnum,
  RegimeEspecialModelEnum,
  RegimeTributarioClienteModelEnum,
  TipoRegimeSubstituicaoModelEnum,
} from './cliente-view-model.enum'
import { inscricaoEstadualInputModelSchema } from './inscricao-estadual-input-model.schema'
import { modulosEmissorInputModelSchema } from './modulos-emissor-input-model.schema'

export const clienteInputModelSchema = z.object({
  tipoPessoa: z.custom<TipoPessoaModelEnum>(),
  documento: z
    .string()
    .nonempty()
    .transform((arg, ctx) => {
      const value = arg.replace(/\D/g, '')

      if (value.length === 11 && validateCPF(value)) return value
      if (value.length === 14 && validateCNPJ(value)) return value

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Documento inválido',
      })

      return z.NEVER
    }),
  nomeRazaoSocial: z.string().max(200).nonempty(),
  nomeFantasia: z.string().max(60).nullable(),
  telefone: z
    .string()
    .nonempty()
    .transform((arg, ctx) => {
      const value = arg.replace(/\D/g, '')

      if (validatePhone(value)) return value

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Telefone inválido',
      })

      return z.NEVER
    }),
  email: z.string().email().nonempty(),

  regimeTributario: z.nativeEnum(RegimeTributarioClienteModelEnum),
  regimeSubstituicao: z.nativeEnum(TipoRegimeSubstituicaoModelEnum),
  indicadorAtividade: z.nativeEnum(IndicadorAtividadeModelEnum),
  estabelecimento: z.nativeEnum(EstabelecimentoModelEnum),
  regimeEspecial: z.nativeEnum(RegimeEspecialModelEnum),
  inscricaoMunicipal: z
    .string()
    .max(15)
    .nullable()
    .transform<string | null>(
      (value) => value?.toUpperCase().replace(/[^\dA-Z]/g, '') ?? null
    ),
  monitorarDas: z.boolean(),

  endereco: enderecoInputModelSchema,

  inscricoesEstaduais: inscricaoEstadualInputModelSchema.array().nullish(),

  certificadoDigital: certificadoDigitalInputModelSchema.nullish(),

  sincronizarNfseTomado: z.boolean().optional(),
  usuarioLoginNfse: z.string().nullish(),
  senhaLoginNfse: z.string().nullish(),

  utilizaRadarxml: z.boolean().optional(),
  utilizaValidadorTributario: z.boolean().optional(),
  utilizaEmissor: z.boolean().optional(),

  integracaoGdfe: z.boolean().optional(),
  integracaoDominio: z.boolean().optional(),
  tokenIntegracaoDominio: z.string().nullish(),

  modulosEmissor: modulosEmissorInputModelSchema.nullish(),
})

export type ClienteInputModel = z.input<typeof clienteInputModelSchema>
