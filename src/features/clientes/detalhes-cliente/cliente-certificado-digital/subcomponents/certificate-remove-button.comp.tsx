import { TrashIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function CertificateRemoveButton() {
  return (
    <Button variant="destructive">
      <TrashIcon />
      Remover certificado
    </Button>
  )
}
