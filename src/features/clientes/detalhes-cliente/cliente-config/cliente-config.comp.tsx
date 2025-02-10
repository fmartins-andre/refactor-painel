import { zodResolver } from '@hookform/resolvers/zod'
import { InfoIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import {
  ClienteConfigFormInput,
  ClienteConfigFormOutput,
  clienteConfigFormSchema,
} from './cliente-config.schema'
import { CustomerDetailsConfigModulesSection } from './config-sections/customer-modules.comp'
import { formDefaultValues } from './constants'
import { useFormInitializer } from './helpers/use-form-initializer.hook'
import { useFormSubmitHandler } from './helpers/use-submit-handler.hook'

export function CustomerDetailsConfig() {
  const form = useForm<ClienteConfigFormInput, ClienteConfigFormOutput>({
    resolver: zodResolver(clienteConfigFormSchema),
    defaultValues: formDefaultValues,
  })

  const isDirty = form.formState.isDirty

  const { isLoading } = useFormInitializer(form.reset)

  const { submitHandler, isPending } = useFormSubmitHandler({
    handleSubmit: form.handleSubmit,
  })

  return (
    <div className="flex flex-col w-full">
      <Form {...form}>
        <form className="flex flex-col w-full gap-8" onSubmit={submitHandler}>
          <CustomerDetailsConfigModulesSection
            isLoading={isLoading || isPending}
          />

          <div className="flex justify-end items-center gap-4">
            {!isDirty && (
              <div className="text-sm text-muted-foreground/50 flex items-center gap-2">
                <InfoIcon className="size-4" />O formulário não foi alterado
              </div>
            )}
            <Button disabled={isLoading || isPending || !isDirty} type="submit">
              {(isLoading || isPending) && 'Carregando...'}
              {!(isLoading || isPending) && 'Salvar alterações'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
