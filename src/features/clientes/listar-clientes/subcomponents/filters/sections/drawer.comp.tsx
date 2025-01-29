import {
  forwardRef,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
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

import {
  clienteRegimeTributarioOptions,
  clienteStatusOptions,
} from '../../../constants'
import { useHandleClientesListarFilters } from '../../../helpers/use-handle-clientes-listar-filter-params.hook'
import {
  ClientesListarFiltersFormInput,
  ClientesListarFiltersFormOutput,
} from '../cliente-listar-filters.schema'
import { filtersFormId, formDefaultValues } from '../constants'

export type ClientesListarFiltersDrawerRef = {
  open: () => void
  close: () => void
  clearFilters: () => void
}

export const ClientesListarFiltersDrawer = forwardRef<
  ClientesListarFiltersDrawerRef,
  PropsWithChildren
>(({ children }, ref) => {
  const { filters } = useHandleClientesListarFilters()
  const [open, setOpen] = useState<boolean>(false)

  const form = useFormContext<
    ClientesListarFiltersFormInput,
    ClientesListarFiltersFormOutput
  >()

  useLayoutEffect(() => {
    if (Object.keys(filters).length) setOpen(false)
  }, [filters])

  const { reset, setValue } = form

  function handleClearFilters() {
    setValue('status', null)
    setValue('regimeTributario', null)
    setValue('dataCriacaoInicial', null)
    setValue('dataCriacaoFinal', null)
  }

  const handleOnOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        reset({ ...formDefaultValues, ...filters })
      }
      setOpen(open)
    },
    [filters, reset, setOpen]
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

            <div className="grid-cols grid gap-4 md:grid-cols-2">
              <RenderField<ClientesListarFiltersFormInput>
                form={form}
                slot={{
                  type: 'combobox-single-value',
                  name: 'status',
                  placeholderKey: 'Situação',
                  translateKey: 'Situação',
                  label: 'Situação',
                  options: clienteStatusOptions,
                }}
              />

              <RenderField<ClientesListarFiltersFormInput>
                form={form}
                slot={{
                  type: 'combobox-single-value',
                  name: 'regimeTributario',
                  placeholderKey: 'Regime tributário',
                  translateKey: 'Regime tributário',
                  label: 'Regime tributário',
                  options: clienteRegimeTributarioOptions,
                }}
              />

              <RenderField<ClientesListarFiltersFormInput>
                form={form}
                slot={{
                  type: 'date',
                  name: 'dataCriacaoInicial',
                  placeholderKey: 'Data cadastro (a partir)',
                  translateKey: 'Data de cadastro (a partir de)',
                  label: 'Data cadastro (a partir de)',
                }}
              />

              <RenderField<ClientesListarFiltersFormInput>
                form={form}
                slot={{
                  type: 'date',
                  name: 'dataCriacaoFinal',
                  placeholderKey: 'Data cadastro (até)',
                  translateKey: 'Data de cadastro (até)',
                  label: 'Data de cadastro (até)',
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
