import { inputMask } from '@/utils/input-mask'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { Link, useNavigate } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'
import { ExternalLink, FileStack } from 'lucide-react'

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

import { ExpiringCertificatesListSchema } from '../../validations/expiring-certificates-list'

const dateFormat = (value: string) => {
  const date = new Date(value)
  const dateFormat = `${date.getUTCDate().toString().padStart(2, '0')}/${(date.getUTCMonth() + 1).toString().padStart(2, '0')}/${date.getUTCFullYear()}`

  return dateFormat
}

const validDate = (data: Date): boolean => {
  const today: Date = new Date()

  today.setHours(0, 0, 0, 0)

  return data <= today
}

export function useExpiringCertificates() {
  const navigate = useNavigate()
  function handleNavigateToCustomerDetail(
    empresaId: number,
    inscricaoId: number
  ) {
    navigate({ to: `clientes/${empresaId}/${inscricaoId}` })
  }

  const tableColumns: ColumnDef<ExpiringCertificatesListSchema>[] = [
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
      accessorKey: 'statusVencimentoCertificado',
      header: 'Status',
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <Badge
            variant={
              validDate(new Date(row.original.dataVencimentoCertificado))
                ? 'tertiary'
                : 'default'
            }
            className="w-24"
          >
            <span className="text-lg">&#8226;</span>
            {validDate(new Date(row.original.dataVencimentoCertificado))
              ? 'Vencido'
              : 'A vencer'}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: 'dataVencimentoCertificado',
      header: 'Vencimento',
      cell: ({ row }) => (
        <span className="text-[#718EBF]">
          {dateFormat(row.original.dataVencimentoCertificado)}
        </span>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Ações',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <DotsVerticalIcon className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  className="inline-flex items-center gap-2"
                  onClick={() =>
                    handleNavigateToCustomerDetail(
                      row.original.empresaId,
                      row.original.inscricaoId
                    )
                  }
                >
                  <ExternalLink className="size-4" />
                  Entrar no perfil
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  className="focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                  to="/certificado"
                  search={{
                    empresaId: row.original.empresaId,
                    inscricaoId: row.original.inscricaoId,
                  }}
                >
                  <FileStack className="size-4" />
                  Renovar certificado
                </Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem>
                <Button
                  disabled={!row.original.telefone}
                  variant="ghost"
                  className="inline-flex items-center gap-2"
                  onClick={() => {
                    handleSendDasMeiToCustomer({
                      customerName: row.original.razaoSocial,
                      customerWhatsApp: row.original.telefone ?? '',
                      urlDas: row.original.url ?? '',
                    })
                  }}
                >
                  <Send className="size-4" />
                  Enviar para o cliente
                </Button>
              </DropdownMenuItem> */}
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
