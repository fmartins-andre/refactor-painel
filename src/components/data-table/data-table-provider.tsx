import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from 'react'
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type Table as TableType,
  type VisibilityState,
} from '@tanstack/react-table'

interface DataTableContextProps<TData> {
  table: TableType<TData>
  manualPagination: boolean
  pageSize: number
  isLoading?: boolean
  handlePageSize?: (pageSize: number) => void
  handlePage?: (page: number) => void
}

type DataTableProviderProps<TData, TValue> = {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
  columnsVisibility?: VisibilityState
  total?: number
  page?: number
  pageSize: number
  children: ReactNode
  isLoading?: boolean
  handlePageSize?: (pageSize: number) => void
  handlePage?: (page: number) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DataTableContext = createContext<DataTableContextProps<any>>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  {} as any
)

export function DataTableProvider<TData, TValue>({
  children,
  columns,
  data,
  pageSize,
  page,
  columnsVisibility,
  total,
  isLoading = false,
  handlePage,
  handlePageSize,
}: DataTableProviderProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const manualPagination = page !== undefined && total !== undefined

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page ? page - 1 : 0,
    pageSize,
  })

  useLayoutEffect(() => {
    setPagination({ pageIndex: page ? page - 1 : 0, pageSize })
  }, [page, pageSize])

  useEffect(() => {
    if (columnsVisibility) {
      setColumnVisibility(columnsVisibility)
    }
  }, [columnsVisibility])

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: manualPagination
      ? undefined
      : getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    pageCount: manualPagination ? Math.ceil(total / pageSize) : undefined,
    state: {
      columnVisibility,
      pagination,
    },
  })

  return (
    <DataTableContext.Provider
      value={{
        handlePage,
        handlePageSize,
        pageSize,
        manualPagination,
        table,
        isLoading,
      }}
    >
      {children}
    </DataTableContext.Provider>
  )
}

export function useDataTableContext<TData>() {
  const context = useContext(DataTableContext) as DataTableContextProps<TData>

  if (!context) {
    throw new Error(
      'useDataTableContext must be used within a DataTableProvider'
    )
  }

  return context
}
