import {
  clienteRegimeEspecialOptions,
  clienteRegimeTributarioOptions,
} from '@/features/clientes/constants'
import { useFormContext } from 'react-hook-form'

import { RenderField } from '@/components/form/RenderField'

import { CustomerFormInput, CustomerFormOutput } from '../cliente-info.schema'

type Props = {
  isLoading?: boolean
}

export function CustomerDetailsInfoFormTaxationSection({ isLoading }: Props) {
  const form = useFormContext<CustomerFormInput, CustomerFormOutput>()

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-muted-foreground">Tributação</h2>

      <div className="grid w-full grid-cols-12 gap-4 @container">
        <RenderField<CustomerFormInput, CustomerFormOutput>
          form={form}
          slot={{
            name: 'pessoaJuridica.regimeTributario',
            translateKey: 'Regime Tributário',
            label: 'Regime Tributário',
            placeholderKey: 'Regime Tributário',
            type: 'combobox-single-value',
            options: clienteRegimeTributarioOptions,
            isLoading: isLoading,
            className:
              '@[0px]:col-span-full @2xl:col-span-6 @4xl:col-span-5 @7xl:col-span-4',
          }}
        />
        <RenderField<CustomerFormInput, CustomerFormOutput>
          form={form}
          slot={{
            name: 'pessoaJuridica.regimeEspecial',
            label: 'Regime Especial',
            translateKey: 'Regime Tributário',
            placeholderKey: 'Regime Tributário',
            type: 'combobox-single-value',
            options: clienteRegimeEspecialOptions,
            isLoading: isLoading,
            className:
              '@[0px]:col-span-full @2xl:col-span-6 @4xl:col-span-5 @7xl:col-span-4',
          }}
        />
      </div>
    </section>
  )
}
