'use client'

import { Accordion } from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/images/icons'

// import { ModalEditCustomer } from '../edit-customer-form/modal-edit-customer'
// import { AccordionContentComponent } from './accordion-content-component'

export function CustomerDataCard() {
  // const { customerDataOptions } = useCustomerDetailConfig()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {/* <Icons.customer_detail /> */}
          <span className="text-md font-medium">Dados do Cliente</span>
        </CardTitle>

        {/* <ModalEditCustomer /> */}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <Accordion type="multiple" className="flex flex-col">
            {/* {customerDataOptions.map((item, index) => (
              <AccordionContentComponent
                key={index}
                accordionValue={item.value}
                name={item.label}
                icon={item.icon}
                context={item.context}
                customerDataValues={item.customerDataValues}
              />
            ))} */}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  )
}
