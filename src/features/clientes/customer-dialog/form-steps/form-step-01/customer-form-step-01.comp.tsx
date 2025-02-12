import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { tipoPessoaOptions } from '@/features/clientes/constants'
import { TipoPessoaModelEnum } from '@/services/api/accountant-panel-api/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { RenderField } from '@/components/form/RenderField'

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

  const isPJ = watch('tipoPessoa') === TipoPessoaModelEnum.JURIDICA

  const { submitHandler } = useFormStep01SubmitHandler({ handleSubmit })

  const { getCustomerDataHandler, isFetchingCnpjData } =
    useFormStep01HandleCustomerDataByCnpj({
      getFieldState,
      resetField,
      setValue,
    })

  return (
    <div className={cn('grid w-full', className)} {...props}>
      <Form {...form}>
        <form className="flex grow flex-col gap-4" onSubmit={submitHandler}>
          <div className="grid grid-cols-12 gap-4 w-full @container">
            <RenderField<CustomerFormStep01Input, CustomerFormStep01Output>
              form={form}
              slot={{
                name: 'tipoPessoa',
                disabled: isFetchingCnpjData,
                required: true,
                label: 'Tipo pessoa',
                type: 'select',
                options: tipoPessoaOptions,
                translateKey: 'Tipo pessoa',
                className:
                  '@[0px]:col-span-full @md:col-span-5 @4xl:col-span-3',
              }}
            />

            <RenderField<CustomerFormStep01Input, CustomerFormStep01Output>
              form={form}
              slot={{
                name: 'documento',
                isLoading: isFetchingCnpjData,
                required: true,
                translateKey: `${isPJ ? 'CNPJ' : 'CPF'}`,
                placeholderKey: `${isPJ ? 'Ex: 00.000.000/0000-00' : 'Ex: 000.000.000-00'}`,
                type: `${isPJ ? 'cnpj' : 'cpf'}`,
                className:
                  '@[0px]:col-span-full @md:col-span-7 @4xl:col-span-3',
                onBlur: (e) => getCustomerDataHandler(e.target.value),
              }}
            />

            <RenderField<CustomerFormStep01Input, CustomerFormStep01Output>
              form={form}
              slot={{
                name: 'inscricaoEstadual',
                isLoading: isFetchingCnpjData,
                optional: true,
                translateKey: 'Inscrição Estadual',
                placeholderKey: 'Ex: 00000',
                type: 'text',
                className:
                  '@[0px]:col-span-full @md:col-span-6 @4xl:col-span-3',
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
                className:
                  '@[0px]:col-span-full @md:col-span-6 @4xl:col-span-3',
              }}
            />

            <RenderField<CustomerFormStep01Input, CustomerFormStep01Output>
              form={form}
              slot={{
                name: 'nomeRazaoSocial',
                isLoading: isFetchingCnpjData,
                required: true,
                translateKey: `${isPJ ? 'Razão social' : 'Nome'}`,
                placeholderKey: 'Ex: Lorem Ipsum company',
                type: 'text',
                className: '@[0px]:col-span-full',
              }}
            />

            <RenderField<CustomerFormStep01Input, CustomerFormStep01Output>
              form={form}
              slot={{
                name: 'nomeFantasia',
                isLoading: isFetchingCnpjData,
                translateKey: 'Nome Fantasia',
                placeholderKey: 'Ex: Lorem Ipsum company',
                type: 'text',
                className: cn('@[0px]:col-span-full', !isPJ && 'hidden'),
              }}
            />

            <RenderField<CustomerFormStep01Input, CustomerFormStep01Output>
              form={form}
              slot={{
                name: 'email',
                isLoading: isFetchingCnpjData,
                required: true,
                translateKey: 'Email',
                placeholderKey: 'Ex: lorem.ipsum@lorem-company.com',
                type: 'text',
                className:
                  '@[0px]:col-span-full @md:col-span-7 @xl:col-span-8 @3xl:col-span-9',
              }}
            />

            <RenderField<CustomerFormStep01Input, CustomerFormStep01Output>
              form={form}
              slot={{
                name: 'telefone',
                isLoading: isFetchingCnpjData,
                required: true,
                translateKey: 'Telefone',
                placeholderKey: 'Ex: 62 99999-9999',
                type: 'tel',
                className:
                  '@[0px]:col-span-full @md:col-span-5 @xl:col-span-4 @3xl:col-span-3',
              }}
            />
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
