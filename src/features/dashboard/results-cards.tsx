import { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { TextSkeleton } from '@/components/text-skeleton'

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
  const getDisplayValue = () => {
    switch (true) {
      case isLoading:
        return <TextSkeleton />
      case isComingSoon:
        return '-'

      default:
        return value ?? 0
    }
  }
  return (
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

        <div className="text-2xl font-bold h-8">{getDisplayValue()}</div>

        <span
          className={cn('bg-none text-xs font-medium text-muted-foreground')}
        >
          {isLoading ? (
            <span className="text-muted-foreground/80 animate-pulse">
              carregando
              <TextSkeleton />
            </span>
          ) : (
            title
          )}
        </span>
        {!isLoading && isComingSoon && (
          <span
            className={cn(
              'bg-none text-[10px] font-medium text-muted-foreground'
            )}
          >
            (Em breve)
          </span>
        )}
      </div>
    </div>
  )
}
