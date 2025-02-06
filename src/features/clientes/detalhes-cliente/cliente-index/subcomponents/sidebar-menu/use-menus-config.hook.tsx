import { ReactNode } from 'react'
import { StatusDasMeiModelEnum } from '@/services/api/accountant-panel-api/endpoints/das-mei'
import { TipoPessoaModelEnum } from '@/services/api/accountant-panel-api/schemas'
import { RegimeTributarioClienteModelEnum } from '@/services/api/accountant-panel-api/schemas/cliente-models'
import { LinkProps, useMatchRoute, useParams } from '@tanstack/react-router'
import { BuildingIcon, FileBadgeIcon, FileBoxIcon } from 'lucide-react'

import { useGetCurrentCustomerData } from '../../../helpers/use-get-current-customer-data.hook'

type MenuConfig = {
  icon: ReactNode
  label: ReactNode
  linkProps: LinkProps & {
    active?: boolean // links está ativo? a url está no mesmo endereço do link?
  }
}

type UseMenusConfig = MenuConfig[][]

export function useMenusConfig(): UseMenusConfig {
  const matchRoute = useMatchRoute()

  const clienteId = useParams({
    from: '/_authenticated-routes/clientes/$clienteId',
    select: ({ clienteId }) => clienteId,
  })

  const { data: customer } = useGetCurrentCustomerData()

  const showDasMei = Boolean(
    customer?.tipoPessoa === TipoPessoaModelEnum.JURIDICA &&
      customer.pessoaJuridica?.regimeTributario ===
        RegimeTributarioClienteModelEnum.MEI
  )

  const customerRelatedMenus = (
    [
      {
        icon: <FileBadgeIcon />,
        label: 'Notas Fiscais',
        linkProps: {
          active: Boolean(
            matchRoute({ to: '/clientes/$clienteId/notas-fiscais' })
          ),
          to: '/clientes/$clienteId/notas-fiscais',
          params: { clienteId },
        },
      },
      {
        icon: <FileBadgeIcon />,
        label: 'Todos XML',
        linkProps: {
          active: Boolean(matchRoute({ to: '/clientes/$clienteId/xml' })),
          to: '/clientes/$clienteId/xml',
          params: { clienteId },
        },
      },
      {
        icon: <FileBadgeIcon />,
        label: 'DAS MEI',
        linkProps: {
          active: Boolean(matchRoute({ to: '/clientes/$clienteId/das-mei' })),
          to: '/clientes/$clienteId/das-mei',
          params: { clienteId },
          search: { status: [StatusDasMeiModelEnum.A_VENCER] },
        },
      },
    ] satisfies MenuConfig[]
  ).filter((menu) => {
    if (menu.linkProps.to === '/clientes/$clienteId/das-mei' && !showDasMei) {
      return false
    }

    return true
  })

  const featuresRelatedMenus = [
    {
      icon: <BuildingIcon />,
      label: 'Informações do Cliente',
      linkProps: {
        active: Boolean(matchRoute({ to: '/clientes/$clienteId' })),
        to: '/clientes/$clienteId',
        params: { clienteId },
      },
    },
    {
      icon: <FileBoxIcon />,
      label: 'Módulos ativos',
      linkProps: {
        active: Boolean(matchRoute({ to: '/clientes/$clienteId' })),
        to: '/clientes/$clienteId',
        params: { clienteId },
      },
    },
    {
      icon: <FileBadgeIcon />,
      label: 'Certificado Digital',
      linkProps: {
        active: Boolean(matchRoute({ to: '/clientes/$clienteId' })),
        to: '/clientes/$clienteId',
        params: { clienteId },
      },
    },
  ] satisfies MenuConfig[]

  return [customerRelatedMenus, featuresRelatedMenus]
}
