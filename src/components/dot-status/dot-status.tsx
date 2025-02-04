import { DetailedHTMLProps, HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export type DotStatusProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>,
  'children'
> & {
  color?: 'success' | 'info' | 'warning' | 'error'
}

export function DotStatus({ className, color, ...props }: DotStatusProps) {
  return (
    <span
      {...props}
      className={cn(
        className,
        'text-xl leading-none',
        color?.length && `text-${color}`
      )}
    >
      &bull;
    </span>
  )
}
