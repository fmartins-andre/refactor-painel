import { ReactNode } from 'react'
import { StatusDasMeiModelEnum } from '@/services/api/accountant-panel-api/endpoints/das-mei'
import { TipoPessoaModelEnum } from '@/services/api/accountant-panel-api/schemas'
import { RegimeTributarioClienteModelEnum } from '@/services/api/accountant-panel-api/schemas/cliente-models'
import { LinkProps, useMatchRoute, useParams } from '@tanstack/react-router'
import {
  BuildingIcon,
  FileBadgeIcon,
  FileBarChartIcon,
  FileBoxIcon,
  FileCode2Icon,
} from 'lucide-react'

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
      customer?.regimeTributario === RegimeTributarioClienteModelEnum.MEI
  )

  const customerRelatedMenus = (
    [
      {
        icon: <FileBarChartIcon />,
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
        icon: <FileCode2Icon />,
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
        active: Boolean(matchRoute({ to: '/clientes/$clienteId/info' })),
        to: '/clientes/$clienteId/info',
        params: { clienteId },
      },
    },
    {
      icon: <FileBoxIcon />,
      label: 'Configurações do Cliente',
      linkProps: {
        active: Boolean(matchRoute({ to: '/clientes/$clienteId/config' })),
        to: '/clientes/$clienteId/config',
        params: { clienteId },
      },
    },
    {
      icon: <FileBadgeIcon />,
      label: 'Certificado Digital',
      linkProps: {
        active: Boolean(
          matchRoute({ to: '/clientes/$clienteId/certificado-digital' })
        ),
        to: '/clientes/$clienteId/certificado-digital',
        params: { clienteId },
      },
    },
  ] satisfies MenuConfig[]

  return [customerRelatedMenus, featuresRelatedMenus]
}
