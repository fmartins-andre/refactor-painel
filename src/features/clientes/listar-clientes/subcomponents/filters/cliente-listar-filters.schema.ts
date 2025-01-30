import { clienteListarRequestPayloadSchema } from '@/services/api/accountant-panel-api/endpoints/cliente'
import { DateTime } from 'luxon'

import { z } from '@/lib/translated-zod'

export const clientesListarFiltersFormSchema =
  clienteListarRequestPayloadSchema.transform((arg, ctx) => {
    if (
      arg.dataCriacaoFinal &&
      arg.dataCriacaoInicial &&
      DateTime.fromISO(arg.dataCriacaoFinal) <
        DateTime.fromISO(arg.dataCriacaoInicial)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        message: 'Data final deve ser posterior à data inicial',
        path: ['dataCriacaoFinal'],
      })

      return z.NEVER
    }

    // reset a página sempre que houver mudança nos filtros
    arg.page = 1

    return arg
  })

export type ClientesListarFiltersFormInput = z.input<
  typeof clientesListarFiltersFormSchema
>

export type ClientesListarFiltersFormOutput = z.output<
  typeof clientesListarFiltersFormSchema
>
