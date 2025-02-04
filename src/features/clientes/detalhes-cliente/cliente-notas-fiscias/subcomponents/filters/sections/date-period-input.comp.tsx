import { useCallback, useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const formatPeriod = ({
  fromDate,
  toDate,
}: {
  fromDate: Date
  toDate: Date
}) => {
  const fromDateFormatted = `${format(fromDate, 'yyyy-MM-dd')}`
  const toDateFormatted = `${format(toDate, 'yyyy-MM-dd')}`
  return `${fromDateFormatted}/${toDateFormatted}`
}

export function CustomerInvoicesFilterDatePeriod() {
  const newParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  )

  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })

  const handleSelectPeriod = useCallback(async () => {
    if (date && date.from && date.to) {
      newParams.set(
        'periodo',
        `${formatPeriod({
          fromDate: date.from,
          toDate: date.to,
        })}`
      )
      // router.push(`${pathname}?${newParams.toString()}`)
    }
  }, [date, newParams])

  useEffect(() => {
    handleSelectPeriod()
  }, [date, handleSelectPeriod])

  return (
    <div className={cn('grid gap-1')}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            id="date"
            type="button"
            className={cn(
              'border-input dark:bg-accent dark:border-gray700 ring-offset-background focus:ring-ring mx-1 flex h-12 w-72 items-center justify-between  gap-2 whitespace-nowrap rounded-md bg-[#F1F5F9] px-3  py-2 text-sm shadow-sm placeholder:text-[#7D93B8] focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:w-40 [&>span]:line-clamp-1'
            )}
          >
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
              <span className="text-[#7D93B8]">Selecione um período</span>
            )}
            <CalendarIcon className="mr-2 size-4 text-[#7D93B8]" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            captionLayout="dropdown-buttons"
            initialFocus
            mode="range"
            defaultMonth={date?.from}
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
