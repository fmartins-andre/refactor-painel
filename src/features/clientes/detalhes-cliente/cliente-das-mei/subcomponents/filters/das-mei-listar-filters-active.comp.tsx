import { useMemo, useRef } from 'react'
import { ensureType } from '@/utils/ensure-type'
import { inputMask } from '@/utils/input-mask'
import { FilterIcon } from 'lucide-react'
import { DateTime } from 'luxon'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { dasMeiStatusOptions } from '../../constants'
import { useHandleDasMeiListarFilters } from '../../helpers/use-handle-das-mei-listar-filter-params.hook'
import {
  ClientesListarFiltersDrawer,
  ClientesListarFiltersDrawerRef,
} from './sections/drawer.comp'

export function DasMeiListarFiltersActive() {
  const { filters } = useHandleDasMeiListarFilters()

  const validFilters = useMemo(
    () =>
      Object.entries(filters).reduce<
        Record<Partial<keyof typeof filters>, string>
      >((validFilters, [key, value]) => {
        if (!value) return validFilters
        if (Array.isArray(value) && !value.length) return validFilters

        switch (key as keyof typeof filters) {
          case 'status':
            return Array.isArray(value)
              ? {
                  ...validFilters,

                  ['situação']: dasMeiStatusOptions
                    .filter((opt) => value.includes(opt.value))
                    .map((item) => item.value)
                    .join(', '),
                }
              : validFilters

          case 'valorInicial':
          case 'valorFinal':
            return typeof value === 'number'
              ? {
                  ...validFilters,
                  [key]: inputMask.currency(value, 'R$', {
                    forceDecimalPlaces: true,
                  }),
                }
              : validFilters

          case 'dataVencimentoFinal':
          case 'dataVencimentoInicial':
            return {
              ...validFilters,
              [key]: ensureType(value, 'date')
                ? DateTime.fromJSDate(value as Date).toLocaleString(
                    { dateStyle: 'short' },
                    { locale: 'pt-BR' }
                  )
                : value.toLocaleString('pt-BR'),
            }

          default:
            return validFilters
        }
      }, Object.create({})),
    [filters]
  )

  const filtersCounter = Object.keys(validFilters).length
  const hasValidFilters = Boolean(filtersCounter)

  const handleKeyLabel = (key: string) => {
    return key.replace(/[A-Z]/g, (m) => ` ${m}`.toLowerCase())
  }

  const drawerRef = useRef<ClientesListarFiltersDrawerRef>(null)
  const handleOpenDrawer = () => drawerRef.current?.open?.()

  return (
    <div className="flex w-full justify-between gap-1">
      <div className="bg-muted/50 flex min-h-8 grow flex-wrap items-center gap-1 rounded-lg px-2 py-1">
        {hasValidFilters ? (
          Object.entries(validFilters).map(([key, value]) =>
            value ? (
              <Tooltip key={key}>
                <TooltipTrigger asChild>
                  <Badge
                    className="h-fit cursor-pointer px-2 py-1 inline-flex gap-1"
                    variant="default"
                    onClick={handleOpenDrawer}
                  >
                    <span>{handleKeyLabel(key)}:</span>
                    <span className="font-normal">{value}</span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Clique para alterar os filtros</TooltipContent>
              </Tooltip>
            ) : null
          )
        ) : (
          <span className="text-muted-foreground/50">filtros ativos</span>
        )}
      </div>

      <ClientesListarFiltersDrawer ref={drawerRef}>
        <div className="relative">
          {Boolean(filtersCounter) && (
            <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground absolute right-0 top-0 z-[1] flex min-w-0 -translate-y-4 translate-x-4 items-center justify-center rounded-full px-2 py-1 font-mono">
              {filtersCounter}
            </Badge>
          )}
          <Button size="icon" type="button" className="shrink-0">
            <FilterIcon />
          </Button>
        </div>
      </ClientesListarFiltersDrawer>
    </div>
  )
}
