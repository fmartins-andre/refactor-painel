import { Menu } from 'lucide-react'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useSidebar } from '@/components/ui/sidebar'

import { sidebarConfig } from './sidebar-config'
import { SidebarHolder } from './sidebar-holder'

export function Sidebar() {
  const { setOpenMobile, openMobile } = useSidebar()

  return (
    <>
      <Sheet onOpenChange={(open) => setOpenMobile(!open)} open={openMobile}>
        <SheetTrigger className="fixed left-4 top-4 z-50 flex items-start justify-start md:hidden">
          <Menu className="text-primary" />
        </SheetTrigger>
        <SheetContent
          className="bg-primary border-primary flex h-full w-72 items-center justify-center rounded-xl"
          side="left"
        >
          <SidebarHolder items={sidebarConfig.sidebarNav} />
        </SheetContent>
      </Sheet>
      <div className="fixed left-0 top-0 z-50 hidden md:block">
        <SidebarHolder items={sidebarConfig.sidebarNav} />
      </div>
    </>
  )
}
