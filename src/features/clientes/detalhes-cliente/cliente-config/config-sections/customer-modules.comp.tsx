import { switchBooleanOptions } from '@/features/clientes/constants'
import { useFormContext } from 'react-hook-form'

import { RenderField } from '@/components/form/RenderField'

import {
  ClienteConfigFormInput,
  ClienteConfigFormOutput,
} from '../cliente-config.schema'

type Props = {
  isLoading?: boolean
}

export function CustomerDetailsConfigModulesSection({
  isLoading = false,
}: Props) {
  const form = useFormContext<ClienteConfigFormInput, ClienteConfigFormOutput>()

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-muted-foreground">
        Módulos do Emissor de Notas Fiscais
      </h2>

      <div className="grid w-full grid-cols-12 gap-4 @container">
        <RenderField<ClienteConfigFormInput, ClienteConfigFormOutput>
          form={form}
          slot={{
            name: 'modulosEmissor.nfe',
            label: 'NF-e',
            type: 'switch',
            options: switchBooleanOptions,
            isLoading: isLoading,
            className: '@[0px]:col-span-6 @lg:col-span-4 @2xl:col-span-2',
          }}
        />
        <RenderField<ClienteConfigFormInput, ClienteConfigFormOutput>
          form={form}
          slot={{
            name: 'modulosEmissor.nfce',
            label: 'NFC-e',
            type: 'switch',
            options: switchBooleanOptions,
            isLoading: isLoading,
            className: '@[0px]:col-span-6 @lg:col-span-4 @2xl:col-span-2',
          }}
        />
        <RenderField<ClienteConfigFormInput, ClienteConfigFormOutput>
          form={form}
          slot={{
            name: 'modulosEmissor.nfse',
            label: 'NFS-e',
            type: 'switch',
            options: switchBooleanOptions,
            isLoading: isLoading,
            className: '@[0px]:col-span-6 @lg:col-span-4 @2xl:col-span-2',
          }}
        />
        <RenderField<ClienteConfigFormInput, ClienteConfigFormOutput>
          form={form}
          slot={{
            name: 'modulosEmissor.cte',
            label: 'CT-e',
            type: 'switch',
            options: switchBooleanOptions,
            isLoading: isLoading,
            className: '@[0px]:col-span-6 @lg:col-span-4 @2xl:col-span-2',
          }}
        />
        <RenderField<ClienteConfigFormInput, ClienteConfigFormOutput>
          form={form}
          slot={{
            name: 'modulosEmissor.mdfe',
            label: 'MDF-e',
            type: 'switch',
            options: switchBooleanOptions,
            isLoading: isLoading,
            className: '@[0px]:col-span-6 @lg:col-span-4 @2xl:col-span-2',
          }}
        />
      </div>
    </section>
  )
}
