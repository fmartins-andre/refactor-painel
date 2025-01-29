import { useCallback } from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Skeleton } from '../ui/skeleton'
import { useDataTableContext } from './data-table-provider'

export function DataTablePagination() {
  const { manualPagination, table, handlePage, handlePageSize, isLoading } =
    useDataTableContext()

  const lastPageIndex = table.getPageCount()
  const firstPageIndex = 1

  const nextPageIndex = Math.min(
    table.getState().pagination.pageIndex + 2,
    lastPageIndex
  )

  const previousPageIndex = Math.max(
    table.getState().pagination.pageIndex,
    firstPageIndex
  )

  const updateCurrentPage = useCallback(
    (pageIndex: number) => {
      if (!manualPagination) {
        return table.setPageIndex(pageIndex - 1)
      }

      handlePage?.(pageIndex)
    },
    [manualPagination, table, handlePage]
  )

  const updatePageSize = useCallback(
    (pageSize: number) => {
      if (!manualPagination) {
        return table.setPageSize(pageSize)
      }

      handlePageSize?.(pageSize)
    },
    [manualPagination, handlePageSize, table]
  )

  return isLoading ? (
    <Skeleton className="h-8 w-full" />
  ) : (
    <div className="flex flex-col-reverse items-center justify-between gap-4 px-2 md:flex-row">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Linhas por pagina</p>
        <Select
          onValueChange={(value) => updatePageSize(Number(value))}
          value={`${table.getState().pagination.pageSize}`}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {Array.from(new Set([10, 20, 30, 40, 50]))
              .sort((a, b) => a - b)
              .map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex w-full items-center justify-between space-x-6 md:w-auto md:justify-start lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Pagina {table.getState().pagination.pageIndex + 1} de {lastPageIndex}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            className="size-8 p-0"
            disabled={!table.getCanPreviousPage()}
            onClick={() => updateCurrentPage(firstPageIndex)}
            size="icon"
            variant="tertiary"
          >
            <ChevronsLeftIcon className="size-4" />
          </Button>
          <Button
            className="size-8 p-0"
            disabled={!table.getCanPreviousPage()}
            onClick={() => updateCurrentPage(previousPageIndex)}
            size="icon"
            variant="tertiary"
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button
            className="size-8 p-0"
            disabled={!table.getCanNextPage()}
            onClick={() => updateCurrentPage(nextPageIndex)}
            size="icon"
            variant="tertiary"
          >
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button
            className="size-8 p-0"
            disabled={!table.getCanNextPage()}
            onClick={() => updateCurrentPage(lastPageIndex)}
            size="icon"
            variant="tertiary"
          >
            <ChevronsRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
