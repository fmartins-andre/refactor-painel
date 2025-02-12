import { DetailedHTMLProps, HTMLAttributes, useMemo } from 'react'
import {
  useIbgeGovApiLocalidadesEstadosListar,
  useIbgeGovApiLocalidadesMunicipios,
} from '@/services/api/third-party/ibge-gov-api/endpoints/localidades'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { RenderField } from '@/components/form/RenderField'

import {
  CustomerFormStatePayload,
  useHandleCustomerFormState,
} from '../../helpers/use-customer-form-state'
import {
  CustomerFormStep02Input,
  CustomerFormStep02Output,
  customerFormStep02Schema,
} from './customer-form-step-02.schema'
import { useFormStep02Initializer } from './helpers/use-form-initializer.hook'
import { useGetZipCode } from './helpers/use-get-zip-code.hook'
import { useFormStep02SubmitHandler } from './helpers/use-submit-handler.hook'

type CustomerFormStep02Props = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'children'
> & {
  handleSaveCustomer?: (
    customerPayload: CustomerFormStatePayload
  ) => Promise<void>
}

export function CustomerFormStep02({
  className,
  handleSaveCustomer,
  ...props
}: CustomerFormStep02Props) {
  const formInitialValues = useFormStep02Initializer()

  const form = useForm<CustomerFormStep02Input, CustomerFormStep02Output>({
    resolver: zodResolver(customerFormStep02Schema),
    defaultValues: formInitialValues,
  })

  const { watch, resetField, getFieldState, setValue, handleSubmit } = form

  const uf = watch('endereco.uf') ?? ''

  const { setPreviousStep } = useHandleCustomerFormState()
  const isUpdate = useHandleCustomerFormState((state) =>
    Boolean(state.customerPayload.id)
  )

  const { submitHandler } = useFormStep02SubmitHandler({
    handleSubmit,
    handleSaveCustomer,
  })

  function prevStep() {
    setPreviousStep()
  }

  const { data: brazilianStates, isLoading: isLoadingStates } =
    useIbgeGovApiLocalidadesEstadosListar()

  const { data: brazilianCitiesByState, isLoading: isLoadingCities } =
    useIbgeGovApiLocalidadesMunicipios({ uf })

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

  const { getZipCode, isFetchingZipCodeData } = useGetZipCode({
    getFieldState,
    resetField,
    setValue,
  })

  const isLoading = isFetchingZipCodeData || isLoadingCities || isLoadingStates

  return (
    <div className={cn('grid w-full', className)} {...props}>
      <Form {...form}>
        <form className="flex grow flex-col gap-4" onSubmit={submitHandler}>
          <div className="grid w-full grid-cols-12 gap-4 @container">
            <RenderField<CustomerFormStep02Input, CustomerFormStep02Output>
              form={form}
              slot={{
                name: 'endereco.cep',
                required: true,
                translateKey: 'CEP',
                placeholderKey: 'Ex: 00000-000',
                type: 'zipcode',
                className:
                  '@[0px]:col-span-full @md:col-span-5 @2xl:col-span-2',
                onBlur: (e) => getZipCode(e.target.value),
                disabled: isLoading,
              }}
            />

            <RenderField<CustomerFormStep02Input, CustomerFormStep02Output>
              form={form}
              slot={{
                name: 'endereco.uf',
                required: true,
                translateKey: 'Estado',
                placeholderKey: 'Estado',
                type: 'combobox-single-value',
                options: brazilianStatesOptions,
                className:
                  '@[0px]:col-span-full @md:col-span-7 @2xl:col-span-4',
                loading: isLoadingStates,
                isLoading: isFetchingZipCodeData || isLoadingStates,
              }}
            />

            <RenderField<CustomerFormStep02Input, CustomerFormStep02Output>
              form={form}
              slot={{
                name: 'endereco.cidade',
                required: true,
                translateKey: 'Cidade',
                placeholderKey: 'Cidade',
                type: 'combobox-single-value',
                options: brazilianCitiesByStateOptions,
                className: '@[0px]:col-span-full  @2xl:col-span-6',
                loading: isLoadingCities,
                disabled: !brazilianCitiesByStateOptions.length,
                isLoading: isFetchingZipCodeData || isLoadingCities,
              }}
            />

            <RenderField<CustomerFormStep02Input, CustomerFormStep02Output>
              form={form}
              slot={{
                name: 'endereco.bairro',
                required: true,
                translateKey: 'Bairro',
                placeholderKey: 'Ex: Setor central',
                type: 'text',
                className:
                  '@[0px]:col-span-full @3xl:col-span-5 @4xl:col-span-4',
                isLoading: isFetchingZipCodeData,
              }}
            />

            <RenderField<CustomerFormStep02Input, CustomerFormStep02Output>
              form={form}
              slot={{
                name: 'endereco.logradouro',
                required: true,
                translateKey: 'Rua',
                placeholderKey: 'Ex: Rua Lorem Ipsum',
                type: 'text',
                className:
                  '@[0px]:col-span-full @3xl:col-span-7 @4xl:col-span-8',
                isLoading: isFetchingZipCodeData,
              }}
            />

            <RenderField<CustomerFormStep02Input, CustomerFormStep02Output>
              form={form}
              slot={{
                name: 'endereco.numero',
                required: true,
                translateKey: 'Número',
                placeholderKey: 'Ex: 000',
                type: 'text',
                className:
                  '@[0px]:col-span-full @md:col-span-4 @xl:col-span-3 @2xl:col-span-2',
                isLoading: isFetchingZipCodeData,
              }}
            />

            <RenderField<CustomerFormStep02Input, CustomerFormStep02Output>
              form={form}
              slot={{
                name: 'endereco.complemento',
                optional: true,
                translateKey: 'Complemento',
                placeholderKey: 'Ex: Casa, Apartamento, etc',
                type: 'text',
                className:
                  '@[0px]:col-span-full @md:col-span-8 @xl:col-span-6 @2xl:col-span-5',
                isLoading: isFetchingZipCodeData,
              }}
            />
          </div>

          <div className="flex w-full items-center justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={isLoading}
            >
              Voltar
            </Button>
            <Button type="submit" disabled={isLoading} className="flex gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Aguarde...
                </>
              ) : (
                <span>
                  {!handleSaveCustomer
                    ? 'Proximo'
                    : isUpdate
                      ? 'Atualizar'
                      : 'Cadastrar'}
                </span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
