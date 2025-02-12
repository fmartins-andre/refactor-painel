/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren } from 'react'
import { type FormFields } from '@/@types/form-field'
import { Loader2Icon } from 'lucide-react'
import { type FieldValues, type UseFormReturn } from 'react-hook-form'

import { cn } from '@/lib/utils'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Skeleton } from '../ui/skeleton'
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
      render={(ctx) => {
        const { field } = ctx
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
              <>
                <Skeleton
                  className={cn(
                    'h-10 text-sm items-center px-4 text-muted-foreground gap-2',
                    !slot?.isLoading ? 'hidden' : 'inline-flex'
                  )}
                >
                  <Loader2Icon className="animate-spin" />
                  <span className="line-clamp-1">carregando...</span>
                </Skeleton>

                <div
                  className={cn(
                    'gap-2',
                    slot?.isLoading ? 'hidden' : 'inline-flex'
                  )}
                >
                  <FormFieldDynamic<TFieldValues> field={field} slot={slot} />
                  {slot.render?.(ctx) ?? null}
                  {children}
                </div>
              </>
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
