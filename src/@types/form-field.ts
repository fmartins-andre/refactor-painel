import type {
  ComponentPropsWithoutRef,
  FocusEventHandler,
  ReactNode,
} from 'react'
import { Content as PopoverContent } from '@radix-ui/react-popover'
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form'

export type FormRadioOption = {
  value: string | number | boolean
  translateKey: string
}

export type SelectOptions = {
  label: string
  value: string | number | boolean
}

export type FormFields<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: FieldPath<TFieldValues>
  disabled?: boolean
  label?: string
  optional?: boolean
  message?: string
  required?: boolean
  isLoading?: boolean
  render?: ControllerProps<TFieldValues, TName>['render']
} & (
  | {
      translateKey: string
      className?: string
      placeholderKey?: string
      type?:
        | 'text'
        | 'tel'
        | 'email'
        | 'number'
        | 'cnpj'
        | 'cnpj_cpf'
        | 'cpf'
        | 'expiring-date'
      maxLength?: number
      onBlur?: FocusEventHandler<HTMLInputElement>
    }
  | {
      translateKey: string
      className?: string
      placeholderKey?: string

      type: 'currency'
      prefix?: string
      onBlur?: FocusEventHandler<HTMLInputElement>
    }
  | {
      translateKey: string
      className?: string
      placeholderKey?: string
      type: 'password'
      toggleShowPassword?: () => void
      showPassword?: boolean
      maxLength?: number
      onBlur?: FocusEventHandler<HTMLInputElement>
    }
  | {
      translateKey: string
      className?: string
      placeholderKey?: string
      type?: 'loading'
    }
  | {
      translateKey: string
      className?: string
      placeholderKey?: string
      type?: 'checkbox'
      labelComp?: ReactNode
    }
  | {
      translateKey: string
      className?: string
      placeholderKey?: string
      type?: 'textarea'
    }
  | {
      translateKey?: string
      className?: string
      type: 'switch'
      options: FormRadioOption[]
    }
  | {
      translateKey: string
      className?: string
      type: 'radio'
      options: FormRadioOption[]
    }
  | {
      translateKey: string
      className?: string
      type: 'select'
      options: SelectOptions[]
      placeHolder?: string
    }
  | {
      translateKey: string
      className?: string
      type: 'combobox'
      placeholderKey?: string
      placeholder?: string
      loading?: boolean
      multiple: boolean
      options: SelectOptions[]
      contentSize?: string
      onInputChange?: (value: string) => void
      onSelect?: (value?: SelectOptions) => void
    }
  | {
      translateKey?: string
      className?: string
      type: 'combobox-single-value'
      placeholderKey?: string
      placeholder?: string
      loading?: boolean
      options: SelectOptions[]
      contentSize?: string
      onInputChange?: (value: string) => void
      postChangeCall?: (option: string) => void
      onSelect?: (value?: SelectOptions) => void
    }
  | ({
      translateKey: string
      placeholderKey?: string
      className?: string
      type: 'date'
      mode?: 'default' | 'multiple' | 'range' | 'single'
    } & Pick<ComponentPropsWithoutRef<typeof PopoverContent>, 'side' | 'align'>)
  | {
      translateKey: string
      placeholderKey?: string
      className?: string
      type: 'date-single'
      mode?: 'default' | 'multiple' | 'range' | 'single'
    }
  | {
      translateKey: string
      className?: string
      placeholderKey?: string
      type: 'zipcode'
      onBlur?: FocusEventHandler<HTMLInputElement>
    }
  | {
      icon?: ReactNode
      label: string
      className?: string
      type: 'title'
      placeholderKey?: string
    }
  | {
      type: 'hidden'
    }
)

export type FormFieldsConstant<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Array<FormFields<TFieldValues, TName> | FormFields<TFieldValues, TName>[]>
