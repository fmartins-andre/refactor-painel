import { useLayoutEffect, useState } from 'react'
import { FormFields, SelectOptions } from '@/@types/form-field'
import { CheckIcon, ChevronDownIcon, XCircleIcon } from 'lucide-react'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
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
  slot: Extract<FormFields<TFieldValues>, { type: 'combobox' }>
}

export function ComboboxField<TFieldValues extends FieldValues>({
  field,
  slot,
}: Props<TFieldValues>) {
  const [open, setOpen] = useState<boolean>(false)
  const toggle = () => setOpen((prev) => !prev)

  const [multipleOptionSelected, setMultipleOptionSelected] = useState<
    SelectOptions[]
  >([])

  useLayoutEffect(() => {
    if (slot.multiple) {
      setMultipleOptionSelected(field.value ?? [])
    }
  }, [field.value, slot])

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
            {slot.multiple && (
              <>
                {multipleOptionSelected?.map(
                  ({ label, value }: SelectOptions) => {
                    return (
                      <Badge
                        className="dark:border-secondary dark:bg-secondary flex px-4 py-1"
                        key={String(value)}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()

                          setMultipleOptionSelected((prevState) => {
                            const newState = [
                              ...prevState.filter((o) => o.value !== value),
                            ]

                            field.onChange(newState)
                            return newState
                          })
                        }}
                      >
                        {label}
                        <XCircleIcon className="size-3" />
                      </Badge>
                    )
                  }
                )}

                {slot.placeholder && multipleOptionSelected.length < 1 && (
                  <span>{`${slot.placeholder}`}</span>
                )}
              </>
            )}

            {!slot.multiple && (
              <div>
                <div
                  className={cn(
                    multipleOptionSelected ? 'hidden' : 'py-1',
                    'flex items-center'
                  )}
                  key={field.value}
                >
                  <span
                    className={cn(
                      !field.value?.label?.length && 'text-muted-foreground'
                    )}
                  >
                    {field.value?.label ?? slot.placeholderKey}
                  </span>
                </div>
              </div>
            )}
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
                    if (slot.multiple) {
                      setMultipleOptionSelected((prevState) => {
                        const optionAlreadySelected = prevState.find(
                          (v) => v.value === option.value
                        )

                        const newState = optionAlreadySelected
                          ? [
                              ...prevState.filter(
                                (o) => o.value !== optionAlreadySelected.value
                              ),
                            ]
                          : [...prevState, option]

                        field.onChange(newState)
                        return newState
                      })
                    } else {
                      field.onChange(option)
                    }

                    slot?.onSelect?.(option)
                    toggle()
                  }}
                  value={String(option.label)}
                >
                  {option.label}
                  {multipleOptionSelected
                    .map((opt) => opt.value)
                    .includes(option.value) && (
                    <CheckIcon className="mb-0.5" size={15} />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
