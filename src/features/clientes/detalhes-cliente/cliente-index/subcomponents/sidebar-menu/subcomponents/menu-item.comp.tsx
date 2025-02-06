import { ComponentProps } from 'react'
import { Link, LinkProps } from '@tanstack/react-router'

import { cn } from '@/lib/utils'
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'

type Props = LinkProps &
  Pick<ComponentProps<typeof NavigationMenuLink>, 'className' | 'active'>

export function CustomerDetailsSidebarMenuItem({
  className,
  active,
  ...linkProps
}: Props) {
  return (
    <NavigationMenuItem className="flex w-full">
      <NavigationMenuLink active={active} asChild>
        <Link
          {...linkProps}
          className={cn(
            'flex w-full py-4 px-6 h-16 items-center hover:bg-muted text-md font-medium hover:underline gap-4',
            active && 'bg-muted',
            className
          )}
        />
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}
