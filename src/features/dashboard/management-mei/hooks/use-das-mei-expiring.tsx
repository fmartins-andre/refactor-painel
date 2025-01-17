import { inputMask } from '@/utils/input-mask'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { useNavigate } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'
import { Download, ExternalLink, Send } from 'lucide-react'

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

import { ExpiringDasMeiList } from '../../validations/expiring-das-mei-list'
import { sendWhatsAppMessage } from './send-das-whats-app'

const dateFormat = (value: string) => {
  const date = new Date(value)
  const dateFormat = `${date.getUTCDate().toString().padStart(2, '0')}/${(date.getUTCMonth() + 1).toString().padStart(2, '0')}/${date.getUTCFullYear()}`

  return dateFormat
}

export function useDasMeiExpiring() {
  const navigate = useNavigate()

  function handleNavigateToCustomerDetail(
    empresaId: string,
    inscricaoId: number
  ) {
    navigate({ to: `clientes/${empresaId}/${inscricaoId}` })
  }

  async function handleUpdateDasMei(dasId: number) {
    // await api.post(`/contador/clientes/das/${dasId}/atualizar`)
  }

  async function handleDownloadDasMei({
    updatedAt,
    dasId,
    dasURL,
  }: {
    updatedAt: string
    dasId: number
    dasURL: string
  }) {
    const dateUpdated = new Date(updatedAt)
    const dateLimitToUpdateInvoice = new Date(
      new Date().setDate(new Date().getDate() - 7)
    )

    if (dateUpdated <= dateLimitToUpdateInvoice) {
      await handleUpdateDasMei(dasId)
    }

    window.open(dasURL, '_blank')
  }

  const tableColumns: ColumnDef<ExpiringDasMeiList>[] = [
    {
      accessorKey: 'cnpjCpf',
      header: 'CNPJ / Razão social',
      cell: ({ row }) => (
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
      ),
    },
    {
      accessorKey: 'situacao',
      header: 'Status',
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <Badge
            variant={
              row.original.situacao === 'Liquidado'
                ? 'secondary'
                : row.original.situacao === 'A Vencer'
                  ? 'default'
                  : 'tertiary'
            }
            className="w-24"
          >
            <span className="text-lg">&#8226;</span>
            {row.original.situacao}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: 'dataVencimento',
      header: 'Vencimento',
      cell: ({ row }) => (
        <span className="text-[#718EBF]">
          {row.original.dataVencimento
            ? dateFormat(row.original.dataVencimento)
            : ' - '}
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
                <Button
                  variant="ghost"
                  className="inline-flex items-center gap-2"
                  onClick={() =>
                    handleDownloadDasMei({
                      dasId: row.original.id,
                      updatedAt: row.original.dataEdicao,
                      dasURL: row.original.url ?? '',
                    })
                  }
                >
                  <Download className="size-4" />
                  Baixar DAS MEI
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  disabled={!row.original.telefone}
                  variant="ghost"
                  className="inline-flex items-center gap-2"
                  onClick={() => {
                    sendWhatsAppMessage({
                      customerName: row.original.razaoSocial,
                      customerWhatsAppNumber: row.original.telefone ?? '',
                      urlDownloadDas: row.original.url ?? '',
                    })
                  }}
                >
                  <Send className="size-4" />
                  Enviar para o cliente
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
    isLoadingActions: false,
  }
}
