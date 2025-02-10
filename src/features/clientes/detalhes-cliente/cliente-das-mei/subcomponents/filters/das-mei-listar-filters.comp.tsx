import { ComponentProps, useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Form } from '@/components/ui/form'

import { dasMeiStatusOptions } from '../../constants'
import { useHandleDasMeiListarFilters } from '../../helpers/use-handle-das-mei-listar-filter-params.hook'
import { filtersFormId, formDefaultValues } from './constants'
import {
  DasMeiListarFiltersFormInput,
  DasMeiListarFiltersFormOutput,
  dasMeiListarFiltersFormSchema,
} from './das-mei-listar-filters.schema'

export function DasMeiListarFiltersFormProvider(
  props: Omit<ComponentProps<'form'>, 'onSubmit' | 'id'>
) {
  const { filters, setFilters } = useHandleDasMeiListarFilters()

  const transformedStatus = useMemo(
    () =>
      dasMeiStatusOptions.filter((item) =>
        filters.status?.includes(item.value)
      ),
    [filters.status]
  )

  const form = useForm<
    DasMeiListarFiltersFormInput,
    DasMeiListarFiltersFormOutput
  >({
    // defaultValues: filters,
    resolver: zodResolver(dasMeiListarFiltersFormSchema),
  })

  const { reset, handleSubmit } = form

  useEffect(() => {
    reset({
      ...formDefaultValues,
      ...filters,
      status: transformedStatus,
    })
  }, [filters, reset, transformedStatus])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onValid: SubmitHandler<any> = (data: DasMeiListarFiltersFormOutput) => {
    setFilters(data)
  }

  const onInvalid: SubmitErrorHandler<DasMeiListarFiltersFormInput> = (
    error
  ) => {
    console.error('Erro no form de filtro de listagem DAS MEI:\n', error)

    toast.error('Há erros no formulário!', {
      description: 'Por favor, corrija para prosseguir.',
    })
  }

  const onSubmit = handleSubmit(onValid, onInvalid)

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} id={filtersFormId} {...props} />
    </Form>
  )
}
