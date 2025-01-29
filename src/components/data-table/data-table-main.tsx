import { flexRender } from '@tanstack/react-table'

import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useDataTableContext } from './data-table-provider'
import { DataTableSkeleton } from './data-table-skeleton'

export function DataTableMain() {
  const { table, isLoading } = useDataTableContext()
  const columns = table.getAllColumns()

  return (
    <div className="w-full min-h-56">
      <DataTableSkeleton
        rows={3}
        className={cn(!isLoading && 'hidden', 'motion-preset-fade-md')}
      />

      <Table className={cn(isLoading && 'hidden', 'motion-preset-fade-md')}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="text-foreground dark:bg-accent min-w-max whitespace-nowrap bg-[#F1F5F9] text-center font-sans font-semibold"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                data-state={row.getIsSelected() ? 'selected' : null}
                key={row.id}
                className="text-foreground hover:bg-accent py-4 transition-colors duration-200 ease-in-out"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="text-center font-sans" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={columns.length}>
                Nenhum resultado encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
