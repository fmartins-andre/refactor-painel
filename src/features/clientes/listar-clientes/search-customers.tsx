import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { FormInput } from '@/components/form/FormInput'
import { FormSelect } from '@/components/form/FormSelect'

import { REGIME_OPTIONS } from './constants/customer-regime-options'
import { STATUS_OPTIONS } from './constants/customer-status-options'
import { DueCertificateDatePickerRange } from './due-certificate-date-picker-range'
import {
  searchCustomersSchema,
  SearchCustomers as SearchCustomersType,
} from './validations/search-customers'

export function SearchCustomers() {
  const { searchStr } = useLocation()
  const searchParams = new URLSearchParams(searchStr)

  const form = useForm<SearchCustomersType>({
    resolver: zodResolver(searchCustomersSchema),
    defaultValues: {
      busca: searchParams.get('busca') ?? '',
      status: searchParams.get('status') ?? '',
      regimeEspecialId: searchParams.get('regimeEspecialId') ?? '',
    },
  })

  const page = searchParams.get('page')
    ? Math.max(parseInt(searchParams.get('page') as string), 1)
    : 1
  const perPage = searchParams.get('perPage')
    ? Math.max(parseInt(searchParams.get('perPage') as string), 10)
    : 10

  async function onSubmit(data: SearchCustomersType) {
    const params = new URLSearchParams()

    const dataFormatted = {
      ...data,
      dataInicial: data.dataInicial
        ? new Date(data.dataInicial).toISOString().split('T')[0]
        : null,
      dataFinal: data.dataFinal
        ? new Date(data.dataFinal).toISOString().split('T')[0]
        : null,
    }

    // queryClient.removeQueries({
    //   queryKey: ['customers-list', page, perPage],
    // })

    for (const [key, value] of Object.entries(dataFormatted)) {
      if (value) {
        params.append(key, typeof value === 'string' ? value : String(value))
      }
    }

    // router.push(`?${params.toString()}`)
  }

  return (
    <Form {...form}>
      <Accordion type="single" collapsible defaultValue="search">
        <AccordionItem value="search">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mb-5 flex w-full flex-col flex-wrap gap-4 md:flex-nowrap"
          >
            <div className="flex w-full flex-col items-center justify-center gap-4 px-2 md:flex-row">
              <FormInput<SearchCustomersType>
                label="Razão Social ou CNPJ / CPF"
                name="busca"
                placeholder="Ex: Empresa Cooperativa LTDA"
              />
              <FormSelect<SearchCustomersType>
                label="Situação"
                name="status"
                options={STATUS_OPTIONS}
                placeholder="Ex. Ativo"
              />
              <div className="flex flex-col items-center gap-4 pt-5 md:flex-row">
                <Button type="submit" className="h-12 w-72 md:w-44">
                  Pesquisar
                </Button>
                <AccordionTrigger className="focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground dark:bg-accent dark:border-gray700 border-accent bg-accent inline-flex size-12 items-center justify-center whitespace-nowrap rounded-md border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 " />
              </div>
            </div>
            <AccordionContent className="flex w-full flex-col items-center justify-center gap-4 px-2 md:flex-row">
              <FormSelect<SearchCustomersType>
                label="Regime tributário"
                name="regimeEspecialId"
                options={REGIME_OPTIONS}
                placeholder="Ex. MEI"
              />
              <div className="flex w-full flex-col gap-1">
                <span className="font-semibold">Periodo</span>
                <DueCertificateDatePickerRange />
              </div>
            </AccordionContent>
          </form>
        </AccordionItem>
      </Accordion>
    </Form>
  )
}
