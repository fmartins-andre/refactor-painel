import { inputMask } from '@/utils/input-mask'
import { dateIsoToBr } from '@/utils/string-methods'
import { ColumnDef } from '@tanstack/react-table'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

import { InvoicesFromCustomerSchema } from '../../validations/invoices-from-customers'

export function useInvoicesFromCustomer() {
  const columns: ColumnDef<InvoicesFromCustomerSchema>[] = [
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
      accessorKey: 'cnpjCpf',
      header: 'Data e Hora',
      cell: ({ row }) => {
        return (
          <div className="flex w-full flex-col items-center">
            <span className="text-primary font-medium">
              {dateIsoToBr(row.original.dataEmissao)}
            </span>
            <span className="text-sm text-[#718EBF]">
              {row.original.horaEmissao}
            </span>
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
                : row.original.status === 'C'
                  ? 'secondary'
                  : 'tertiary'
            }
            className="w-24"
          >
            {row.original.status === 'A'
              ? 'Autorizada'
              : row.original.status === 'C'
                ? 'Cancelada'
                : 'Outros'}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: 'modelo',
      header: 'Notas emitidas',
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <Badge variant="tertiary">{row.original.modelo}</Badge>
        </div>
      ),
    },
  ]

  return {
    columns,
  }
}
