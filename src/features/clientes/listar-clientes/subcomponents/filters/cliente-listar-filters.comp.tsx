import { ComponentProps, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'

import { Form } from '@/components/ui/form'
import { useToast } from '@/components/hooks/use-toast'

import { useHandleClientesListarFilters } from '../../helpers/use-handle-clientes-listar-filter-params.hook'
import {
  ClientesListarFiltersFormInput,
  ClientesListarFiltersFormOutput,
  clientesListarFiltersFormSchema,
} from './cliente-listar-filters.schema'
import { filtersFormId, formDefaultValues } from './constants'

export function ClientesListarFiltersFormProvider(
  props: Omit<ComponentProps<'form'>, 'onSubmit' | 'id'>
) {
  const { filters, setFilters } = useHandleClientesListarFilters()
  const { toast } = useToast()

  const form = useForm<
    ClientesListarFiltersFormInput,
    ClientesListarFiltersFormOutput
  >({
    // defaultValues: filters,
    resolver: zodResolver(clientesListarFiltersFormSchema),
  })

  const { reset, handleSubmit } = form

  useEffect(() => {
    reset({ ...formDefaultValues, ...filters })
  }, [filters, reset])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onValid: SubmitHandler<any> = (
    data: ClientesListarFiltersFormOutput
  ) => {
    setFilters(data)
  }

  const onInvalid: SubmitErrorHandler<ClientesListarFiltersFormInput> = (
    error
  ) => {
    console.error('Erro no form de filtro de listagem de clientes:\n', error)

    toast({
      title: 'Há erros no formulário!',
      description: 'Por favor, corrija para prosseguir.',
      variant: 'destructive',
    })
  }

  const onSubmit = handleSubmit(onValid, onInvalid)

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} id={filtersFormId} {...props} />
    </Form>
  )
}
