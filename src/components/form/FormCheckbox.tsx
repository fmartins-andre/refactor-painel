import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'

interface FormCheckboxProps {
  name: string
  label?: string
  disabled?: boolean
  className?: string
}

export function FormCheckbox({
  name,
  label,
  disabled,
  className,
}: FormCheckboxProps) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div
          className={cn(
            'justify-start rounded-xl px-5  py-3',
            field.value ? 'bg-primary-s-lighter' : 'bg-[#F1F5F9]'
          )}
        >
          <div className="flex items-center justify-start gap-2">
            <Checkbox
              checked={field.value}
              disabled={disabled}
              onCheckedChange={(value): void => {
                field.onChange(value)
              }}
              className={cn('rounded border-[#7D93B8]', className)}
            />
            {label && (
              <p aria-label={label} className="text-primary font-medium">
                {label}
              </p>
            )}
          </div>
        </div>
      )}
    />
  )
}
