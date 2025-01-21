import { ReactNode } from 'react'
import { OptionsField } from '@/@types/options-field'
import { SelectProps } from '@radix-ui/react-select'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/lib/utils'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type FormSelectProps<T> = SelectProps & {
  name: keyof T
  label?: string | ReactNode
  disabled?: boolean
  options: OptionsField[]
  helperText?: string
  placeholder?: string
  onInputChange?: (event: unknown) => void
  className?: string
  required?: boolean
  optional?: boolean
}

export function FormSelect<T>({
  name,
  label,
  options,
  placeholder,
  onInputChange,
  className,
  required,
  optional,
  disabled,
}: FormSelectProps<T>) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name as string}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col gap-2">
          <FormLabel>
            <div className="flex flex-row items-center gap-0.5">
              <span className="font-semibold">{label}</span>
              {required && <span className="text-red500">*</span>}
              {optional && <span className="text-gray300">{'(Opcional)'}</span>}
            </div>
          </FormLabel>
          <FormControl>
            <Select
              disabled={disabled}
              onValueChange={(event: string) => {
                onInputChange?.(event)
                field.onChange(event)
              }}
            >
              <SelectTrigger
                className={cn('h-12 bg-[#F1F5F9] dark:bg-black', className)}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="max-h-52">
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
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
