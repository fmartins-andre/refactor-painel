import { Suspense } from 'react'

import Loading from '@/components/loading'

import { ManagementInvoicesContent } from './invoices'
import { ManagementMeiContent } from './management-mei'

export async function DashboardContent() {
  return (
    <Suspense fallback={<Loading />}>
      <ManagementMeiContent />
      <ManagementInvoicesContent />
    </Suspense>
  )
}
