import { ComponentProps, forwardRef, PropsWithChildren } from 'react'
import { StatusDasMeiModelEnum } from '@/services/api/accountant-panel-api/endpoints/das-mei'
import { TipoPessoaModelEnum } from '@/services/api/accountant-panel-api/schemas'
import { RegimeTributarioClienteModelEnum } from '@/services/api/accountant-panel-api/schemas/cliente-models'
import { createLink, useLocation, useParams } from '@tanstack/react-router'
import { FileBadgeIcon, FileBarChartIcon, FileDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { useGetCurrentCustomerData } from '../../helpers/use-get-current-customer-data.hook'

export function CustomerDetailsFeatures({ children }: PropsWithChildren) {
  const pathname = useLocation({
    select: (state) => state.pathname,
  })

  const clienteId = useParams({
    from: '/_authenticated-routes/clientes/$clienteId',
    select: ({ clienteId }) => clienteId,
  })

  const { data: customer } = useGetCurrentCustomerData()

  return (
    <Card className="w-full">
      <CardHeader>
        <nav className="flex flex-col items-center justify-center gap-4 md:w-full md:flex-row">
          <Button
            to="/clientes/$clienteId/notas-fiscais"
            preload="intent"
            params={{ clienteId }}
            data-state={
              pathname.includes('notas-fiscais') ? 'active' : undefined
            }
            disabled={pathname.includes('notas-fiscais')}
          >
            <FileBarChartIcon className="size-4" />
            Notas Fiscais
          </Button>

          <Button
            to="/clientes/$clienteId/xml"
            preload="intent"
            params={{ clienteId }}
            data-state={pathname.includes('xml') ? 'active' : undefined}
            disabled={pathname.includes('xml')}
          >
            <FileDownIcon className="size-4" />
            Todos XMLs
          </Button>

          {Boolean(
            customer?.tipoPessoa === TipoPessoaModelEnum.JURIDICA &&
              customer.pessoaJuridica?.regimeTributario ===
                RegimeTributarioClienteModelEnum.MEI
          ) && (
            <Button
              to="/clientes/$clienteId/das-mei"
              preload="intent"
              params={{ clienteId }}
              search={{ status: [StatusDasMeiModelEnum.A_VENCER] }}
              data-state={pathname.includes('das-mei') ? 'active' : undefined}
              disabled={pathname.includes('das-mei')}
            >
              <FileBadgeIcon className="size-4" />
              DAS MEI
            </Button>
          )}
        </nav>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  )
}

const BasicLinkComponent = forwardRef<HTMLAnchorElement, ComponentProps<'a'>>(
  ({ className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        {...props}
        className={cn(
          'hover:text-secondary pb-4 data-[state=active]:text-secondary text-blue flex w-full cursor-pointer select-none items-center justify-center gap-2 px-5 text-sm leading-none outline-none data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current md:max-w-40',
          className
        )}
      />
    )
  }
)

BasicLinkComponent.displayName = 'BasicLinkComponent'

const Button = createLink(BasicLinkComponent)
