import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { z } from '@/lib/translated-zod'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useGetCurrentCustomerData } from '../../../helpers/use-get-current-customer-data.hook'

const ieOptionsSchema = z
  .array(
    z
      .object({
        id: z.number().nullable().optional(),
        inscricaoEstadual: z.string().nullable().optional(),
        status: z.string().nullable().optional(),
      })
      .nullable()
      .optional()
  )
  .transform((data) => {
    return data.map((item) => ({
      label: item?.inscricaoEstadual,
      value: item?.id,
    }))
  })

type IEOptions = z.infer<typeof ieOptionsSchema>

export function SelectInscricaoEstadual() {
  const { data: customer } = useGetCurrentCustomerData()

  const [ieSelected, setIeSelected] = useState<number | undefined>()

  const { data, isSuccess } = useQuery({
    queryKey: ['selected-IE-customer', customer?.id, customer],
    queryFn: async () => {
      if (customer) {
        const { data } = await axios.get<IEOptions>(
          `/contador/clientes/${customer.id}/inscricoes`
        )

        const ieOptions = ieOptionsSchema.safeParse(data)

        if (!ieOptions.success) {
          ieOptions.error.errors.forEach((error) => {
            console.error(error.message)
          })
          return [
            {
              label: 'Nenhuma IE cadastrada',
              value: 0,
            },
          ]
        }

        return ieOptions.data.map((item) => {
          if (item.label === null) {
            return {
              label: 'Nenhuma IE cadastrada',
              value: 0,
            }
          }

          if (item.label?.length === 0) {
            return {
              label: 'Nenhuma IE cadastrada',
              value: 0,
            }
          }

          return item
        })
      }
      return []
    },
  })

  async function selectInscricaoEstadual(value: string) {
    setIeSelected(Number(value))

    // if (customer) {
    //   startTransition(async () => {
    //     router.push(`/clientes/${customer.empresaId}/${value}`)
    //   })
    // }
  }

  useEffect(() => {
    if (isSuccess) {
      setIeSelected((state) => {
        const value = data.find(
          (item) => item.value === customer?.pessoaJuridica?.inscricaoEstadual
        )?.value

        if (value) {
          return value
        }

        if (data.find((item) => item.value === 0)) {
          return 0
        }

        return state
      })
    }
  }, [customer?.pessoaJuridica?.inscricaoEstadual, data, isSuccess])

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Select
        value={String(ieSelected)}
        onValueChange={selectInscricaoEstadual}
      >
        <SelectTrigger className="h-12 min-w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="max-h-52">
            {data?.map((item, index) => (
              <SelectItem key={index} value={String(item.value)}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
