import { cn } from '@/lib/utils'

import { ProfileButton } from './profile-button'

export function Topbar() {
  return (
    <header
      className={cn(
        'bg-background fixed left-0 top-0 z-10 w-full py-0.5 md:pl-72 h-13 shadow-sm'
      )}
    >
      <div className="flex w-full justify-between px-2">
        <div className="flex w-full items-center justify-center lg:justify-start xl:justify-start 2xl:justify-start">
          <span className="text-muted-foreground ml-14 text-sm">
            <>
              Olá, <span className="font-bold sm:pt-0.5">{'usuario'}</span>
              !👋
            </>
          </span>
        </div>
        <div className="flex items-center px-3 py-1">
          <nav className="flex items-center gap-2">
            <ProfileButton user={undefined} />
          </nav>
        </div>
      </div>
    </header>
  )
}
