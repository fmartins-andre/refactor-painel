import { useLayoutEffect, useState } from 'react'
import { type FormFields, type SelectOptions } from '@/@types/form-field'
import { inputMask } from '@/utils/input-mask'
import { removeAccents, removeNonCharOrNum } from '@/utils/string-methods'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { CheckIcon, ChevronDown, XCircle } from 'lucide-react'
import { FieldValues, type ControllerRenderProps } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { FormControl, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

import { DatePicker } from './subcomponents/date-picker.comp'

interface Props<TFieldValues extends FieldValues = FieldValues> {
  field: ControllerRenderProps<TFieldValues>
  slot: FormFields<TFieldValues>
}

export function FormFieldDynamic<TFieldValues extends FieldValues>({
  field,
  slot,
}: Props<TFieldValues>) {
  const [multipleOptionSelected, setMultipleOptionSelected] = useState<
    SelectOptions[]
  >([])

  useLayoutEffect(() => {
    if (slot.type === 'combobox' && slot.multiple) {
      setMultipleOptionSelected(field.value ?? [])
    }
  }, [field.value, slot])

  switch (slot.type) {
    case 'tel':
      return (
        <Input
          className="h-10 dark:bg-black"
          inputMode="tel"
          onChange={(e) =>
            field.onChange(inputMask.phone(e.target.value.normalize('NFKC')))
          }
          onBlur={slot.onBlur}
          placeholder={slot.placeholderKey}
          type="tel"
          disabled={slot.disabled}
          value={field.value}
          width="full"
        />
      )
    case 'cnpj':
      return (
        <Input
          className="h-10 dark:bg-black"
          inputMode="numeric"
          onChange={(e) => field.onChange(inputMask.cpfCnpj(e.target.value))}
          onBlur={slot.onBlur}
          placeholder={slot.placeholderKey}
          type="cnpj"
          disabled={slot.disabled}
          value={field.value}
          width="full"
        />
      )
    case 'cnpj_cpf':
      return (
        <Input
          className="h-10 dark:bg-black"
          inputMode="numeric"
          onChange={(e) => field.onChange(inputMask.cpfCnpj(e.target.value))}
          placeholder={slot.placeholderKey}
          type="cnpj"
          disabled={slot.disabled}
          value={field.value}
          width="full"
        />
      )
    case 'checkbox':
      return (
        <div
          className={cn(
            'w-full justify-start rounded-xl px-1 py-3',
            field.value ? 'bg-primary-s-lighter/40' : ''
          )}
        >
          <div className="flex w-full items-center justify-start gap-2">
            <Checkbox
              checked={field.value}
              onCheckedChange={(value): void => {
                field.onChange(value)
              }}
              disabled={slot.disabled}
              className={cn('border-blue rounded', slot.className)}
            />
            {slot.label && (
              <p
                aria-label={slot.label}
                className="w-full min-w-60 text-sm font-medium"
              >
                {slot.label}
              </p>
            )}
            {slot.labelComp && slot.labelComp}
          </div>
        </div>
      )
    case 'loading':
      return <Skeleton className="h-12" />
    case 'cpf':
      return (
        <Input
          className="h-10 dark:bg-black"
          inputMode="numeric"
          onChange={(e) => field.onChange(inputMask.cpfCnpj(e.target.value))}
          onBlur={slot.onBlur}
          placeholder={slot.placeholderKey}
          type="cpf"
          disabled={slot.disabled}
          value={field.value}
          width="full"
        />
      )
    case 'switch':
      return (
        <div className="flex items-center gap-2">
          <Switch
            checked={field.value}
            defaultChecked={field.value}
            onCheckedChange={field.onChange}
            disabled={slot.disabled}
          />
          <span className="text-sm font-medium">{slot.label}</span>
        </div>
      )
    case 'date':
      return <DatePicker field={field} slot={slot} />
    case 'radio':
      return (
        <RadioGroup
          className={cn(
            slot.options.length > 2
              ? 'space-y-2'
              : 'flex w-full items-center gap-10 space-y-2'
          )}
          onValueChange={field.onChange}
          value={field.value}
        >
          {slot.options?.map((option) => (
            <FormItem
              className="flex w-auto items-center space-x-2"
              key={option.value.toString()}
            >
              <FormControl>
                <RadioGroupItem
                  aria-label={option.translateKey}
                  title={option.translateKey}
                  value={String(option.value)}
                />
              </FormControl>
              <FormLabel
                className="cursor-pointer font-normal"
                title={option.translateKey}
              >
                {option.translateKey}
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      )
    case 'combobox':
      return (
        <Popover>
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
                      ({ label, value }: SelectOptions) => (
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
                          <XCircle className="size-3" />
                        </Badge>
                      )
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
              <ChevronDown className="size-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className={cn('min-w-[350px]', slot.contentSize)}>
            <Command
              filter={(value, search) => {
                const _value = removeNonCharOrNum(
                  removeAccents(value)
                ).toLowerCase()

                const terms = removeNonCharOrNum(removeAccents(search))
                  .toLowerCase()
                  .split(/\s/)

                const hasTerm = terms.every((term) => _value.includes(term))

                return hasTerm ? 1 : 0
              }}
            >
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
                                    (o) =>
                                      o.value !== optionAlreadySelected.value
                                  ),
                                ]
                              : [...prevState, option]

                            field.onChange(newState)
                            return newState
                          })
                        } else {
                          field.onChange(option)
                          return option
                        }
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
    case 'combobox-single-value':
      return (
        <Popover>
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
                    <span
                      className={cn(!field.value && 'text-muted-foreground')}
                    >
                      {slot.options.find((opt) => opt.value === field.value)
                        ?.label ??
                        (field.value || slot.placeholderKey)}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronDown className="size-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className={cn('min-w-[350px]', slot.contentSize)}>
            <Command>
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
    case 'select':
      return slot?.isLoading ? (
        <Skeleton className="h-8" />
      ) : (
        <Select
          disabled={slot.disabled}
          onValueChange={field.onChange}
          value={field.value}
          defaultValue={field.value}
        >
          <SelectTrigger className="h-10">
            <SelectValue
              placeholder={
                slot.options.find(
                  (s) => String(s.value) === String(field.value)
                )?.label ||
                field.value ||
                slot.placeHolder
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="max-h-52">
              {slot.options.map((item, index) => {
                return (
                  <SelectItem key={index} value={String(item.value)}>
                    {item.label}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      )
    case 'textarea':
      return (
        <Textarea
          {...field}
          onChange={(e) => field.onChange(e.target.value.normalize('NFKC'))}
          className="disabled:bg-background bg-muted border-0 disabled:opacity-100"
          disabled={slot.disabled}
          placeholder={slot.placeholderKey}
          title={slot.translateKey}
        />
      )

    case 'number':
      return (
        <Input
          className="h-10 dark:bg-black"
          disabled={slot.disabled}
          inputMode="numeric"
          onChange={(e) => field.onChange(e.target.value.normalize('NFKC'))}
          onBlur={slot.onBlur}
          type="number"
          value={field.value}
          width="full"
        />
      )
    case 'zipcode':
      return (
        <Input
          className="h-10 dark:bg-black"
          disabled={slot.disabled}
          inputMode="numeric"
          onChange={(e) =>
            field.onChange(inputMask.cep(e.target.value.normalize('NFKC')))
          }
          onBlur={slot.onBlur}
          placeholder={slot.placeholderKey}
          type="zipcode"
          value={field.value}
          width="full"
        />
      )
    case 'currency':
      return (
        <Input
          className="h-10 dark:bg-black"
          disabled={slot.disabled}
          inputMode="numeric"
          onChange={(e) =>
            field.onChange(inputMask.currency(e.target.value, slot.prefix))
          }
          onBlur={(e) => {
            if (e.target.value.replace(/\D/g, '')) {
              field.onChange(
                inputMask.currency(e.target.value, slot.prefix, {
                  forceDecimalPlaces: true,
                })
              )
            }

            slot.onBlur?.(e)
          }}
          placeholder={slot.placeholderKey}
          type="text"
          value={field.value}
          width="full"
        />
      )
    case 'hidden':
      return <Input {...field} type="hidden" />
    case 'text':
      return slot.isLoading ? (
        <Skeleton className="h-8" />
      ) : (
        <Input
          className="h-10 dark:bg-black"
          disabled={slot.disabled}
          onChange={(e) => field.onChange(e.target.value.normalize('NFKC'))}
          onBlur={slot.onBlur}
          placeholder={slot.placeholderKey}
          value={field.value}
          width="full"
        />
      )
    case 'password':
      return slot.isLoading ? (
        <Skeleton className="h-8" />
      ) : (
        <Input
          className="h-10 dark:bg-black"
          disabled={slot.disabled}
          onChange={(e) => field.onChange(e.target.value.normalize('NFKC'))}
          placeholder={slot.placeholderKey}
          value={field.value}
          width="full"
          type={slot.showPassword ? 'text' : 'password'}
          icon={
            slot.showPassword ? (
              <EyeOpenIcon
                className="text-blue size-8 cursor-pointer p-1"
                onClick={slot.toggleShowPassword}
              />
            ) : (
              <EyeClosedIcon
                className="text-blue size-8 cursor-pointer p-1"
                onClick={slot.toggleShowPassword}
              />
            )
          }
        />
      )
    case 'title':
      return (
        <div className="my-2 flex items-center gap-2">
          {slot.icon}
          <span className="font-semibold text-[#7D93B8]">{slot.label}</span>
        </div>
      )
    default:
      return (
        <Input
          className="h-10 dark:bg-black"
          disabled={slot.disabled}
          onChange={(e) => field.onChange(e.target.value.normalize('NFKC'))}
          placeholder={slot.placeholderKey}
          value={field.value}
          width="full"
        />
      )
  }
}
