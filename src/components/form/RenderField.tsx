/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren } from 'react'
import { type FormFields } from '@/@types/form-field'
import { type FieldValues, type UseFormReturn } from 'react-hook-form'

import { cn } from '@/lib/utils'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { FormFieldDynamic } from './FormFieldDynamic'

type RenderFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TransformedValues extends FieldValues | undefined = undefined,
> = PropsWithChildren<{
  form: UseFormReturn<TFieldValues, TContext, TransformedValues>
  slot: FormFields<TFieldValues>
}>

export function RenderField<
  TFieldValues extends FieldValues,
  TContext = any,
  TransformedValues extends FieldValues | undefined = undefined,
>({
  form,
  slot,
  children,
}: RenderFieldProps<TFieldValues, TContext, TransformedValues>) {
  return (
    <FormField
      control={form.control}
      key={slot.name as string}
      name={slot.name}
      render={({ field }) => {
        return (
          <FormItem
            className={cn(
              'flex grow flex-col gap-2',
              'className' in slot && slot.className
            )}
          >
            {'translateKey' in slot && (
              <FormLabel>
                {slot.translateKey}
                {'optional' in slot && slot.optional ? (
                  <span className="text-gray300 text-xs">{' (Opcional)'}</span>
                ) : (
                  ''
                )}
                {'required' in slot && slot.required ? (
                  <span className="text-red500  font-bold">*</span>
                ) : (
                  <span> </span>
                )}
              </FormLabel>
            )}
            <FormControl>
              <div className="flex gap-2">
                <FormFieldDynamic<TFieldValues> field={field} slot={slot} />
                {children}
              </div>
            </FormControl>
            {'message' in slot && (
              <span className="text-blue font-font-semibold text-xs">
                {slot.message}
              </span>
            )}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
