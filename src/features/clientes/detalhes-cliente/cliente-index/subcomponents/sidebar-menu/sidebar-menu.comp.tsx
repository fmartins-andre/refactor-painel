import React from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { CustomerDetailsSidebarMenuItem } from './subcomponents/menu-item.comp'
import {
  CustomerDetailsSidebarMenuList,
  CustomerDetailsSidebarMenuRoot,
} from './subcomponents/menu-list.comp'
import { useMenusConfig } from './use-menus-config.hook'

export function CustomerDetailsSidebarMenu() {
  const menusConfig = useMenusConfig()

  return (
    <Card className="w-full">
      <CardContent className="px-0 pb-0 flex flex-col w-full">
        <CustomerDetailsSidebarMenuRoot>
          {menusConfig.map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {groupIndex > 0 && <Separator className="w-[90%] m-auto" />}

              <CustomerDetailsSidebarMenuList>
                {group.map(({ icon, label, linkProps }, itemIndex) => (
                  <CustomerDetailsSidebarMenuItem
                    key={`${groupIndex}-${itemIndex}`}
                    {...linkProps}
                  >
                    {icon} {label}
                  </CustomerDetailsSidebarMenuItem>
                ))}
              </CustomerDetailsSidebarMenuList>
            </React.Fragment>
          ))}
        </CustomerDetailsSidebarMenuRoot>
      </CardContent>
    </Card>
  )
}
