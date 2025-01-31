import { GenericOptionField } from '@/@types/options-field'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const options: GenericOptionField<string>[] = []

export function CustomerInvoicesFilterModulesSelect() {
  const handleSelect = async (_: string) => {}

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="mx-1 mb-2 h-12 w-72 bg-muted text-muted-foreground md:mb-0 md:w-40">
        <SelectValue
          placeholder="Módulo"
          className="placeholder:text-muted-foreground"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="max-h-52">
          {options.map((item) => (
            <SelectItem key={item.value} value={String(item.value)}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
