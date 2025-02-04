import {
  dasMeiListarRequestPayloadSchema,
  StatusDasMeiModelEnum,
} from '@/services/api/accountant-panel-api/endpoints/das-mei'
import { DateTime } from 'luxon'

import { z } from '@/lib/translated-zod'

function zodTransformCurrencyToNumber(
  arg: unknown,
  ctx: z.RefinementCtx
): number | undefined {
  if (!arg) return undefined

  if (typeof arg === 'number') return arg

  if (typeof arg === 'string') {
    const sanitizedValue = arg.replace(/[^\d,]/g, '').replace(',', '.')
    const numericValue = Number(sanitizedValue)

    if (isNaN(numericValue)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Valor inválido',
      })

      return z.NEVER
    }
    return numericValue
  }

  return undefined
}

export const dasMeiListarFiltersFormSchema = dasMeiListarRequestPayloadSchema
  .extend({
    valorInicial: z
      .string()
      .or(z.number())
      .nullable()
      .transform<number | undefined>(zodTransformCurrencyToNumber),

    valorFinal: z
      .string()
      .or(z.number())
      .nullable()
      .transform<number | undefined>(zodTransformCurrencyToNumber),

    status: z
      .object({
        label: z.custom<string>(),
        value: z.nativeEnum(StatusDasMeiModelEnum),
      })
      .array()
      .nonempty()
      .nullable()
      .transform<StatusDasMeiModelEnum[] | undefined>((arg) => {
        if (!arg || !arg.length) return undefined

        return arg.map((item) => item.value)
      }),
  })
  .transform((arg, ctx) => {
    if (
      arg.dataVencimentoFinal &&
      arg.dataVencimentoInicial &&
      DateTime.fromISO(arg.dataVencimentoFinal) <
        DateTime.fromISO(arg.dataVencimentoInicial)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        message: 'Data final deve ser posterior à data inicial',
        path: ['dataVencimentoFinal'],
      })

      return z.NEVER
    }

    if (
      arg.valorInicial != null &&
      arg.valorFinal != null &&
      arg.valorInicial > arg.valorFinal
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Valor final deve ser maior que o valor inicial',
        path: ['valorFinal'],
      })

      return z.NEVER
    }

    // reset a página sempre que houver mudança nos filtros
    arg.page = 1

    return arg
  })

export type DasMeiListarFiltersFormInput = z.input<
  typeof dasMeiListarFiltersFormSchema
>

export type DasMeiListarFiltersFormOutput = z.output<
  typeof dasMeiListarFiltersFormSchema
>
