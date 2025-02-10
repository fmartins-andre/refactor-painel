import { ComponentProps } from 'react'

import { Card, CardContent } from '@/components/ui/card'

import { useMenusConfig } from './sidebar-menu/use-menus-config.hook'

export function CustomerDetailsContent(props: ComponentProps<'div'>) {
  const menusConfig = useMenusConfig()

  const currentMenu = menusConfig.flat().find((value) => value.linkProps.active)

  return (
    <Card className="w-full pt-6">
      <CardContent className="flex flex-col gap-8">
        <div className="flex gap-4 items-center">
          {currentMenu?.icon}
          <h2 className="text-xl">{currentMenu?.label}</h2>
        </div>

        <div {...props} />
      </CardContent>
    </Card>
  )
}
