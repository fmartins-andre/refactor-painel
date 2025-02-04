import { useState } from 'react'
import { FormFields } from '@/@types/form-field'
import { ChevronDownIcon } from 'lucide-react'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'

import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'

import { filterEquivalentTerms } from '../helpers/command-filter-fn'

interface Props<TFieldValues extends FieldValues> {
  field: ControllerRenderProps<TFieldValues>
  slot: Extract<FormFields<TFieldValues>, { type: 'combobox-single-value' }>
}

export function ComboboxSingleField<TFieldValues extends FieldValues>({
  field,
  slot,
}: Props<TFieldValues>) {
  const [open, setOpen] = useState<boolean>(false)
  const toggle = () => setOpen((prev) => !prev)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          disabled={slot.disabled}
          aria-controls=""
          aria-expanded
          className={cn(
            'bg-muted ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex  min-h-10 w-full items-center justify-between rounded-md border-0 px-3 py-2 text-sm focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
            slot.className
          )}
          role="combobox"
        >
          <div className="flex flex-wrap items-center gap-2">
            <div>
              <div className={cn('flex items-center')} key={field.value}>
                <span className={cn(!field.value && 'text-muted-foreground')}>
                  {slot.options.find((opt) => opt.value === field.value)
                    ?.label ??
                    (field.value || slot.placeholderKey)}
                </span>
              </div>
            </div>
          </div>
          <ChevronDownIcon className="size-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className={cn('min-w-[350px]', slot.contentSize)}>
        <Command filter={filterEquivalentTerms}>
          <CommandInput
            className="dark:bg-gray900 bg-white"
            onValueChange={(search: string) =>
              'onInputChange' in slot && slot.onInputChange
                ? slot.onInputChange(search)
                : null
            }
            placeholder={slot.placeholderKey}
          />
          <CommandList>
            <CommandEmpty>
              {slot.loading ? (
                <Skeleton className="h-8" />
              ) : (
                <span>Não encontrado</span>
              )}
            </CommandEmpty>
            <CommandGroup>
              {slot.options.map((option, index) => (
                <CommandItem
                  className="flex w-full gap-2"
                  key={index}
                  onSelect={() => {
                    field.onChange(option.value)
                    slot.postChangeCall?.(option.value.toString())
                    slot?.onSelect?.(option)
                    toggle()
                  }}
                  value={String(option.label)}
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
