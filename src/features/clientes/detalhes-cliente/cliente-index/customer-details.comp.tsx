import { PropsWithChildren } from 'react'

import { CustomerDetailsFeatures } from './subcomponents/features.comp'
import { CustomerDetailsHeader } from './subcomponents/header'
import { CustomerDetailsSidebarMenu } from './subcomponents/sidebar-menu'

export function CustomerDetails({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-8">
      <CustomerDetailsHeader />

      <div className="grid grid-cols-1 xl:grid-cols-[20rem_minmax(0px,_1fr)] gap-8 w-full">
        <aside className="flex flex-col gap-8">
          <CustomerDetailsSidebarMenu />
        </aside>

        <main>
          <CustomerDetailsFeatures>{children}</CustomerDetailsFeatures>
        </main>
      </div>
    </div>
  )
}
