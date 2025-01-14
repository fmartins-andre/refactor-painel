import { Link } from '@tanstack/react-router'

import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useSidebar } from '@/components/ui/sidebar'

import { InfoUserCard } from './info-user-card'
import { SidebarNavItem } from './sidebar-config'
import { SidebarMenu } from './sidebar-menu'

type Props = {
  items: SidebarNavItem[]
}

export function SidebarHolder({ items }: Props) {
  const { state } = useSidebar()

  return items.length ? (
    <aside
      className={cn(
        'bg-primary dark:bg-background relative h-dvh min-h-screen rounded-ee-3xl rounded-se-3xl p-0',
        state === 'collapsed' ? 'w-40' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col items-center gap-8 py-4">
        <div className="w-full py-4">
          <Link to={'/'} className="cursor-pointer">
            <img
              alt="Emitte mais logo"
              className={cn('mx-auto object-contain')}
              height={80}
              src="/emitte-logo.svg"
              width={180}
            />
          </Link>
        </div>
        <ScrollArea className="flex w-full max-w-64 shrink grow px-5">
          <div className="w-full gap-1">
            {items.map((item, index) => (
              <div key={index}>
                {item.hasSeparator && (
                  <Separator className="bg-primary-dark my-8 w-full" />
                )}
                <SidebarMenu item={item} />
              </div>
            ))}
          </div>
        </ScrollArea>
        <InfoUserCard />
      </div>
    </aside>
  ) : (
    <></>
  )
}
