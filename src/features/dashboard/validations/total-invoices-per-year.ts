import { produce } from 'immer'

import { z } from '@/lib/translated-zod'

const monthNames = [
  'JAN.',
  'FEV.',
  'MAR.',
  'ABR.',
  'MAI.',
  'JUN.',
  'JUL.',
  'AGO.',
  'SET.',
  'OUT.',
  'NOV.',
  'DEZ.',
]

export const totalInvoicesPerYearSchema = z
  .array(
    z
      .object({
        total: z.number(),
        modelo: z.union([
          z.literal('NF-e'),
          z.literal('NFS-e'),
          z.literal('NFC-e'),
          z.literal('CT-e'),
          z.literal('MDF-e'),
          z.literal('CTEOS'),
        ]),
        mes: z.number().int().min(1).max(12),
      })
      .transform((data) => ({
        name: monthNames[data.mes - 1],
        monthNumber: data.mes,
        'NF-e': data.modelo === 'NF-e' ? data.total : 0,
        'NFS-e': data.modelo === 'NFS-e' ? data.total : 0,
        'NFC-e': data.modelo === 'NFC-e' ? data.total : 0,
        'CT-e': data.modelo === 'CT-e' ? data.total : 0,
        'MDF-e': data.modelo === 'MDF-e' ? data.total : 0,
        CTEOS: data.modelo === 'CTEOS' ? data.total : 0,
      }))
  )
  .transform((data) => {
    const groupedData = produce(
      [] as Array<{
        name: string
        monthNumber: number
        'NF-e': number
        'NFS-e': number
        'NFC-e': number
        'CT-e': number
        'MDF-e': number
        CTEOS: number
      }>,
      (draft) => {
        data.forEach((item) => {
          const index = draft.findIndex((i) => i.name === item.name)

          if (index === -1) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            draft.push(item as any)
          } else {
            const existingItem = draft[index]

            if (existingItem) {
              existingItem['NF-e'] += item['NF-e']
              existingItem['NFS-e'] += item['NFS-e']
              existingItem['NFC-e'] += item['NFC-e']
              existingItem['CT-e'] += item['CT-e']
              existingItem['MDF-e'] += item['MDF-e']
              existingItem['CTEOS'] += item['CTEOS']
            }
          }
        })
      }
    )

    return monthNames
      .map((name) => {
        const month = groupedData.find((item) => item.name === name)
        return month ?? { name, monthNumber: undefined }
      })
      .filter((month) => month.monthNumber)
  })

export type TotalInvoicesPerYearInput = z.input<
  typeof totalInvoicesPerYearSchema
>
export type TotalInvoicesPerYearOutput = z.output<
  typeof totalInvoicesPerYearSchema
>
