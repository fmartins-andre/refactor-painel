import { ClienteObterDetalheResponse } from '@/services/api/accountant-panel-api/endpoints/cliente'
import { ClockAlert, FileBadgeIcon, FileX2Icon, HashIcon } from 'lucide-react'
import { Label } from 'recharts'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { getCertStatus } from '../helpers/get-certificate-status'

type Props = {
  customer: ClienteObterDetalheResponse
}

export function CertificateCard({ customer }: Props) {
  const dataValidade = customer?.certificadoDigital?.dataValidade ?? null
  const numeroSerie = customer?.certificadoDigital?.numeroSerie ?? null

  const certStatus = getCertStatus(dataValidade)

  return (
    <Card
      className={cn(
        'w-full',
        ['missing', 'expired'].includes(certStatus.status) &&
          'text-error border-error'
      )}
    >
      <CardHeader>
        <CardTitle className="flex flex-row gap-4 items-center justify-between">
          Certificado Digital A1
          <Badge variant={certStatus.class}>{certStatus.label}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row gap-4 items-center">
        {certStatus.status === 'missing' ? (
          <FileX2Icon className="size-16" />
        ) : (
          <FileBadgeIcon className="size-16" />
        )}

        {certStatus.status !== 'missing' && (
          <section className="flex flex-col gap-2">
            <div className="flex flex-col">
              <Label className="text-xs text-muted-foreground">
                Data de vencimento
              </Label>
              <div className="flex items-center gap-2">
                <ClockAlert className="size-5" />
                {dataValidade?.toLocaleDateString('pt-BR')}
              </div>
            </div>

            <div className="flex flex-col">
              <Label className="text-xs text-muted-foreground">
                Número de série
              </Label>
              <div className="flex items-center gap-2">
                <HashIcon className="size-5" />
                {numeroSerie}
              </div>
            </div>
          </section>
        )}

        {certStatus.status === 'missing' && (
          <div className="max-w-[20ch] text-center">
            Nenhum certificado digital adicionado
          </div>
        )}
      </CardContent>
    </Card>
  )
}
