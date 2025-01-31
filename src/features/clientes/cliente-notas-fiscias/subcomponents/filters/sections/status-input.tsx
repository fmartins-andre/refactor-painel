import { useEffect, useState } from 'react'
import { OptionsField } from '@/@types/options-field'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function CustomerInvoicesFilterStatus() {
  const [options, setOptions] = useState<OptionsField[]>([])

  useEffect(() => {
    if (options.length === 0) {
      setOptions([
        {
          label: 'Autorizada',
          value: 'A',
        },
        {
          label: 'Cancelada',
          value: 'C',
        },
        {
          label: 'Denegada',
          value: 'D',
        },
        {
          label: 'Encerrada',
          value: 'ENC',
        },
        {
          label: 'Inutilizada',
          value: 'I',
        },
      ])
    }
  }, [options])

  const handleSelect = async (value: string) => {}

  return (
    <div className="flex flex-col gap-0.5">
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="mx-1 mb-2 h-12 w-72 bg-[#F1F5F9] text-[#7D93B8] md:mb-0 md:w-40">
          <SelectValue
            placeholder="Status"
            className="placeholder:text-[#7D93B8]"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="max-h-64">
            {options.map((item, index) => {
              return (
                <SelectItem key={index} value={String(item.value)}>
                  {item.label}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
