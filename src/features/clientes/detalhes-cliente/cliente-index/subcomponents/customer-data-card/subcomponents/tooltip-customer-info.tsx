import { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'
import { TooltipContent } from '@/components/ui/tooltip'

import {
  CustomerContextType,
  useCustomerDetailConfig,
} from './use-customer-detail-config'

interface Props {
  context: CustomerContextType
}

export function TooltipCustomerInfo({ context }: Props) {
  const {
    addressCustomerData,
    basicsCustomerData,
    activeModulesData,
    certificateData,
  } = useCustomerDetailConfig()

  switch (context) {
    case 'BASIC_INFO':
      return (
        <TooltipContent
          className="bg-background min-w-56 p-5 shadow-md border"
          side="right"
        >
          <div className="grid grid-cols-2 gap-5">
            {basicsCustomerData.map(({ label, value }, index) => (
              <DoubleColumnData
                key={index}
                label={label}
                value={value ?? ' - '}
              />
            ))}
          </div>
        </TooltipContent>
      )

    case 'ADDRESS':
      return (
        <TooltipContent
          className="bg-background min-w-56 p-5 shadow-md border"
          side="right"
        >
          <div className="grid grid-cols-2 gap-5">
            {addressCustomerData.map(({ label, value }, index) => (
              <DoubleColumnData
                key={index}
                label={label}
                value={value ?? ' - '}
              />
            ))}
          </div>
        </TooltipContent>
      )

    case 'MODULES':
      return (
        <TooltipContent
          className="bg-background min-w-56 p-5 shadow-md border"
          side="right"
        >
          {activeModulesData.some((i) => i.rawValue) ? (
            <div className="grid grid-cols-2 gap-5">
              {activeModulesData.reduce((agg: ReactNode[], curr, index) => {
                if (!curr.rawValue) return agg
                return [...agg, <Badge key={index}>{curr.label}</Badge>]
              }, [])}
            </div>
          ) : (
            <span className="text-muted-foreground">Nenhum módulo ativo</span>
          )}
        </TooltipContent>
      )

    case 'CERTIFICATE':
      return (
        <TooltipContent
          className="bg-background min-w-56 p-5 shadow-md border"
          side="right"
        >
          <div className="grid grid-cols-2 gap-5">
            {certificateData.map(({ label, value }, index) => (
              <DoubleColumnData
                key={index}
                label={label}
                value={value ?? ' - '}
              />
            ))}
          </div>
        </TooltipContent>
      )

    default:
      return null
  }
}

function DoubleColumnData({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <span className="text-primary text-medium text-sm">{label}</span>
      <span className="text-medium text-foreground text-xs">{value}</span>
    </div>
  )
}
