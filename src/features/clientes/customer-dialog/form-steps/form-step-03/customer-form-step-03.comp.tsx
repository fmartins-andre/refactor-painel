import { DetailedHTMLProps, HTMLAttributes } from 'react'
import {
  clienteRegimeEspecialOptions,
  clienteRegimeTributarioOptions,
  switchBooleanOptions,
} from '@/features/clientes/constants'
import { zodResolver } from '@hookform/resolvers/zod'
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
  CustomerFormStep03Input,
  CustomerFormStep03Output,
  customerFormStep03Schema,
} from './customer-form-step-03.schema'
import { useFormStep03Initializer } from './helpers/use-form-initializer.hook'
import { useFormStep03SubmitHandler } from './helpers/use-submit-handler.hook'

type CustomerFormStep03Props = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'children'
> & {
  handleSaveCustomer: (
    customerPayload: CustomerFormStatePayload
  ) => Promise<void>
}

export function CustomerFormStep03({
  handleSaveCustomer,
  className,
  ...props
}: CustomerFormStep03Props) {
  const formInitialValues = useFormStep03Initializer()
  const form = useForm<CustomerFormStep03Input, CustomerFormStep03Output>({
    resolver: zodResolver(customerFormStep03Schema),
    defaultValues: formInitialValues,
  })

  const { handleSubmit } = form

  const { setPreviousStep } = useHandleCustomerFormState()
  const isUpdate = useHandleCustomerFormState((state) =>
    Boolean(state.customerPayload?.id)
  )

  const { submitHandler } = useFormStep03SubmitHandler({
    handleSubmit,
    handleSaveCustomer,
  })

  function prevStep() {
    setPreviousStep()
  }

  return (
    <div className={cn('grid w-full', className)} {...props}>
      <Form {...form}>
        <form className="flex grow flex-col gap-4" onSubmit={submitHandler}>
          <div className="flex min-h-[320px] flex-col gap-4">
            <div className="grid w-full grid-cols-12 gap-4">
              <RenderField<CustomerFormStep03Input, CustomerFormStep03Output>
                form={form}
                slot={{
                  name: 'pessoaJuridica.regimeTributario',
                  label: 'CRT',
                  className: 'col-span-3',
                  type: 'select',
                  options: clienteRegimeTributarioOptions,
                  translateKey: 'CRT',
                }}
              />

              <RenderField<CustomerFormStep03Input, CustomerFormStep03Output>
                form={form}
                slot={{
                  name: 'pessoaJuridica.regimeEspecial',
                  label: 'Regime Especial',
                  className: 'col-span-7',
                  type: 'select',
                  options: clienteRegimeEspecialOptions,
                  translateKey: 'Regime Especial',
                }}
              />
            </div>

            <div className="grid w-full grid-cols-12 gap-4">
              <RenderField<CustomerFormStep03Input, CustomerFormStep03Output>
                form={form}
                slot={{
                  name: 'modulosEmissor.nfe',
                  label: 'Emite NF-e',
                  className: 'col-span-2 ml-1',
                  type: 'switch',
                  options: switchBooleanOptions,
                }}
              />

              <RenderField<CustomerFormStep03Input, CustomerFormStep03Output>
                form={form}
                slot={{
                  name: 'modulosEmissor.nfce',
                  label: 'Emite NFC-e',
                  className: 'col-span-2',
                  type: 'switch',
                  options: switchBooleanOptions,
                }}
              />

              <RenderField<CustomerFormStep03Input, CustomerFormStep03Output>
                form={form}
                slot={{
                  name: 'modulosEmissor.nfse',
                  label: 'Emite NFS-e',
                  className: 'col-span-2',
                  type: 'switch',
                  options: switchBooleanOptions,
                }}
              />

              <RenderField<CustomerFormStep03Input, CustomerFormStep03Output>
                form={form}
                slot={{
                  name: 'modulosEmissor.mdfe',
                  label: 'Emite MDF-e',
                  className: 'col-span-2',
                  type: 'switch',
                  options: switchBooleanOptions,
                }}
              />

              <RenderField<CustomerFormStep03Input, CustomerFormStep03Output>
                form={form}
                slot={{
                  name: 'modulosEmissor.cte',
                  label: 'Emite CT-e',
                  className: 'col-span-2',
                  type: 'switch',
                  options: switchBooleanOptions,
                }}
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-end gap-4">
            <Button type="button" variant="outline" onClick={prevStep}>
              Voltar
            </Button>
            <Button type="submit">
              <span>{isUpdate ? 'Atualizar' : 'Cadastrar'}</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
