import { DetailedHTMLProps, HTMLAttributes, useEffect } from 'react'
import { AccountantCustomerTypeEnum } from '@/@types/accountant/accountant-customer'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { RenderField } from '@/components/form/RenderField'

import { switchBooleanOptions } from '../../constants'
import { customerTypeOptions } from './constants'
import {
  CustomerFormStep01Input,
  CustomerFormStep01Output,
  customerFormStep01Schema,
} from './customer-form-step-01.schema'
import { useFormStep01Initializer } from './helpers/use-form-initializer.hook'
import { useFormStep01HandleCustomerDataByCnpj } from './helpers/use-handle-customer-data-by-cnpj-on-blur.hook'
import { useFormStep01SubmitHandler } from './helpers/use-submit-handler.hook'

type CustomerFormStep01Props = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'children'
>

export function CustomerFormStep01({
  className,
  ...props
}: CustomerFormStep01Props) {
  const formInitialValues = useFormStep01Initializer()

  const form = useForm<CustomerFormStep01Input, CustomerFormStep01Output>({
    resolver: zodResolver(customerFormStep01Schema),
    defaultValues: formInitialValues,
  })

  const { watch, handleSubmit, resetField, setValue, getFieldState } = form

  const isPJ = watch('tipoPessoa') === AccountantCustomerTypeEnum.PJ
  const isMei = watch('isMei')

  const { submitHandler } = useFormStep01SubmitHandler({ handleSubmit })

  const { getCustomerDataHandler, isFetchingCnpjData } =
    useFormStep01HandleCustomerDataByCnpj({
      getFieldState,
      resetField,
      setValue,
    })

  useEffect(() => {
    if (!isMei) setValue('meiDataAbertura', null)
  }, [isMei, setValue])

  return (
    <div className={cn('grid w-full', className)} {...props}>
      <Form {...form}>
        <form className="flex grow flex-col gap-4" onSubmit={submitHandler}>
          <div className="flex min-h-[320px] flex-col gap-4">
            <div className="grid w-full grid-cols-12 gap-4">
              <RenderField<CustomerFormStep01Input, CustomerFormStep01Output>
                form={form}
                slot={{
                  name: 'tipoPessoa',
                  disabled: isFetchingCnpjData,
                  required: true,
                  label: 'Tipo pessoa',
                  className: 'col-span-4',
                  type: 'select',
                  options: customerTypeOptions,
                  translateKey: 'Tipo pessoa',
                }}
              />

              <RenderField<CustomerFormStep01Input, CustomerFormStep01Output>
                form={form}
                slot={{
                  name: 'cnpjCpf',
                  isLoading: isFetchingCnpjData,
                  required: true,
                  translateKey: `${isPJ ? 'CNPJ' : 'CPF'}`,
                  placeholderKey: `${isPJ ? 'Ex: 00.000.000/0000-00' : 'Ex: 000.000.000-00'}`,
                  type: `${isPJ ? 'cnpj' : 'cpf'}`,
                  className: 'col-span-8',
                  onBlur: (e) => getCustomerDataHandler(e.target.value),
                }}
              />
            </div>

            <div className="grid w-full grid-cols-12 gap-4">
              <RenderField<CustomerFormStep01Input, CustomerFormStep01Output>
                form={form}
                slot={{
                  name: 'razaoSocial',
                  isLoading: isFetchingCnpjData,
                  required: true,
                  translateKey: `${isPJ ? 'Razão social' : 'Nome'}`,
                  placeholderKey: 'Ex: Lorem Ipsum company',
                  type: 'text',
                  className: 'col-span-full',
                }}
              />

              <RenderField<CustomerFormStep01Input, CustomerFormStep01Output>
                form={form}
                slot={{
                  name: 'inscricaoEstadual',
                  isLoading: isFetchingCnpjData,
                  optional: true,
                  translateKey: 'Inscrição Estadual',
                  placeholderKey: 'Ex: 00000000',
                  type: 'text',
                  className: 'col-span-6',
                }}
              />

              <RenderField<CustomerFormStep01Input, CustomerFormStep01Output>
                form={form}
                slot={{
                  name: 'inscricaoMunicipal',
                  isLoading: isFetchingCnpjData,
                  optional: true,
                  translateKey: 'Inscrição Municipal',
                  placeholderKey: 'Ex: 00000',
                  type: 'text',
                  className: 'col-span-6',
                }}
              />
            </div>

            <div className="grid w-full grid-cols-12 gap-4">
              <RenderField<CustomerFormStep01Input, CustomerFormStep01Output>
                form={form}
                slot={{
                  name: 'email',
                  isLoading: isFetchingCnpjData,
                  required: true,
                  translateKey: 'Email',
                  placeholderKey: 'Ex: lorem.ipsum@lorem-company.com',
                  type: 'text',
                  className: 'col-span-5',
                }}
              />

              <RenderField<CustomerFormStep01Input, CustomerFormStep01Output>
                form={form}
                slot={{
                  name: 'telefoneWhatsapp',
                  isLoading: isFetchingCnpjData,
                  required: true,
                  translateKey: 'Telefone',
                  placeholderKey: 'Ex: 62 99999-9999',
                  type: 'tel',
                  className: 'col-span-3',
                }}
              />

              <div className="col-span-4 flex gap-3 ">
                <RenderField<CustomerFormStep01Input, CustomerFormStep01Output>
                  form={form}
                  slot={{
                    name: 'isMei',
                    label: 'MEI',
                    type: 'switch',
                    className: 'pl-2 pt-4',
                    options: switchBooleanOptions,
                  }}
                />

                <RenderField<CustomerFormStep01Input, CustomerFormStep01Output>
                  form={form}
                  slot={{
                    name: 'meiDataAbertura',
                    required: isMei,
                    translateKey: 'Data de abertura',
                    type: 'date',
                    className: 'w-full',
                    placeholderKey: 'Ex: 01/01/2024',
                    disabled: !isMei,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-end gap-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isFetchingCnpjData}>
              {isFetchingCnpjData ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Aguarde...
                </>
              ) : (
                'Proximo'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
