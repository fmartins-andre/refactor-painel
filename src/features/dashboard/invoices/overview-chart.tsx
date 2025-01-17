import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Skeleton } from '@/components/ui/skeleton'
import NotFoundImage from '@/components/images/not-found'

import type { TotalInvoicesPerYearOutput } from '../validations/total-invoices-per-year'

interface Props {
  data: TotalInvoicesPerYearOutput | null | undefined
  isLoading: boolean
}

export function OverviewChart({ data, isLoading }: Props) {
  return (
    <>
      {isLoading ? (
        <Skeleton className="h-[400px]" />
      ) : data?.length === 0 || !data ? (
        <div className="flex w-full flex-col items-center justify-center gap-4 py-20">
          <NotFoundImage width={400} />
          <span className="text-primary font-bold">Dados não encontrados</span>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={550}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: 'none',
                borderRadius: '4px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                padding: '10px',
                fontSize: '12px',
              }}
            />
            <Bar
              dataKey="NF-e"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-[#0050DC]"
            />
            <Bar
              dataKey="NFC-e"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-[#06C2FD]"
            />
            <Bar
              dataKey="NFS-e"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-[#03CBBE]"
            />
            <Bar
              dataKey="CT-e"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-[#00D37F]"
            />
            <Bar
              dataKey="MDF-e"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-[#0A0A56]"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  )
}
