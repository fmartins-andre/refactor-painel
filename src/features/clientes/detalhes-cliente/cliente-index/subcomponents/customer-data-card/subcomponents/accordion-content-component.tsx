import type { ReactNode } from 'react'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { DoubleColumnData } from './stack-show-detail'
import { TooltipCustomerInfo } from './tooltip-customer-info'
import {
  CustomerContextType,
  CustomerDataValues,
} from './use-customer-detail-config'

export function AccordionContentComponent({
  accordionValue,
  context,
  name,
  icon,

  customerDataValues,
}: {
  accordionValue: string
  name: string
  icon: ReactNode
  context: CustomerContextType
  customerDataValues: CustomerDataValues[]
}) {
  return (
    <AccordionItem value={accordionValue}>
      <AccordionTrigger className="flex w-full items-center p-4 hover:bg-accent">
        <TooltipProvider delayDuration={400}>
          <Tooltip>
            <>
              <TooltipTrigger className="flex w-full items-center gap-2 p-2">
                {icon}
                <span className="text-md font-medium">{name}</span>
              </TooltipTrigger>
              <TooltipCustomerInfo context={context} />
            </>
          </Tooltip>
        </TooltipProvider>
      </AccordionTrigger>
      <AccordionContent className="px-6">
        {customerDataValues.map((item, index) => (
          <DoubleColumnData key={index} label={item.label} value={item.value} />
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}
