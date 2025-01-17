/* eslint-disable @typescript-eslint/no-explicit-any */
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

export function useCustomersMoreUsingCredit() {
  async function handleAccessEmitter(_companyId: number) {
    // await api.get(`/login/emissor/${companyId}`).then(({ data }) => {
    //   window.open(
    //     `${process.env.NEXT_PUBLIC_EMISSOR_FRONT_URL}/login?${data}`,
    //     '_blank'
    //   )
    // })
  }

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'cnpjCpf',
      header: 'CNPJ / Razão social',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
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
      header: 'Status',
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
            className="w-24"
          >
            {row.original.status === 'A'
              ? 'Ativo'
              : row.original.status === 'B'
                ? 'Bloqueado'
                : 'Inativo'}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: 'modules',
      header: 'Módulos',
      cell: ({ row }) => (
        <>
          {row.original.modules.slice(0, 2).map((module: any, index: number) =>
            module.value ? (
              <Badge
                key={index}
                className="bg-background hover:border-background hover:bg-background border-background m-1 inline-flex w-10 items-center gap-1 px-1"
                variant="tertiary"
              >
                <span className="before:content-['\2022']"></span>
                {module.name}
              </Badge>
            ) : null
          )}
          {row.original.modules.length === 2
            ? row.original.modules
                .slice(0, 1)
                .map((item: any, index: number) =>
                  item.value ? (
                    <Badge
                      key={index}
                      className="bg-background hover:border-background hover:bg-background border-background m-1 inline-flex w-10 items-center gap-1 px-1"
                      variant="tertiary"
                    >
                      {`+${row.original.modules.length - 2}`}
                    </Badge>
                  ) : null
                )
            : null}
        </>
      ),
    },
    {
      accessorKey: 'validadas',
      header: 'Notas Validadas',
      cell: ({ row }) => (
        <span className="text-primary font-semibold">
          {row.original.validadas}
        </span>
      ),
    },
    {
      accessorKey: 'canceladas',
      header: 'Notas Canceladas',
      cell: ({ row }) => (
        <span className="text-secondary font-semibold">
          {row.original.canceladas}
        </span>
      ),
    },
    {
      accessorKey: 'total',
      header: 'Total de notas',
      cell: ({ row }) => (
        <span className="font-semibold">{row.original.total}</span>
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
                    // TODO: corrigir
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
    columns,
    isPending: false,
  }
}
