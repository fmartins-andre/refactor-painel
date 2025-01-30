import {
  ClienteListagemViewModel,
  StatusClienteModelEnum,
} from '@/services/api/accountant-panel-api/schemas/cliente-view-model'
import { inputMask } from '@/utils/input-mask'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  clienteRegimeTributarioOptions,
  clienteStatusOptions,
} from '../constants'

export function useAccountantCustomers() {
  // async function handleAccessEmitter(_companyId: number) {
  //   await api.get(`/login/emissor/${companyId}`).then(({ data }) => {
  //     window.open(
  //       `${process.env.NEXT_PUBLIC_EMISSOR_FRONT_URL}/login?${data}`,
  //       '_blank'
  //     )
  //   })
  // }

  const tableColumns: ColumnDef<ClienteListagemViewModel>[] = [
    {
      accessorKey: 'cnpjCpf',
      header: () => <div className="flex">CNPJ/Razão Social</div>,
      cell: ({ row }) => {
        return (
          <div className="flex max-w-80 items-center gap-2">
            <Avatar>
              <AvatarFallback>
                {row.original.nomeRazaoSocial.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex w-full flex-col max-w-80">
              <span className="text-primary line-clamp-1 text-ellipsis break-all text-start font-medium">
                {row.original.nomeRazaoSocial}
              </span>
              <span className="line-clamp-1 text-ellipsis break-all text-start text-sm text-muted-foreground">
                {inputMask.cpfCnpj(row.original.documento)}
              </span>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: () => <div>Status</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <Badge
            variant={
              row.original.status === StatusClienteModelEnum.ATIVO
                ? 'default'
                : row.original.status === StatusClienteModelEnum.BLOQUEADO
                  ? 'secondary'
                  : 'tertiary'
            }
            className="w-28"
          >
            {clienteStatusOptions.find(
              (opt) => opt.value === row.original.status
            )?.label ?? row.original.status}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: 'regimeEspecialDescricao',
      header: () => <div className="flex max-w-48">Regime</div>,
      cell: ({ row }) => {
        const value =
          clienteRegimeTributarioOptions.find(
            (opt) => opt.value === row.original.regimeTributario
          )?.label || row.original.regimeTributario

        return (
          <div className="flex max-w-48">
            <span className="text-left text-sm text-muted-foreground w-full line-clamp-2">
              {value || '-'}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'dataVencimentoCertificado',
      header: () => (
        <div className="flex w-full max-w-32 justify-center">
          Vencimento Certificado
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex w-full max-w-32 justify-center">
          <span className="text-medium font-sans">
            {row.original.dataValidadeCertificado?.toLocaleDateString(
              'pt-BR'
            ) || '-'}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'actions',
      header: () => (
        <div className="flex w-full max-w-32 justify-center">Ações</div>
      ),
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <DotsVerticalIcon className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={
                    () => {}
                    // router.push(
                    //   `clientes/${row.original.empresaId}/${row.original.inscricaoId}`
                    // )
                  }
                >
                  Detalhes
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    // handleAccessEmitter(row.original.empresaId)
                  }}
                >
                  Emissor
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return {
    tableColumns,
  }
}
