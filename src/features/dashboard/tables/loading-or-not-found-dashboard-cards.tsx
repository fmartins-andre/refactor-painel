import { PropsWithChildren } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import NotFoundImage from '@/components/images/not-found'

type Props = PropsWithChildren<{
  isLoading?: boolean
  hasData: boolean
}>

export function LoadingOrNotFoundDashboardCards({
  isLoading,
  hasData,
  children,
}: Props) {
  return (
    <>
      {isLoading ? (
        <Skeleton className="h-[300px]" />
      ) : !hasData ? (
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <NotFoundImage width={400} />
          <span className="text-primary font-bold">Dados não encontrados</span>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  )
}
