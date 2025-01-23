import { useCredenciamentoObterDetalheUsuario } from '@/services/api/accountant-panel-api/endpoints/credenciamento'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export function InfoUserCard() {
  const { data: detalheUsuarioData, isLoading: isLoadingDetalheUsuario } =
    useCredenciamentoObterDetalheUsuario()

  const userInitials = () => detalheUsuarioData?.nome?.at(0) ?? 'U'

  return (
    <div className="bg-primary-dark bottom-10 mx-4 w-48 rounded-xl p-4 md:w-48">
      {isLoadingDetalheUsuario ? (
        <Skeleton className="h-40 w-48" />
      ) : (
        <div className="flex w-full flex-col gap-1">
          <div className="flex w-full items-center gap-2">
            <Avatar className="size-7">
              <AvatarImage src={undefined} />
              <AvatarFallback>{userInitials()}</AvatarFallback>
            </Avatar>
            <div className="flex w-full max-w-[calc(100%-1.75rem)] flex-col gap-1">
              <span className="max-w-full overflow-x-hidden text-ellipsis text-xs font-bold text-white">
                {detalheUsuarioData?.nome ?? 'Usuário'}
              </span>
              <span className="text-secondary text-[10px]">
                {detalheUsuarioData?.contador?.plano?.nome}
              </span>
            </div>
          </div>

          <div className="mb-2 mt-4 flex w-full flex-col gap-2">
            <div className="inline-flex w-full items-center justify-between">
              <span className="text-[8px] capitalize text-white">
                NOTAS FISCAIS DISPONÍVEIS
              </span>
              <span className="text-[8px] capitalize text-white">
                {detalheUsuarioData?.contador?.plano?.quantidadeNotasEmissor ??
                  0}
              </span>
            </div>
            <SliderPrimitive.Root
              defaultValue={[0]}
              step={10}
              value={[
                detalheUsuarioData?.contador?.plano?.quantidadeNotasEmissor ??
                  0,
              ]}
              disabled
              className={cn(
                'relative flex w-full touch-none select-none items-center'
              )}
            >
              <SliderPrimitive.Track className="bg-primary relative h-2 w-full grow overflow-hidden rounded-full">
                <SliderPrimitive.Range className="bg-secondary absolute h-full rounded-xl" />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb className="bg-secondary focus-visible:ring-ring border-secondary/50 block rounded-full  transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50" />
            </SliderPrimitive.Root>
          </div>
          <Separator />
          <div className="my-2 flex w-full flex-col gap-2">
            <div className="inline-flex w-full items-center justify-between">
              <span className="text-[8px] capitalize text-white">
                CERTIFICADOS DIGITAIS DISPONÍVEIS
              </span>
              <span className="text-[8px] text-white">
                {detalheUsuarioData?.contador?.plano
                  ?.quantidadeCertificadosBrindes ?? 0}
              </span>
            </div>
            <SliderPrimitive.Root
              defaultValue={[0]}
              step={10}
              value={[
                detalheUsuarioData?.contador?.plano
                  ?.quantidadeCertificadosBrindes ?? 0,
              ]}
              disabled
              className={cn(
                'relative flex w-full touch-none select-none items-center'
              )}
            >
              <SliderPrimitive.Track className="bg-primary relative h-2 w-full grow overflow-hidden rounded-full">
                <SliderPrimitive.Range className="bg-secondary absolute h-full rounded-xl" />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb className="bg-secondary focus-visible:ring-ring border-secondary/50 block rounded-full  transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50" />
            </SliderPrimitive.Root>
          </div>
        </div>
      )}
    </div>
  )
}
