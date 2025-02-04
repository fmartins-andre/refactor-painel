import { lazy, Suspense, useRef } from 'react'
import { TooltipArrow } from '@radix-ui/react-tooltip'
import { UserIcon, UserPenIcon } from 'lucide-react'

import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { type CustomerDialogRef } from '../../../subcomponents/customer-dialog'
import { AccordionContentComponent } from './subcomponents/accordion-content-component'
import { useCustomerDetailConfig } from './subcomponents/use-customer-detail-config'

const CustomerDialog = lazy(() =>
  import('../../../subcomponents/customer-dialog').then((module) => ({
    default: module.CustomerDialog,
  }))
)

export function CustomerDataCard() {
  const { customerDataOptions } = useCustomerDetailConfig()

  const customerDialogRef = useRef<CustomerDialogRef>(null)

  function handleOpenDialog() {
    customerDialogRef.current?.open?.()
  }

  return (
    <Card className="w-full">
      <CardHeader className="inline-flex flex-row justify-between w-full">
        <CardTitle className="inline-flex gap-2 items-center ">
          <UserIcon />
          <span className="text-md font-medium">Dados do Cliente</span>
        </CardTitle>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="tertiary"
              className="size-11 p-0"
              onClick={handleOpenDialog}
            >
              <UserPenIcon />
            </Button>
          </TooltipTrigger>

          <TooltipContent side="bottom">
            <TooltipArrow className="fill-primary" />
            Editar cliente
          </TooltipContent>
        </Tooltip>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="flex flex-col">
          <Accordion type="multiple" className="flex flex-col">
            {customerDataOptions.map((item, index) => (
              <AccordionContentComponent
                key={index}
                accordionValue={item.value}
                name={item.label}
                icon={item.icon}
                context={item.context}
                customerDataValues={item.customerDataValues}
              />
            ))}
          </Accordion>
        </div>
      </CardContent>

      <Suspense>
        <CustomerDialog ref={customerDialogRef} />
      </Suspense>
    </Card>
  )
}
