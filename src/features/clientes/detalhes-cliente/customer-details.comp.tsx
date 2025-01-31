import { CustomerDataCard } from './subcomponents/customer-data-card.comp'
import { CustomerDetailsDataTables } from './subcomponents/data-tables.comp'
import { CustomerDetailsHeader } from './subcomponents/header.comp'
import { StateTaxIdCard } from './subcomponents/state-tax-id-card.comp'

export function CustomerDetails() {
  return (
    <div className="flex flex-col gap-8">
      <CustomerDetailsHeader />

      <div className="flex gap-8 w-full flex-wrap">
        <aside className="flex flex-col gap-8 grow grow-1 min-w-[400px] basis-1/12">
          <StateTaxIdCard />

          <CustomerDataCard />
        </aside>

        <main className="flex grow grow-3 min-w-[600px] basis-5/12">
          <CustomerDetailsDataTables />
        </main>
      </div>
    </div>
  )
}
