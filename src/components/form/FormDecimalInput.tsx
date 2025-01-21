import IMask from 'imask'
import { FieldValues, Path, useFormContext } from 'react-hook-form'

import { cn } from '@/lib/utils'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface FormDecimalInputProps<T extends FieldValues> {
  name: Path<T>
  label: string
  multiline?: boolean
  disabled?: boolean
  placeholder?: string
  className?: string
  required?: boolean
  optional?: boolean
}

export function FormDecimalInput<T extends FieldValues>({
  name,
  label,
  multiline,
  placeholder,
  disabled,
  className,
  required,
  optional,
}: FormDecimalInputProps<T>) {
  const { control } = useFormContext<T>()

  const maskOptions = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ',',
    mapToRadix: ['.'],
    autofix: true,
  }

  const element = document.getElementById('decimal')

  if (element) {
    IMask(element, maskOptions)
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex w-full flex-col gap-2">
            <FormLabel>
              <div className="flex flex-row items-center gap-0.5">
                <span className="font-semibold">{label}</span>
                {required && <span className="text-red500">*</span>}
                {optional && (
                  <span className="text-gray300">{'(Opcional)'}</span>
                )}
              </div>
            </FormLabel>
            <FormControl>
              <Input
                id="decimal"
                className={cn('h-12 bg-[#F1F5F9] dark:bg-black', className)}
                disabled={disabled}
                type="text"
                multiple={multiline}
                onChange={field.onChange}
                placeholder={placeholder}
                value={field.value}
                width="full"
                defaultValue="0,00"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
