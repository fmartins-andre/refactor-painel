import { PropsWithChildren } from 'react'

export function Content({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full md:pl-64 pt-14">
      <main className="flex flex-col w-full h-full p-4 lg:p-8">{children}</main>
    </div>
  )
}
