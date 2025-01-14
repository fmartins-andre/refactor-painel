import { Link, useLocation } from '@tanstack/react-router'

import { cn } from '@/lib/utils'
import { useSidebar } from '@/components/ui/sidebar'

import { SidebarNavItem } from './sidebar-config'

type Props = {
  item: SidebarNavItem
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any
}

export function SidebarMenuStatic({ item, user }: Props) {
  const pathname = useLocation({
    select: (location) => location.pathname,
  })

  const { state, setOpenMobile, openMobile } = useSidebar()

  return (
    <>
      {item.comingSoon ? (
        <div className="bg-primary text-primary-foreground dark:bg-background hover:animate-fade-up hover:animate-once hover:animate-duration-[400ms] hover:animate-ease-in-out hover:animate-normal group my-1 flex w-full cursor-not-allowed items-center gap-2 rounded-md border-none py-3 pl-10 opacity-60  transition-colors duration-300 ease-in-out">
          <div className="hover:text-semibold inline-flex items-center gap-2">
            {item.icon}
            <span
              className={cn(
                'text-sm hover:font-semibold',
                pathname.startsWith(item.href) && 'font-semibold'
              )}
            >
              <span className="flex flex-col">
                <span>{item.title}</span>
                <span className="text-bold text-[10px] uppercase leading-none text-white">
                  Em breve
                </span>
              </span>
            </span>
          </div>
        </div>
      ) : user?.is_temp ? (
        <div className="bg-primary text-primary-foreground dark:bg-background hover:animate-fade-up hover:animate-once hover:animate-duration-[400ms] hover:animate-ease-in-out hover:animate-normal group my-1 flex w-full cursor-not-allowed items-center gap-2 rounded-md border-none py-3 pl-10  transition-colors duration-300 ease-in-out">
          <div className="hover:text-semibold inline-flex items-center gap-2">
            {item.icon}
            <span
              className={cn(
                'text-sm hover:font-semibold',
                pathname.startsWith(item.href) && 'font-semibold'
              )}
            >
              <span className="flex flex-col opacity-80">{item.title}</span>
            </span>
          </div>
        </div>
      ) : (
        <Link
          className={cn(
            'bg-primary text-primary-foreground dark:bg-background hover:animate-fade-up hover:animate-once hover:animate-duration-[400ms] hover:animate-ease-in-out hover:animate-normal group my-1 flex w-full items-center gap-2 rounded-md border-none py-3 pl-10 transition-colors duration-300 ease-in-out',
            user?.is_temp && 'cursor-not-allowed opacity-60',
            pathname.startsWith(item.href) && 'bg-primary-dark dark:bg-primary',
            state === 'collapsed' && 'justify-center'
          )}
          to={item.href}
          onClick={() => {
            if (openMobile) {
              setOpenMobile(!openMobile)
            }
            return
          }}
          rel={item.external ? 'noreferrer' : ''}
          target={item.external ? '_blank' : ''}
        >
          <div className="hover:text-semibold inline-flex items-center gap-2">
            {item.icon}
            <span
              className={cn(
                'text-sm hover:font-semibold',
                pathname.startsWith(item.href) && 'font-semibold'
              )}
            >
              {item.comingSoon ? (
                <span className="flex cursor-not-allowed flex-col">
                  <span>{item.title}</span>
                  <span className="text-bold text-[10px] uppercase leading-none text-white">
                    Em breve
                  </span>
                </span>
              ) : (
                <>{state !== 'collapsed' && item.title}</>
              )}
            </span>
          </div>
        </Link>
      )}
    </>
  )
}
