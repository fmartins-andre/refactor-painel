import { useLayoutEffect, useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { CircleIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useSidebar } from '@/components/ui/sidebar'

import { SidebarNavItem } from './sidebar-config'

type Props = {
  item: SidebarNavItem
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any
}

export function SidebarMenuCollapsible({ item, user }: Props) {
  if (!item.href.trim().length) {
    throw new Error('O menu pai deve informar endereço base válido!')
  }

  const pathname = useLocation({
    select: (location) => location.pathname,
  })

  const isItemPath = pathname.startsWith(item.href)

  const [accordionValue, setAccordionValue] = useState<string>('')

  const { state } = useSidebar()

  useLayoutEffect(
    () => {
      if (!isItemPath) {
        setAccordionValue(isItemPath ? item.href : '')
      }
    },
    // manter o pathname aqui para assegurar a atualização do estado
    [isItemPath, item.href, pathname]
  )

  return (
    <Accordion
      className={cn(
        'bg-primary text-primary-foreground group flex w-full items-center gap-2 rounded-md border-none pl-10 transition-colors duration-300 ease-in-out',
        item.disabled && 'cursor-not-allowed opacity-60',
        user?.is_temp && 'cursor-not-allowed opacity-60',
        state === 'collapsed' && 'justify-center'
      )}
      collapsible
      disabled={item.disabled}
      type="single"
      value={accordionValue}
      onValueChange={setAccordionValue}
    >
      <AccordionItem className="w-full py-0 border-b-0" value={item.href}>
        <AccordionTrigger className="hover:no-underline">
          <div className="hover:text-semibold inline-flex items-center gap-2">
            {item.icon}
            <span className={cn('text-sm font-normal hover:font-semibold')}>
              {state !== 'collapsed' && item.title}
            </span>
          </div>
        </AccordionTrigger>
        {item.items?.map((child) => (
          <AccordionContent className="my-2 h-8" key={child.href}>
            <Link
              className={cn(
                'bg-primary text-primary-foreground flex items-center gap-x-2 rounded-lg p-2 text-xs font-light hover:text-white',
                pathname.includes(child.href) &&
                  'bg-primary text-accent dark:bg-secondary',
                pathname.startsWith(child.href) &&
                  'bg-primary-dark dark:bg-primary'
              )}
              to={`${child.href}`}
              rel={child.external ? 'noreferrer' : ''}
              target={child.external ? '_blank' : ''}
            >
              <CircleIcon className="hover:text-white" size={8} />
              <div className="hover:text-semibold inline-flex items-center gap-2">
                {child.icon}
                <span
                  className={cn(
                    'text-sm hover:font-semibold',
                    pathname.startsWith(child.href) && 'font-semibold'
                  )}
                >
                  {state !== 'collapsed' && child.title}
                </span>
              </div>
            </Link>
          </AccordionContent>
        ))}
      </AccordionItem>
    </Accordion>
  )
}
