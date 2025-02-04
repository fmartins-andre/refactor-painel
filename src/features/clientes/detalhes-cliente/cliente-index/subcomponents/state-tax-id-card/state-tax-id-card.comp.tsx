import { ModalCreateInscricaoEstadual } from '@/features/clientes/detalhes-cliente/subcomponents/create-ie-dialog'
import { FileUser } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { SelectInscricaoEstadual } from './select-inscricao-estadual'

export function StateTaxIdCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="inline-flex gap-2 items-center">
          <FileUser />
          <span className="text-md font-medium">Inscrição Estadual</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-2">
          <SelectInscricaoEstadual />
          <ModalCreateInscricaoEstadual />
        </div>
      </CardContent>
    </Card>
  )
}
