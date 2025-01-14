import { PropsWithChildren } from 'react'

import { SidebarProvider } from '../ui/sidebar'
import { Content } from './content'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'

export function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <SidebarProvider>
        <Sidebar />
        <Topbar />
        <Content>{children}</Content>
      </SidebarProvider>
    </div>
  )
}
