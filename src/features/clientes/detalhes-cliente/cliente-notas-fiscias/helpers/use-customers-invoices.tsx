import { useState } from 'react'
import type { DataTableAppliedFilters } from '@/@types/data-table-applied-filters'
import { inputMask } from '@/utils/input-mask'
import { DotsVerticalIcon, DownloadIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import axios from 'axios'
import { Download } from 'lucide-react'
import { toast } from 'sonner'

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

import { CustomerInvoices } from '../customer-invoices.schema'

type DownloadInvoices = {
  invoiceType: string
  id: number
}

type FileType = 'pdf' | 'xml' | 'url'

type ReturnGetInvoice = { tipo: FileType; data: string }

function downloadPdf(invoiceId: number, type: FileType, data: string) {
  const byteCharacters = atob(data)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  const blob = new Blob([byteArray], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${type}-${invoiceId}.pdf`
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}

function downloadXml(data: string) {
  //download xml params
  const a = document.createElement('a')
  const file = new Blob([data], { type: 'text/xml' })
  a.href = URL.createObjectURL(file)
  a.download = 'invoice.xml'
  a.click()
  URL.revokeObjectURL(a.href)
  document.body.removeChild(a)
}

function downloadUrl(data: string) {
  window.open(data, '_blank')
}

function downloadWithType(id: number, { tipo, data }: ReturnGetInvoice) {
  switch (tipo) {
    case 'pdf':
      return downloadPdf(id, tipo, data)
    case 'xml':
      return downloadXml(data)
    case 'url':
      return downloadUrl(data)
  }
}

const formatPeriod = ({ date }: { date: string }) => {
  const dateFormatted = `${new Date(date).getUTCDate().toString().padStart(2, '0')}/${(new Date(date).getUTCMonth() + 1).toString().padStart(2, '0')}/${new Date(date).getUTCFullYear()}`

  return `${dateFormatted}`
}

const statusOptions = {
  A: 'Validada',
  PR: 'Pendente',
  C: 'Cancelada',
  I: 'Inutilizada',
  D: 'N/A',
}

export function useCustomerInvoices() {
  const searchParams = new URLSearchParams(window.location.search)
  const [isDownloading, setIsDownloading] = useState(false)

  async function handleDownloadPdf({ id, invoiceType }: DownloadInvoices) {
    try {
      setIsDownloading(true)
      const type = invoiceType.replace(/[-/]/g, '').toLowerCase()
      const { data } = await axios.get<ReturnGetInvoice>(
        `contador/notas/${type}/${id}/pdf`
      )
      downloadWithType(id, data)
    } catch (error: any) {
      toast.error('Erro ao baixar PDF', {
        description: error.response.data.error,
      })
      setIsDownloading(false)
    } finally {
      setIsDownloading(false)
    }
  }

  async function handleDownloadXml({ id, invoiceType }: DownloadInvoices) {
    try {
      setIsDownloading(true)
      const type = invoiceType.replace(/[-/]/g, '').toLowerCase()
      const { data } = await axios.get(`contador/notas/${type}/${id}/xml`)
      downloadWithType(id, data)
    } catch (_error) {
      setIsDownloading(false)
    } finally {
      setIsDownloading(false)
    }
  }

  const tableColumns: ColumnDef<CustomerInvoices>[] = [
    {
      accessorKey: 'razaoSocial',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cliente" />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col gap-2">
          <span className="text-primary text-sm">
            {row.original.razaoSocial}
          </span>
          <span className="text-sm text-muted-foreground">
            {inputMask.cpfCnpj(row.original.cnpjCpf)}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'modelo',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Módulo" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2 p-3">
          <Badge variant="tertiary">
            <span className="text-muted-foreground">{row.original.modelo}</span>
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          {row.original.status && renderStatusBadge(row.original.status)}
        </div>
      ),
    },
    {
      accessorKey: 'valor',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Valor" />
      ),
      cell: ({ row }) => (
        <span className="font-bold">
          {Intl.NumberFormat('pt-BR').format(
            Number(row.original.valorTotalNota)
          )}
        </span>
      ),
    },
    {
      accessorKey: 'data',
      header: 'Data',
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {formatPeriod({ date: row.original.dataEmissao })}
        </span>
      ),
    },
    {
      accessorKey: 'actions',
      header: () => (
        <span className="text-foreground font-sans text-sm font-bold">
          Ações
        </span>
      ),
      cell: ({
        row: {
          original: { id, modelo },
        },
      }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <DotsVerticalIcon className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  className="inline-flex items-center gap-2"
                  onClick={() => handleDownloadXml({ id, invoiceType: modelo })}
                >
                  <DownloadIcon className="size-3" />
                  <span className="text-sm">Download XML</span>
                </Button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  className="inline-flex items-center gap-2"
                  onClick={() => handleDownloadPdf({ id, invoiceType: modelo })}
                >
                  <Download className="size-3" />
                  <span className="text-sm"> Download PDF</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const appliedFilters: DataTableAppliedFilters<CustomerInvoices>[] = [
    {
      id: 'id',
      title: 'id',
      value: searchParams.get('id') ?? '',
    },
    {
      id: 'status',
      title: 'Status',
      value: searchParams.get('status') ?? '',
    },
    {
      id: 'modelo',
      title: 'Modelo',
      value: searchParams.get('modelo') ?? '',
    },
  ]

  return {
    tableColumns,
    appliedFilters,
    isDownloading,
  }
}

const renderStatusBadge = (status: string) => {
  switch (status) {
    case 'A':
      return (
        <Badge className="p-3" variant="default">
          <span>
            &#x2022;{' '}
            {status && statusOptions[status as keyof typeof statusOptions]}
          </span>
        </Badge>
      )
    case 'C':
      return (
        <Badge className="p-3" variant="secondary">
          <span>
            &#x2022;{' '}
            {status && statusOptions[status as keyof typeof statusOptions]}
          </span>
        </Badge>
      )
    case 'PR':
      return (
        <Badge className="p-3" variant="tertiary">
          <span>
            &#x2022;{' '}
            {status && statusOptions[status as keyof typeof statusOptions]}
          </span>
        </Badge>
      )
    case 'I':
      return (
        <Badge className="p-3" variant="tertiary">
          <span>
            &#x2022;{' '}
            {status && statusOptions[status as keyof typeof statusOptions]}
          </span>
        </Badge>
      )
    default:
      return <></>
  }
}
