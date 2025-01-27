/* eslint-disable react-hooks/exhaustive-deps */
import { HTMLAttributes, useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { SearchCustomers as SearchCustomersType } from './validations/search-customers'

export function DueCertificateDatePickerRange({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const { setValue } = useFormContext<SearchCustomersType>()

  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })

  useEffect(() => {
    if (date) {
      setValue('dataInicial', date.from?.toISOString() ?? '')
      setValue('dataFinal', date.to?.toISOString() ?? '')
    }
  }, [date])

  return (
    <div className={cn('grid gap-1', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            id="date"
            type="button"
            className={cn(
              'focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground dark:bg-accent dark:border-gray700 inline-flex h-12 items-center justify-center whitespace-nowrap rounded-md border border-[#F1F5F9] bg-[#F1F5F9] px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 '
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'dd/MM/yy', {
                    locale: ptBR,
                  })}{' '}
                  -{' '}
                  {format(date.to, 'dd/MM/yy', {
                    locale: ptBR,
                  })}
                </>
              ) : (
                format(date.from, 'dd/MM/yy')
              )
            ) : (
              <span>Selecione um período</span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            captionLayout="dropdown-buttons"
            initialFocus
            mode="range"
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
