import type { ReactNode } from 'react'
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

interface FormInputProps<T extends FieldValues> {
  name: Path<T>
  label: string
  multiline?: boolean
  disabled?: boolean
  placeholder?: string
  type?: string
  className?: string
  required?: boolean
  optional?: boolean
  icon?: ReactNode
}

export function FormInput<T extends FieldValues>({
  name,
  label,
  multiline,
  placeholder,
  disabled,
  type,
  className,
  required,
  optional,
  icon,
}: FormInputProps<T>) {
  const { control } = useFormContext<T>()

  return (
    <FormField
      control={control}
      name={name}
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
            <Input
              className={cn('h-12 bg-[#F1F5F9] dark:bg-black', className)}
              type={type}
              disabled={disabled}
              multiple={multiline}
              onChange={field.onChange}
              placeholder={placeholder}
              value={field.value}
              width="full"
              icon={icon}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
