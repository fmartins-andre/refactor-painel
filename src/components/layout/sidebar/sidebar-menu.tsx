import { SidebarNavItem } from './sidebar-config'
import { SidebarMenuCollapsible } from './sidebar-menu-collapsible'
import { SidebarMenuStatic } from './sidebar-menu-static'

type Props = {
  item: SidebarNavItem
}

export function SidebarMenu({ item }: Props) {
  const user = {}

  return item.items?.length ? (
    <SidebarMenuCollapsible item={item} user={user} />
  ) : (
    <SidebarMenuStatic item={item} user={user} />
  )
}
