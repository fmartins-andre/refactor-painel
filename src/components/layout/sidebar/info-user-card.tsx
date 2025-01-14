import { useEffect } from 'react'
import type { ReturnGiftsAvailable } from '@/@types/quantity-gift-certificates'
import type { UserProfile } from '@/@types/user-profile'
import { plans } from '@/constants/plans-upgrades'
import { accountantPanelApiHttpClientInstance } from '@/services/api/accountant-panel-api/http-client/http-client'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { useQuery } from '@tanstack/react-query'

import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/hooks/use-toast'

export function InfoUserCard() {
  const { toast } = useToast()
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['user-info-card'],
    queryFn: async () => {
      const [quantityAdditionalInvoices, quantityGiftCertificates, profile] =
        await Promise.all([
          accountantPanelApiHttpClientInstance.get<{ disponivel: number }>(
            'contador/planos/avulso/notas-disponiveis'
          ),
          accountantPanelApiHttpClientInstance.get<ReturnGiftsAvailable>(
            '/contador/dashboard/brindes-disponiveis'
          ),
          accountantPanelApiHttpClientInstance.get<UserProfile>('user/me'),
        ])

      return {
        quantityAdditionalInvoices: quantityAdditionalInvoices.data,
        quantityGiftCertificates: quantityGiftCertificates.data,
        profile: profile.data,
      }
    },
    retry: 2,
  })

  const userInitials = () => {
    if (data?.profile) {
      return data?.profile?.nomeUsuario[0]
    }
    return 'USU'
  }

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Error ao carregar dados do usuário',
        description: error?.message,
        variant: 'destructive',
      })
    }
  }, [isError, error, toast])

  return (
    <div className="bg-primary-dark bottom-10 mx-4 w-48 rounded-xl p-4 md:w-48">
      {isLoading || isFetching ? (
        <Skeleton className="h-40 w-48" />
      ) : (
        <div className="flex w-full flex-col gap-1">
          <div className="flex w-full items-center gap-2">
            <Avatar className="size-7">
              <AvatarImage
                src={data?.profile?.infoParceiro?.logoLogin ?? undefined}
              />
              <AvatarFallback>{userInitials()}</AvatarFallback>
            </Avatar>
            <div className="flex w-full max-w-[calc(100%-1.75rem)] flex-col gap-1">
              <span className="max-w-full overflow-x-hidden text-ellipsis text-xs font-bold text-white">
                {data?.profile?.nomeUsuario}
              </span>
              <span className="text-secondary text-[10px]">
                {
                  plans.find(
                    (item) =>
                      data?.profile?.infoParceiro.assinatura?.planoId.toString() ===
                      item.id
                  )?.title
                }
              </span>
            </div>
          </div>

          <div className="mb-2 mt-4 flex w-full flex-col gap-2">
            <div className="inline-flex w-full items-center justify-between">
              <span className="text-[8px] capitalize text-white">
                NOTAS FISCAIS DISPONÍVEIS
              </span>
              <span className="text-[8px] capitalize text-white">
                {data?.quantityAdditionalInvoices?.disponivel}
              </span>
            </div>
            <SliderPrimitive.Root
              defaultValue={[0]}
              step={10}
              value={[data?.quantityAdditionalInvoices?.disponivel ?? 0]}
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
                {data?.quantityGiftCertificates?.quantidade}
              </span>
            </div>
            <SliderPrimitive.Root
              defaultValue={[0]}
              step={10}
              value={[data?.quantityGiftCertificates?.quantidade ?? 0]}
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
