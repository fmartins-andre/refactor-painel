import {
  DasMeiViewModel,
  StatusDasMeiModelEnum,
} from '@/services/api/accountant-panel-api/endpoints/das-mei'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import { Download, RefreshCw } from 'lucide-react'

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

export function generateDasMeiListarTableColumns() {
  // async function handleUpdateDasMei(dasId: number) {
  //   try {
  //     setIsLoading(true)
  //     // await api.post(`/contador/clientes/das/${dasId}/atualizar`)
  //   } catch (error: unknown) {
  //     setIsLoading(false)
  //     console.warn(error)
  //     toast({
  //       title: 'Erro ao atualizar DAS MEI',
  //       variant: 'destructive',
  //     })
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // async function handleDownloadDasMei({
  //   updatedAt,
  //   dasId,
  //   dasURL,
  // }: {
  //   updatedAt: string
  //   dasId: number
  //   dasURL: string
  // }) {
  //   const dateUpdated = new Date(updatedAt)
  //   const dateLimitToUpdateInvoice = new Date(
  //     new Date().setDate(new Date().getDate() - 7)
  //   )

  //   if (dateUpdated <= dateLimitToUpdateInvoice) {
  //     await handleUpdateDasMei(dasId)
  //   }

  //   try {
  //     setIsLoading(true)
  //     window.open(dasURL, '_blank')
  //   } catch (error) {
  //     setIsLoading(false)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // async function refreshListWithMouthUpdated(
  //   mesEmissao: number | undefined | null
  // ) {
  //   if (!mesEmissao) return

  //   try {
  //     setIsUpdatingMouth(true)

  //     // if (!Number.isNaN(year)) {
  //     //   await api.get(
  //     //     `/contador/clientes/${params.empresaId}/das/${year}/${mesEmissao}`
  //     //   )
  //     // }

  //     // await queryClient.invalidateQueries({
  //     //   queryKey: ['customers-das', params.empresaId, year],
  //     // })

  //     // router.push(`${pathname}?${newParams.toString()}`)
  //   } catch (error: any) {
  //     setIsUpdatingMouth(false)

  //     toast({
  //       title: 'Erro ao buscar mês selecionado',
  //       description: error.message,
  //       variant: 'destructive',
  //     })
  //   } finally {
  //     setIsUpdatingMouth(false)
  //   }
  // }

  const tableColumns: ColumnDef<DasMeiViewModel>[] = [
    {
      accessorKey: 'mesReferencia',
      header: 'Mês referência',
      cell: ({ row }) => {
        return (
          <span className="text-muted-foreground">
            {row.original.mesReferencia}
          </span>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Situação',
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <Badge
            variant={
              row.original.status === StatusDasMeiModelEnum.LIQUIDADO
                ? 'default'
                : row.original.status === StatusDasMeiModelEnum.A_VENCER
                  ? 'secondary'
                  : 'tertiary'
            }
            className="w-24"
          >
            {row.original.status === null
              ? 'Não informado'
              : row.original.status}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: 'valor',
      header: 'Valor',
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.original.valor}</span>
      ),
    },
    {
      accessorKey: 'multa',
      header: 'Multas / Juros',
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.multa} / {row.original.juros}
        </span>
      ),
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.original.total}</span>
      ),
    },
    {
      accessorKey: 'dataVencimento',
      header: 'Vencimento',
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.dataVencimento?.toLocaleDateString('pt-BR') ?? 'N/A'}
        </span>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Ações',
      cell: ({ row: _ }) => (
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
              <DropdownMenuItem asChild>
                <Button
                  variant="ghost"
                  className="inline-flex w-full items-center gap-2"
                  onClick={() => {
                    // handleDownloadDasMei({
                    //   dasId: row.original.id,
                    //   updatedAt: row.original.dataEdicao,
                    //   dasURL: row.original.url ?? '',
                    // })
                  }}
                >
                  <Download className="size-4" />
                  Download
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button
                  variant="ghost"
                  className="inline-flex w-full items-center gap-2"
                  onClick={
                    () => {}
                    // refreshListWithMouthUpdated(row.original.mesEmissao)
                  }
                >
                  <RefreshCw className="size-4" />
                  Buscar mes
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
