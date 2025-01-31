import { PropsWithChildren } from 'react'

import { CustomerDataCard } from './subcomponents/customer-data-card.comp'
import { CustomerDetailsFeatures } from './subcomponents/features.comp'
import { CustomerDetailsHeader } from './subcomponents/header'
import { StateTaxIdCard } from './subcomponents/state-tax-id-card.comp'

export function CustomerDetails({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-8">
      <CustomerDetailsHeader />

      <div className="flex gap-8 w-full flex-col lg:flex-row lg:flex-wrap ">
        <aside className="flex flex-col xl:w-96 gap-8 w-full">
          <StateTaxIdCard />

          <CustomerDataCard />
        </aside>

        <main className="flex grow">
          <CustomerDetailsFeatures>{children}</CustomerDetailsFeatures>
        </main>
      </div>
    </div>
  )
}
