import { PropsWithChildren } from 'react'
import { NavigationMenu } from '@radix-ui/react-navigation-menu'

import { NavigationMenuList } from '@/components/ui/navigation-menu'

type Props = PropsWithChildren

export function CustomerDetailsSidebarMenuRoot({ children }: Props) {
  return (
    <NavigationMenu className="w-full max-w-full" orientation="vertical">
      {children}
    </NavigationMenu>
  )
}

export function CustomerDetailsSidebarMenuList({ children }: Props) {
  return (
    <NavigationMenuList className="flex flex-col space-x-0 py-4">
      {children}
    </NavigationMenuList>
  )
}
