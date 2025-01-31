import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// import { Icons } from '@/components/images/icons'

// import { ModalCreateInscricaoEstadual } from '../create-ie-dialog/modal-create-inscricao-estadual.comp'
// import { SelectInscricaoEstadual } from './select-inscricao-estadual'

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
        <div className="flex justify-center gap-2 px-4 pb-5">
          {/* <SelectInscricaoEstadual />
          <ModalCreateInscricaoEstadual /> */}
        </div>
      </CardContent>
    </Card>
  )
}
