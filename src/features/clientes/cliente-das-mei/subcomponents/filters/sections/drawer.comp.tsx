import {
  forwardRef,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { TooltipArrow } from '@radix-ui/react-tooltip'
import { FilterIcon, XIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { Drawer } from 'vaul'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { RenderField } from '@/components/form/RenderField'

import { dasMeiStatusOptions } from '../../../constants'
import { useHandleDasMeiListarFilters } from '../../../helpers/use-handle-das-mei-listar-filter-params.hook'
import { filtersFormId, formDefaultValues } from '../constants'
import {
  DasMeiListarFiltersFormInput,
  DasMeiListarFiltersFormOutput,
} from '../das-mei-listar-filters.schema'

export type ClientesListarFiltersDrawerRef = {
  open: () => void
  close: () => void
  clearFilters: () => void
}

export const ClientesListarFiltersDrawer = forwardRef<
  ClientesListarFiltersDrawerRef,
  PropsWithChildren
>(({ children }, ref) => {
  const { filters } = useHandleDasMeiListarFilters()

  const transformedStatus = useMemo(
    () =>
      dasMeiStatusOptions.filter((item) =>
        filters.status?.includes(item.value)
      ),
    [filters.status]
  )

  const [open, setOpen] = useState<boolean>(false)

  const form = useFormContext<
    DasMeiListarFiltersFormInput,
    DasMeiListarFiltersFormOutput
  >()

  useLayoutEffect(() => {
    console.log('filters: ', filters)
    if (Object.keys(filters).length) setOpen(false)
  }, [filters])

  const { reset, setValue } = form

  function handleClearFilters() {
    setValue('status', null)
    setValue('valorInicial', null)
    setValue('valorFinal', null)
    setValue('dataVencimentoInicial', null)
    setValue('dataVencimentoFinal', null)
  }

  const handleOnOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        reset({
          ...formDefaultValues,
          ...filters,
          status: transformedStatus,
        })
      }
      setOpen(open)
    },
    [filters, reset, transformedStatus]
  )

  useImperativeHandle(ref, () => ({
    open: () => handleOnOpenChange(true),
    close: () => handleOnOpenChange(false),
    clearFilters: handleClearFilters,
  }))

  return (
    <Drawer.Root
      direction="right"
      open={open}
      onOpenChange={handleOnOpenChange}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Drawer.Trigger asChild>{children}</Drawer.Trigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          Filtrar resultados
          <TooltipArrow className="fill-primary" />
        </TooltipContent>
      </Tooltip>

      <Drawer.Portal>
        <Drawer.Content
          aria-describedby=""
          className="bg-background fixed inset-0 z-50 ml-12 flex h-auto flex-col justify-between rounded-l-lg border p-4 sm:ml-[calc(100%-600px)]"
        >
          <div className="flex flex-col gap-8">
            <div className="flex justify-between gap-2">
              <Drawer.Title className="flex items-center gap-2 text-lg font-medium">
                <FilterIcon className="size-5" />
                Filtrar resultados
              </Drawer.Title>

              <Drawer.Close asChild>
                <Button variant="ghost" size="icon">
                  <XIcon />
                </Button>
              </Drawer.Close>
            </div>

            <div className="grid-cols-1 grid gap-4 md:grid-cols-2">
              <RenderField<DasMeiListarFiltersFormInput>
                form={form}
                slot={{
                  type: 'combobox',
                  multiple: true,
                  name: 'status',
                  placeholderKey: 'Situação',
                  translateKey: 'Situação',
                  label: 'Situação',
                  options: dasMeiStatusOptions,
                  className: 'col-span-full',
                }}
              />

              <RenderField<DasMeiListarFiltersFormInput>
                form={form}
                slot={{
                  type: 'date',
                  name: 'dataVencimentoInicial',
                  placeholderKey: 'Data vencimento (a partir)',
                  translateKey: 'Data de vencimento (a partir de)',
                  label: 'Data vencimento (a partir de)',
                }}
              />

              <RenderField<DasMeiListarFiltersFormInput>
                form={form}
                slot={{
                  type: 'date',
                  name: 'dataVencimentoFinal',
                  placeholderKey: 'Data vencimento (até)',
                  translateKey: 'Data de vencimento (até)',
                  label: 'Data de vencimento (até)',
                }}
              />

              <RenderField<DasMeiListarFiltersFormInput>
                form={form}
                slot={{
                  type: 'currency',
                  prefix: 'R$',
                  name: 'valorInicial',
                  placeholderKey: 'Valor (a partir)',
                  translateKey: 'Valor (a partir de)',
                  label: 'Valor (a partir de)',
                }}
              />

              <RenderField<DasMeiListarFiltersFormInput>
                form={form}
                slot={{
                  type: 'currency',
                  prefix: 'R$',
                  name: 'valorFinal',
                  placeholderKey: 'Valor (até)',
                  translateKey: 'Valor (até)',
                  label: 'Valor (até)',
                }}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" form={filtersFormId}>
              Aplicar filtros
            </Button>
            <Button type="button" variant="ghost" onClick={handleClearFilters}>
              Limpar filtros
            </Button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
})

ClientesListarFiltersDrawer.displayName = 'XmlRadarListFiltersDialog'
