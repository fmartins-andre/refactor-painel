import { TooltipArrow } from '@radix-ui/react-tooltip'
import { SearchIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import {
  ClientesListarFiltersFormInput,
  ClientesListarFiltersFormOutput,
} from '../cliente-listar-filters.schema'
import { filtersFormId } from '../constants'

export function ClientesListarFiltersSearchBarSection() {
  const form = useFormContext<
    ClientesListarFiltersFormInput,
    ClientesListarFiltersFormOutput
  >()

  return (
    <div className="flex grow md:min-w-80">
      <FormField
        name="busca"
        control={form.control}
        render={({ field }) => {
          return (
            <FormItem className="flex grow flex-col gap-2">
              {/* <FormLabel className="text-muted-foreground">Pesquisar</FormLabel> */}
              <FormControl>
                <div className="flex gap-1">
                  <Input
                    className="h-10 dark:bg-black"
                    placeholder="Pesquisar..."
                    type="text"
                    {...field}
                    value={field.value ?? ''}
                    onChange={field.onChange}
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="submit"
                        form={filtersFormId}
                        size="icon"
                        className="p-2"
                      >
                        <SearchIcon />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      Pesquisar
                      <TooltipArrow className="fill-primary" />
                    </TooltipContent>
                  </Tooltip>
                </div>
              </FormControl>
            </FormItem>
          )
        }}
      />
    </div>
  )
}
