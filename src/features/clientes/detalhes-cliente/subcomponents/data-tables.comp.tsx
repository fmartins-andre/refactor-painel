import { ComponentProps } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { FileBadgeIcon, FileBarChartIcon, FileDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function CustomerDetailsDataTables() {
  return (
    <Card className="w-full">
      <Tabs.Root defaultValue="xml">
        <CardHeader>
          <Tabs.List className="flex flex-col items-center justify-center gap-4 md:w-full md:flex-row">
            <TabsTrigger value="invoices">
              <FileBarChartIcon className="size-4" />
              Notas Fiscais
            </TabsTrigger>

            <TabsTrigger value="xml">
              <FileDownIcon className="size-4" />
              Todos XMLs
            </TabsTrigger>

            {/* {Boolean(
        customer?.cnpjCpf && customer?.cnpjCpf?.length > 14 && customer.isMei
      ) && ( */}
            <TabsTrigger value="dasmei">
              <FileBadgeIcon className="size-4" />
              DAS MEI
            </TabsTrigger>
            {/* )} */}
          </Tabs.List>
        </CardHeader>

        <CardContent>
          <Tabs.Content value="invoices">{/* <InvoicesList /> */}</Tabs.Content>

          <Tabs.Content value="xml">{/* <XMLList /> */}</Tabs.Content>

          <Tabs.Content value="dasmei">{/* <DueDasMeiList /> */}</Tabs.Content>
        </CardContent>
      </Tabs.Root>
    </Card>
  )
}

type TabsTriggerProps = ComponentProps<typeof Tabs.Trigger>

function TabsTrigger({ className, ...rest }: TabsTriggerProps) {
  return (
    <Tabs.Trigger
      className={cn(
        'hover:text-secondary pb-4 data-[state=active]:text-secondary text-blue flex w-full cursor-pointer select-none items-center justify-center gap-2 px-5 text-sm leading-none outline-none data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current md:max-w-40',
        className
      )}
      {...rest}
    />
  )
}
