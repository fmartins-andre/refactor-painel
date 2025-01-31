import { lazy, Suspense } from 'react'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { RefreshAllCards } from './refresh-all-cards'

const ManagementMeiContent = lazy(() =>
  import('./management-mei').then((module) => ({
    default: module.ManagementMeiContent,
  }))
)

const ManagementInvoicesContent = lazy(() =>
  import('./invoices').then((module) => ({
    default: module.ManagementInvoicesContent,
  }))
)

export function TabsDashboard() {
  return (
    <Tabs className="flex flex-col gap-8" defaultValue="mei">
      <TabsList
        className="bg-accent flex flex-row items-center justify-center md:justify-end lg:justify-end xl:justify-end 2xl:justify-end"
        defaultValue="mei"
      >
        <div className="bg-primary shadow-default inline-flex items-center rounded-full px-2 py-1.5">
          <TabsTrigger
            value="mei"
            className="w-32 md:w-28 lg:w-28 xl:w-28 2xl:w-28"
          >
            Gestão MEI
          </TabsTrigger>
          <TabsTrigger
            value="invoices"
            className="w-32 md:w-28 lg:w-28 xl:w-28 2xl:w-28"
          >
            Notas Fiscais
          </TabsTrigger>
        </div>
        <RefreshAllCards />
      </TabsList>

      <Suspense fallback={<span>carregando...</span>}>
        <ManagementMeiContent />
      </Suspense>

      <Suspense fallback={<span>carregando...</span>}>
        <ManagementInvoicesContent />
      </Suspense>
    </Tabs>
  )
}
