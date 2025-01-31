import { useState } from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type CustomerStatusDetailProps = SelectPrimitive.SelectProps

export function CustomerStatusDetail({ ...rest }: CustomerStatusDetailProps) {
  // const router = useRouter()
  // const { customer } = useCustomerDetail()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const options = [
    {
      label: 'Ativo',
      value: 'A',
    },
    {
      label: 'Bloqueado',
      value: 'B',
    },
    {
      label: 'Cancelado',
      value: 'C',
    },
  ]

  async function sendNewCustomerStatus(value: string) {
    try {
      setIsLoading(true)
      // await api.put(
      //   `/contador/clientes/${customer?.empresaId}/${customer?.inscricaoId}`,
      //   {
      //     ...customer,
      //     status: value,
      //   }
      // )

      // await queryClient.invalidateQueries({
      //   queryKey: ['customers-detail'],
      // })

      // router.refresh()
    } catch (error) {
      // do nothing
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Select value={'A'} onValueChange={sendNewCustomerStatus} {...rest}>
        <SelectTrigger className="h-12 min-w-32">
          <SelectValue placeholder="Ativo" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="max-h-52">
            {options.map((item, index) => (
              <SelectItem key={index} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
