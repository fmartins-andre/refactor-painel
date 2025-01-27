import { produce } from 'immer'
import { DateTime } from 'luxon'

import { z } from '@/lib/translated-zod'

import type { RegimeEspecialEnum } from '../constants/customer-regime-options'
import type { CustomersStatusEnum } from '../constants/customer-status-options'

function cleanCnpjCpf(texto: string): string {
  const limpo: string = texto.replace(/\D/g, '')

  if (limpo.length === 14 || limpo.length === 11) {
    return limpo
  } else {
    return texto
  }
}

function transformInvalidInUndefined<T>(arg: T | null): T | undefined {
  if (arg == null) return
  if (arg === '') return
  return arg
}

export const searchCustomersSchema = z
  .object({
    busca: z.string().optional(),
    status: z.string().optional(),
    regimeEspecialId: z.string().optional(),
    dataInicial: z.string().optional(),
    dataFinal: z.string().optional(),
  })
  .transform((data) => {
    return {
      ...data,
      busca: data.busca ? cleanCnpjCpf(data.busca) : undefined,
    }
  })

export type SearchCustomers = z.infer<typeof searchCustomersSchema>

export const customerListFiltersSchema = z
  .object({
    busca: z
      .custom<string>()
      .default('')
      .transform(transformInvalidInUndefined),

    status: z
      .custom<Array<{ value: CustomersStatusEnum; label: string }>>()
      .nullable()
      .default(null)
      .transform((arg) => {
        if (arg == null) return
        if (!arg.length) return
        return arg.map((item) => item.value)
      }),

    regimeEspecialId: z
      .custom<Array<{ value: RegimeEspecialEnum; label: string }>>()
      .nullable()
      .default(null)
      .transform((arg) => {
        if (arg == null) return
        if (!arg.length) return
        return arg.map((item) => item.value)
      }),

    dataInicial: z
      .date()
      .nullable()
      .default(null)
      .transform((arg): string | undefined => {
        if (!arg) return
        return DateTime.fromJSDate(arg).toISODate() ?? undefined
      }),

    dataFinal: z
      .date()
      .nullable()
      .default(null)
      .transform((arg): string | undefined => {
        if (!arg) return
        return DateTime.fromJSDate(arg).toISODate() ?? undefined
      }),

    page: z
      .custom<number>()
      .nullable()
      .default(1)
      .transform(transformInvalidInUndefined),

    perPage: z
      .custom<number>()
      .nullable()
      .default(10)
      .transform(transformInvalidInUndefined),
  })
  .transform((args) => {
    const getNewArgs = produce((draft) => {
      if (args.dataFinal && args.dataInicial) {
        const _endDate = DateTime.fromISO(args.dataFinal)
        const _startDate = DateTime.fromISO(args.dataInicial)

        if (_endDate < _startDate) {
          draft.dataFinal = args.dataInicial
          draft.dataInicial = args.dataFinal
        }
      }
    }, args)

    return getNewArgs()
  })

export type CustomerListFiltersSchemaType = z.input<
  typeof customerListFiltersSchema
>
export type CustomerListFiltersSchemaOutput = z.output<
  typeof customerListFiltersSchema
>
export type CustomerListFiltersSchemaParams = Partial<{
  busca: string
  status: CustomersStatusEnum[]
  regimeEspecialId: RegimeEspecialEnum[]
  dataInicial: string
  dataFinal: string
  page: number
  perPage: number
}>
