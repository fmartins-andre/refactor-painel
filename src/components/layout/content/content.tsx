import { PropsWithChildren } from 'react'

export function Content({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full h-svh min-h-svh md:pl-64 pt-14">
      <main className="flex flex-col w-full h-full overflow-auto p-4 lg:p-8">
        {children}
      </main>
    </div>
  )
}
