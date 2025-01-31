import { useState } from 'react'
import { ChevronRightIcon, Loader } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/components/hooks/use-toast'

import { CustomerStatusDetail } from './status-detail.comp'

export function CustomerDetailsHeader() {
  const { toast } = useToast()
  const [isLoadingEmitter, setIsLoadingEmitter] = useState(false)

  async function handleAccessEmitter() {
    try {
      setIsLoadingEmitter(true)
    } catch (error) {
      setIsLoadingEmitter(false)
      console.log(error)
      toast({
        title: 'Erro ao acessar emissor',
        description: 'Favor entrar em contato com o administrador',
        variant: 'destructive',
      })
    } finally {
      setIsLoadingEmitter(false)
    }
  }

  return (
    <Card className="rounded-lg">
      <CardContent className="flex flex-col items-center justify-between p-4 md:flex-row">
        <div className="flex w-full flex-col items-center gap-6 md:flex-row">
          <span className="max-w-72 truncate text-lg font-bold md:max-w-64">
            {'customer?.razaoSocial'}
          </span>
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <CustomerStatusDetail />
            {
              // !!'customer?.nomePlano' && (
              <>
                <span className="text-sm font-semibold">|</span>
                <span className="text-secondary text-md">
                  Plano:{' '}
                  <span className="font-semibold">{'customer?.nomePlano'}</span>
                </span>
              </>
              // )
            }
          </div>
        </div>
        <Button
          type="button"
          className="mt-4 w-72 md:mt-0 md:w-auto"
          onClick={handleAccessEmitter}
          disabled={isLoadingEmitter}
        >
          {isLoadingEmitter ? (
            <Loader className="size-5 animate-spin" />
          ) : (
            <span className="flex items-center gap-2">
              Acessar Emissor de Notas
              <ChevronRightIcon className="size-5 pt-0.5" />
            </span>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
