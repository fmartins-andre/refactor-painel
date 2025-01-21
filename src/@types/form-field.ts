import type {
  ComponentPropsWithoutRef,
  FocusEventHandler,
  ReactNode,
} from 'react'
import { Content as PopoverContent } from '@radix-ui/react-popover'
import { FieldPath, FieldValues } from 'react-hook-form'

 
export type FormRadioOption = {
  value: string | number | boolean
  translateKey: string
}

export type SelectOptions = {
  label: string
  value: string | number | boolean
}

export type FormFields<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>
  disabled?: boolean
  label?: string
  optional?: boolean
  message?: string
  required?: boolean
} & (
  | {
      translateKey: string
      className?: string
      placeholderKey: string
      isLoading?: boolean
      type?:
        | 'text'
        | 'tel'
        | 'email'
        | 'number'
        | 'cnpj'
        | 'cnpj_cpf'
        | 'cpf'
        | 'expiring-date'
        | 'card-number'
      maxLength?: number
      onBlur?: FocusEventHandler<HTMLInputElement>
    }
  | {
      translateKey: string
      className?: string
      placeholderKey: string
      isLoading?: boolean
      type: 'currency'
      prefix?: string
      onBlur?: FocusEventHandler<HTMLInputElement>
    }
  | {
      translateKey: string
      className?: string
      placeholderKey: string
      isLoading?: boolean
      type: 'password'
      toggleShowPassword?: () => void
      showPassword?: boolean
      maxLength?: number
      onBlur?: FocusEventHandler<HTMLInputElement>
    }
  | {
      translateKey: string
      className?: string
      placeholderKey: string
      type?: 'loading'
    }
  | {
      translateKey: string
      className?: string
      placeholderKey: string
      type?: 'checkbox'
      labelComp?: ReactNode
    }
  | {
      translateKey: string
      className?: string
      placeholderKey: string
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
      isLoading?: boolean
      placeHolder?: string
    }
  | {
      translateKey: string
      className?: string
      type: 'combobox'
      placeholderKey: string
      placeholder?: string
      loading?: boolean
      multiple: boolean
      options: SelectOptions[]
      contentSize?: string
      onInputChange?: (value: string) => void
    }
  | {
      translateKey?: string
      className?: string
      type: 'combobox-single-value'
      placeholderKey: string
      placeholder?: string
      loading?: boolean
      options: SelectOptions[]
      contentSize?: string
      onInputChange?: (value: string) => void
      postChangeCall?: (option: string) => void
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
      placeholderKey: string
      className?: string
      type: 'date-single'
      mode?: 'default' | 'multiple' | 'range' | 'single'
    }
  | {
      translateKey: string
      className?: string
      placeholderKey: string
      type: 'zipcode'
      onBlur?: FocusEventHandler<HTMLInputElement>
    }
  | {
      icon?: ReactNode
      label: string
      className?: string
      type: 'title'
      placeholderKey: string
    }
  | {
      type: 'hidden'
    }
)

export type FormFieldsConstant<TFieldValues extends FieldValues> = Array<
  FormFields<TFieldValues> | FormFields<TFieldValues>[]
>
