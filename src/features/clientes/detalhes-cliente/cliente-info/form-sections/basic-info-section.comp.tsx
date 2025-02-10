import { tipoPessoaOptions } from '@/features/clientes/constants'
import { TipoPessoaModelEnum } from '@/services/api/accountant-panel-api/schemas'
import { RegimeTributarioClienteModelEnum } from '@/services/api/accountant-panel-api/schemas/cliente-models'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { RenderField } from '@/components/form/RenderField'

import { CustomerFormInput, CustomerFormOutput } from '../cliente-info.schema'

type Props = {
  isLoading?: boolean
}

export function CustomerDetailsInfoFormBasicInfoSection({ isLoading }: Props) {
  const form = useFormContext<CustomerFormInput, CustomerFormOutput>()

  const isPJ = form.watch('tipoPessoa') === TipoPessoaModelEnum.JURIDICA
  const isMei =
    form.watch('pessoaJuridica.regimeTributario') ===
    RegimeTributarioClienteModelEnum.MEI

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-muted-foreground">Informações básicas</h2>

      <div className="grid w-full grid-cols-12 gap-4 @container">
        <RenderField<CustomerFormInput, CustomerFormOutput>
          form={form}
          slot={{
            name: 'tipoPessoa',
            isLoading: isLoading,
            disabled: true,
            required: true,
            label: 'Tipo pessoa',
            type: 'select',
            options: tipoPessoaOptions,
            translateKey: 'Tipo pessoa',
            className: '@[0px]:col-span-full @xl:col-span-4 @4xl:col-span-3',
          }}
        />

        <RenderField<CustomerFormInput, CustomerFormOutput>
          form={form}
          slot={{
            name: 'documento',
            isLoading: isLoading,
            disabled: true,
            required: true,
            translateKey: `${isPJ ? 'CNPJ' : 'CPF'}`,
            placeholderKey: `${isPJ ? 'Ex: 00.000.000/0000-00' : 'Ex: 000.000.000-00'}`,
            type: `${isPJ ? 'cnpj' : 'cpf'}`,
            className: '@[0px]:col-span-full @xl:col-span-8 @4xl:col-span-3',
          }}
        />

        <RenderField<CustomerFormInput, CustomerFormOutput>
          form={form}
          slot={{
            name: 'pessoaJuridica.inscricaoEstadual',
            isLoading: isLoading,
            optional: true,
            translateKey: 'Inscrição Estadual',
            placeholderKey: 'Ex: 00000000',
            type: 'text',
            className: '@[0px]:col-span-full @xl:col-span-6 @4xl:col-span-3',
          }}
        />

        <RenderField<CustomerFormInput, CustomerFormOutput>
          form={form}
          slot={{
            name: 'pessoaJuridica.inscricaoMunicipal',
            isLoading: isLoading,
            optional: true,
            translateKey: 'Inscrição Municipal',
            placeholderKey: 'Ex: 00000',
            type: 'text',
            className: '@[0px]:col-span-full @xl:col-span-6 @4xl:col-span-3',
          }}
        />

        <RenderField<CustomerFormInput, CustomerFormOutput>
          form={form}
          slot={{
            name: 'nomeRazaoSocial',
            isLoading: isLoading,
            required: true,
            translateKey: `${isPJ ? 'Razão social' : 'Nome'}`,
            placeholderKey: 'Ex: Lorem Ipsum company',
            type: 'text',
            className: cn('@[0px]:col-span-full', isPJ && '@4xl:col-span-6'),
          }}
        />

        <RenderField<CustomerFormInput, CustomerFormOutput>
          form={form}
          slot={{
            name: 'nomeFantasia',
            isLoading: isLoading,
            translateKey: 'Nome fantasia',
            placeholderKey: 'Ex: Lorem Ipsum company',
            type: 'text',
            className: cn(
              '@[0px]:col-span-full @4xl:col-span-6',
              !isPJ && 'hidden'
            ),
          }}
        />

        <RenderField<CustomerFormInput, CustomerFormOutput>
          form={form}
          slot={{
            name: 'email',
            isLoading: isLoading,
            required: true,
            translateKey: 'Email',
            placeholderKey: 'Ex: lorem.ipsum@lorem-company.com',
            type: 'text',
            className: '@[0px]:col-span-full @xl:col-span-7 @3xl:col-span-6',
          }}
        />

        <RenderField<CustomerFormInput, CustomerFormOutput>
          form={form}
          slot={{
            name: 'telefone',
            isLoading: isLoading,
            required: true,
            translateKey: 'Telefone',
            placeholderKey: 'Ex: 62 99999-9999',
            type: 'tel',
            className: '@[0px]:col-span-full @xl:col-span-5 @3xl:col-span-3',
          }}
        />

        <RenderField<CustomerFormInput, CustomerFormOutput>
          form={form}
          slot={{
            name: 'pessoaJuridica.dataAbertura',
            isLoading: isLoading,
            required: isMei,
            translateKey: 'Data de abertura',
            type: 'date',
            placeholderKey: 'Ex: 01/01/2024',
            className: cn(
              '@[0px]:col-span-full @xl:col-span-4 @3xl:col-span-3',
              !isPJ && 'hidden'
            ),
          }}
        />
      </div>
    </section>
  )
}
