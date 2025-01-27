import { DataTableAppliedFilters } from '@/@types/data-table-applied-filters'
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
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'

import { CustomerListSchemaOutput } from './validations/customer-list'
import { SearchCustomers } from './validations/search-customers'

const dateFormat = (date: string) => {
  return Intl.DateTimeFormat('pt-BR').format(new Date(date))
}

export function useAccountantCustomers() {
  async function handleAccessEmitter(_companyId: number) {
    // await api.get(`/login/emissor/${companyId}`).then(({ data }) => {
    //   window.open(
    //     `${process.env.NEXT_PUBLIC_EMISSOR_FRONT_URL}/login?${data}`,
    //     '_blank'
    //   )
    // })
  }

  function switchRenderStatus(status: string) {
    switch (status) {
      case 'A':
        return 'Ativo'
      case 'B':
        return 'Bloqueado'
      case 'C':
        return 'Cancelado'
      case 'I':
        return 'Inativo'
      case 'D':
        return 'Desativado'
      default:
        return status
    }
  }

  const appliedFilters: DataTableAppliedFilters<SearchCustomers>[] = [
    {
      id: 'busca',
      title: 'Busca',
      // value: searchParams.get('busca') ?? '',
      value: '',
    },
    {
      id: 'status',
      title: 'Status',
      // value: searchParams.get('status') ?? '',
      value: '',
    },
    {
      id: 'regimeEspecialId',
      title: 'Regime',
      // value: searchParams.get('regimeEspecialId') ?? '',
      value: '',
    },
    {
      id: 'dataInicial',
      title: 'Data inicial',
      // value: searchParams.get('dataInicial') ?? '',
      value: '',
    },
    {
      id: 'dataFinal',
      title: 'Data final',
      // value: searchParams.get('dataFinal') ?? '',
      value: '',
    },
  ]

  const tableColumns: ColumnDef<CustomerListSchemaOutput>[] = [
    {
      accessorKey: 'cnpjCpf',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="CNPJ / Razão social"
          className="flex"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex max-w-72 items-center gap-2 md:w-[300px]">
            <Avatar>
              <AvatarFallback>
                {row.original.razaoSocial.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex w-full flex-col items-start">
              <span className="text-primary line-clamp-1 text-ellipsis break-all text-start font-medium">
                {row.original.razaoSocial}
              </span>
              <span className="line-clamp-1 text-ellipsis break-all text-start text-sm text-[#718EBF]">
                {inputMask.cpfCnpj(row.original.cnpjCpf)}
              </span>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <Badge
            variant={
              row.original.status === 'A'
                ? 'default'
                : row.original.status === 'B'
                  ? 'secondary'
                  : 'tertiary'
            }
            className="w-28"
          >
            {switchRenderStatus(row.original.status)}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: 'regimeEspecialDescricao',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Regime"
          className="flex px-0"
        />
      ),
      cell: ({ row }) => (
        <div className="flex w-full">
          <span className="text-left text-sm text-[#718EBF]">
            {row.original.regimeEspecialDescricao?.toUpperCase()}
          </span>
        </div>
      ),
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
            {row.original.dataVencimentoCertificado
              ? dateFormat(row.original.dataVencimentoCertificado)
              : '-'}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ações" />
      ),
      cell: ({ row }) => (
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
                    handleAccessEmitter(row.original.empresaId)
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
    appliedFilters,
    tableColumns,
    isLoadingEmitter: false,
  }
}
