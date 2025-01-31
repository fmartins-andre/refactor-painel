import { useCredenciamentoObterDetalheUsuario } from '@/services/api/accountant-panel-api/endpoints/credenciamento'

import { cn } from '@/lib/utils'

import { ProfileButton } from './profile-button'

export function Topbar() {
  const { data: detalheUsuarioData, isLoading: isLoadingDetalheUsuario } =
    useCredenciamentoObterDetalheUsuario()

  return (
    <header
      className={cn(
        'bg-background fixed left-0 top-0 z-10 w-full py-0.5 md:pl-72 h-14 shadow-sm'
      )}
    >
      <div className="flex w-full justify-between px-2">
        <div className="flex w-full items-center justify-center lg:justify-start xl:justify-start 2xl:justify-start">
          {!isLoadingDetalheUsuario && (
            <span className="text-muted-foreground ml-14 text-sm inline-flex items-baseline">
              Olá,{' '}
              <span className="font-bold pl-1 sm:pt-0.5 max-w-[18ch] sm:max-w-[30ch] lg:max-w-[55ch] line-clamp-1 break-all">
                {detalheUsuarioData?.nome ?? 'usuario'}
              </span>
              !👋
            </span>
          )}
        </div>
        <div className="flex items-center px-3 py-1">
          <nav className="flex items-center gap-2">
            <ProfileButton user={detalheUsuarioData} />
          </nav>
        </div>
      </div>
    </header>
  )
}
