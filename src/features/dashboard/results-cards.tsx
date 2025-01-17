import { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

export interface ResultsCardsProps {
  title: string
  icon: ReactNode | JSX.Element
  value: number
  style: string
  isComingSoon?: boolean
  isLoading: boolean
}

export function ResultsCards({
  title,
  icon,
  value,
  style,
  isLoading,
  isComingSoon,
}: ResultsCardsProps) {
  return (
    <>
      {isLoading ? (
        <Skeleton className="h-32 w-full" />
      ) : (
        <div
          className={cn(
            'bg-card shadow-default flex w-full flex-col items-start rounded-md py-5 pr-2'
          )}
        >
          <div
            className={cn(
              style,
              'bg-card flex h-24 w-full min-w-[220px] flex-col items-start rounded-e-2xl border-l-4 pl-4 '
            )}
          >
            <div className={cn(style, 'self-end rounded-full p-2')}>{icon}</div>
            <div className="text-2xl font-bold">
              {isComingSoon ? <> - </> : <>{value}</>}
            </div>
            <span
              className={cn('bg-none text-xs font-medium text-[#718EBF]/80')}
            >
              {title}
            </span>
            {isComingSoon && (
              <span
                className={cn(
                  'bg-none text-[10px] font-medium text-[#718EBF]/80'
                )}
              >
                (Em breve)
              </span>
            )}
          </div>
        </div>
      )}
    </>
  )
}
