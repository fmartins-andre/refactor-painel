import { PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

export function Content({ children }: PropsWithChildren) {
  return (
    <main
      className={cn(
        'flex h-fit min-h-full w-full overflow-auto px-4 pb-10 pt-14 md:px-8 md:pl-72'
      )}
    >
      {children}
    </main>
  )
}
