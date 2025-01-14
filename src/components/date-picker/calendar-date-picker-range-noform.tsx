import { HTMLAttributes, useState } from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'

import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface CalendarDateRangePickerNoFormProps
  extends HTMLAttributes<HTMLButtonElement> {
  initialDate?: Date
  selectDate?: Date
  onDateChange?: (date: DateRange) => void
}

export function CalendarDateRangePickerNoForm({
  className,
  initialDate,
  selectDate,
  onDateChange,
}: CalendarDateRangePickerNoFormProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: initialDate || undefined,
    to: selectDate || undefined,
  })

  const handleDateChange = (newDate: any) => {
    setDate(newDate)
    if (onDateChange) {
      onDateChange(newDate)
    }
  }

  return (
    <div className={'grid gap-1'}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            id="date"
            type="button"
            className={cn(
              'border-input dark:bg-accent dark:border-gray700 ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-12 w-full items-center justify-between whitespace-nowrap rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
              className
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
            defaultMonth={initialDate}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
