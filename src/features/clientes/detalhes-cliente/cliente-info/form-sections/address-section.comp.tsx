import { useMemo } from 'react'
import {
  useIbgeGovApiLocalidadesEstadosListar,
  useIbgeGovApiLocalidadesMunicipios,
} from '@/services/api/third-party/ibge-gov-api/endpoints/localidades'
import { useFormContext } from 'react-hook-form'

import { RenderField } from '@/components/form/RenderField'

import { CustomerFormInput, CustomerFormOutput } from '../cliente-info.schema'
import { useGetZipCode } from '../helpers/use-get-zip-code.hook'

type Props = {
  isLoading?: boolean
}

export function CustomerDetailsInfoFormAddressSection({ isLoading }: Props) {
  const form = useFormContext<CustomerFormInput, CustomerFormOutput>()

  const uf = form.watch('endereco.uf') ?? ''

  const { data: brazilianStates, isLoading: isLoadingStates } =
    useIbgeGovApiLocalidadesEstadosListar()

  const { data: brazilianCitiesByState, isLoading: isLoadingCities } =
    useIbgeGovApiLocalidadesMunicipios({ uf })

  const { getZipCode, isFetchingZipCodeData } = useGetZipCode({
    getFieldState: form.getFieldState,
    resetField: form.resetField,
    setValue: form.setValue,
  })

  const brazilianStatesOptions = useMemo(
    () =>
      brazilianStates
        ?.map((state) => ({
          value: state.sigla,
          label: state.nome,
        }))
        .sort((a, b) => (a.label > b.label ? 1 : -1)) ?? [],
    [brazilianStates]
  )

  const brazilianCitiesByStateOptions = useMemo(
    () =>
      brazilianCitiesByState
        ?.map((state) => ({
          value: state.id.toString(),
          label: state.nome,
        }))
        .sort((a, b) => (a.label > b.label ? 1 : -1)) ?? [],
    [brazilianCitiesByState]
  )

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-muted-foreground">Endereço</h2>

      <div className="grid w-full grid-cols-12 gap-4 @container">
        <RenderField<CustomerFormInput, CustomerFormOutput>
          form={form}
          slot={{
            name: 'endereco.cep',
            required: true,
            translateKey: 'CEP',
            placeholderKey: 'Ex: 00000-000',
            type: 'zipcode',
            onBlur: (e) => getZipCode(e.target.value),
            disabled: isFetchingZipCodeData,
            isLoading: isLoading,
            className: '@[0px]:col-span-full @xl:col-span-4 @4xl:col-span-3',
          }}
        />

        <RenderField<CustomerFormInput, CustomerFormOutput>
          form={form}
          slot={{
            name: 'endereco.uf',
            required: true,
            translateKey: 'Estado',
            placeholderKey: 'Estado',
            type: 'combobox-single-value',
            options: brazilianStatesOptions,
            isLoading: isLoading || isLoadingStates || isFetchingZipCodeData,
            className: '@[0px]:col-span-full @xl:col-span-8 @4xl:col-span-4',
          }}
        />

        <RenderField<CustomerFormInput, CustomerFormOutput>
          form={form}
          slot={{
            name: 'endereco.cidade',
            required: true,
            translateKey: 'Cidade',
            placeholderKey: 'Cidade',
            type: 'combobox-single-value',
            options: brazilianCitiesByStateOptions,
            disabled: !brazilianCitiesByStateOptions.length,
            isLoading: isLoading || isLoadingCities || isFetchingZipCodeData,
            className: '@[0px]:col-span-full @2xl:col-span-6 @4xl:col-span-5',
          }}
        />

        <RenderField<CustomerFormInput, CustomerFormOutput>
          form={form}
          slot={{
            name: 'endereco.bairro',
            required: true,
            translateKey: 'Bairro',
            placeholderKey: 'Ex: Setor central',
            type: 'text',
            isLoading: isLoading || isFetchingZipCodeData,
            className: '@[0px]:col-span-full @2xl:col-span-6 @4xl:col-span-5',
          }}
        />

        <RenderField<CustomerFormInput, CustomerFormOutput>
          form={form}
          slot={{
            name: 'endereco.logradouro',
            required: true,
            translateKey: 'Rua',
            placeholderKey: 'Ex: Rua Lorem Ipsum',
            type: 'text',
            isLoading: isLoading || isFetchingZipCodeData,
            className: '@[0px]:col-span-full @4xl:col-span-7',
          }}
        />

        <RenderField<CustomerFormInput, CustomerFormOutput>
          form={form}
          slot={{
            name: 'endereco.numero',
            required: true,
            translateKey: 'Número',
            placeholderKey: 'Ex: 000',
            type: 'text',
            isLoading: isLoading || isFetchingZipCodeData,
            className: '@[0px]:col-span-full @xl:col-span-4 @2xl:col-span-3',
          }}
        />

        <RenderField<CustomerFormInput, CustomerFormOutput>
          form={form}
          slot={{
            name: 'endereco.complemento',
            optional: true,
            translateKey: 'Complemento',
            placeholderKey: 'Ex: Casa, Apartamento, etc',
            type: 'text',
            isLoading: isLoading || isFetchingZipCodeData,
            className: '@[0px]:col-span-full @xl:col-span-8 @2xl:col-span-9',
          }}
        />
      </div>
    </section>
  )
}
