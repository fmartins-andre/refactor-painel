import { ModalCreateInscricaoEstadual } from '@/features/clientes/detalhes-cliente/subcomponents/create-ie-dialog'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { SelectInscricaoEstadual } from './select-inscricao-estadual'

export function StateTaxIdCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {/* <Icons.inscricao_estadual /> */}
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
