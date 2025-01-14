import { DownloadIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function DataTableToolbarExport() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="items-center gap-1 text-sm uppercase"
          size="sm"
          variant="ghost"
        >
          <DownloadIcon className="size-4" />
          exportar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="capitalize">CSV</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
