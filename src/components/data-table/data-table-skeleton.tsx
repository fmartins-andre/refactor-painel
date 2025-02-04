import { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/utils'

import { Skeleton } from '../ui/skeleton'

export type DataTableSkeletonProps = ComponentPropsWithoutRef<'div'> & {
  rows?: number
}
export function DataTableSkeleton({
  rows = 2,
  className,
  ...props
}: DataTableSkeletonProps) {
  return (
    <div
      className={cn(
        'flex flex-col border border-muted/50 overflow-hidden',
        className
      )}
      {...props}
    >
      <Skeleton className="h-12 w-full" />
      {Array.from(Array(rows)).map((_, i) => (
        <DataTableSkeletonRow key={i} />
      ))}
    </div>
  )
}

export function DataTableSkeletonRow() {
  return (
    <div className="inline-flex items-center gap-x-10 border-b border-b-muted/80">
      <div className="inline-flex p-4 w-full max-w-80">
        <div className="inline-flex gap-4 grow items-center">
          <Skeleton className="size-12 rounded-full" />
          <div className="inline-flex flex-colgrow gap-1">
            <Skeleton className="h-4 inline-flex w-full" />
            <Skeleton className="h-4 inline-flex w-5/6" />
          </div>
        </div>
      </div>
      <Skeleton className="h-8 w-5/6" />
      <div className="flex flex-col gap-1 w-36">
        <Skeleton className="h-4 inline-flex w-full" />
        <Skeleton className="h-4 inline-flex w-5/6" />
      </div>
      <Skeleton className="h-8 w-48" />
    </div>
  )
}
