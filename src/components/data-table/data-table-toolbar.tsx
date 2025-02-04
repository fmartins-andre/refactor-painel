import React from 'react'

import { cn } from '@/lib/utils'

type Props = React.ComponentProps<'div'>

export function DataTableToolbar({ className, ...rest }: Props) {
  return (
    <div
      className={cn(
        'flex w-full justify-between gap-4 md:justify-end',
        className
      )}
      {...rest}
    />
  )
}
