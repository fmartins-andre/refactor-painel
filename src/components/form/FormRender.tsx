/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ReactNode } from 'react'
import { type FormFieldsConstant } from '@/@types/form-field'
import {
  FieldValues,
  SubmitErrorHandler,
  type UseFormReturn,
} from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Form } from '@/components/ui/form'

import { RenderField } from './RenderField'

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TransformedValues extends FieldValues | undefined = undefined,
> = {
  form: UseFormReturn<TFieldValues, TContext, TransformedValues>
  constant: FormFieldsConstant<TFieldValues>
  onSubmit?: (
    data: TransformedValues extends undefined ? TFieldValues : TransformedValues
  ) => void
  onFormError?: SubmitErrorHandler<TFieldValues>
  children?: ReactNode
  className?: string
}

export function FormRender<
  TFieldValues extends FieldValues,
  TContext = any,
  TransformedValues extends FieldValues | undefined = undefined,
>({
  constant,
  form,
  onSubmit,
  onFormError,
  children,
  className,
}: Props<TFieldValues, TContext, TransformedValues>) {
  const onValid: any = (
    data: TransformedValues extends undefined ? TFieldValues : TransformedValues
  ) => onSubmit?.(data)

  const onInvalid: SubmitErrorHandler<TFieldValues> = (error) =>
    onFormError?.(error)

  return (
    <Form {...form}>
      <form
        className={cn(className, 'space-y-4')}
        onSubmit={form.handleSubmit(onValid, onInvalid)}
      >
        {constant.map((slot, key) =>
          Array.isArray(slot) ? (
            <div className="grid w-full grid-cols-12 gap-4" key={key}>
              {slot.map((s) => (
                <RenderField<TFieldValues, TContext, TransformedValues>
                  form={form}
                  key={s.name as string}
                  slot={s}
                />
              ))}
            </div>
          ) : null
        )}
        {children}
      </form>
    </Form>
  )
}
