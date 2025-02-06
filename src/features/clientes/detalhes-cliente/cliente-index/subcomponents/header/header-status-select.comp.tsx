import { StatusClienteModelEnum } from '@/services/api/accountant-panel-api/schemas/cliente-models'
import { SelectProps } from '@radix-ui/react-select'
import { Loader2Icon } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { clienteStatusOptions } from '../../../../constants'

type Props = {
  status: StatusClienteModelEnum | undefined
  isLoading?: boolean
  onStatusChange: NonNullable<SelectProps['onValueChange']>
}
export function CustomerDetailsHeaderStatusSelect({
  status,
  onStatusChange,
  isLoading,
}: Props) {
  return (
    <div className="w-full">
      <Select
        value={status}
        onValueChange={onStatusChange}
        disabled={isLoading}
      >
        <SelectTrigger className="h-12 min-w-32">
          {isLoading ? (
            <div className="text-muted-foreground inline-flex w-full flex-row items-center justify-center gap-1">
              <Loader2Icon className="animate-spin" /> carregando
            </div>
          ) : (
            <SelectValue placeholder="Ativo" />
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="max-h-52">
            {clienteStatusOptions.map((item, index) => (
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
