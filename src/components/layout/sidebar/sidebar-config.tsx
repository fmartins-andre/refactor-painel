import { type ReactNode } from 'react'
import { LinkProps } from '@tanstack/react-router'

import { Icons } from '@/components/images/icons'

export interface NavItem {
  title?: string
  href: NonUndefined<LinkProps['to']>
  disabled?: boolean
  external?: boolean
  icon?: ReactNode
  roles?: string[]
  feature?: string
}

export interface SidebarNavItem extends NavItem {
  items?: SidebarNavItem[]
  hasSeparator?: boolean
  comingSoon?: boolean
}

export interface Shortcuts extends NavItem {
  partialKey?: string
  completeKey?: string
}

interface SidebarConfig {
  sidebarNav: SidebarNavItem[]
  shortcuts: Shortcuts[]
}

export const sidebarConfig: SidebarConfig = {
  shortcuts: [
    {
      completeKey: 'CTRL + H',
      href: '/',
      partialKey: 'h',
      title: 'Home',
    },
  ],
  sidebarNav: [
    {
      href: '/dashboard',
      icon: <Icons.monitor className="size-4" />,
      title: 'Visão geral',
    },
    {
      href: '/clientes',
      icon: <Icons.customers className="size-4" />,
      title: 'Clientes',
    },
    {
      href: '/certificado',
      icon: <Icons.certificate className="size-4" />,
      title: 'Certificado',
      hasSeparator: true,
    },
    {
      href: '/notas-avulsas',
      icon: <Icons.invoices className="size-4" />,
      title: 'Notas Adicionais',
    },

    {
      href: '/',
      icon: <Icons.faq className="size-4" />,
      title: 'Central de Ajuda',
      hasSeparator: true,
      comingSoon: true,
    },
  ],
}
