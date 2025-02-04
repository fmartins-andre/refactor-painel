import { SumarioTotalClientes } from '@/services/api/accountant-panel-api/endpoints/cliente'
import { Users } from 'lucide-react'

import { cn } from '@/lib/utils'
import { TextSkeleton } from '@/components/text-skeleton'

type Props = {
  data: SumarioTotalClientes | undefined
  isLoading?: boolean
}

export function ResumeCards({ data, isLoading }: Props) {
  const { cardsComponents } = useCustomersCards({ data })

  return (
    <>
      <div className="grid-cols-1 grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-4">
        {cardsComponents.map((card, index) => (
          <div key={index} className={card.className}>
            <div
              className={cn(
                card.iconStyle,
                'bg-card flex w-full flex-col items-start rounded-e-2xl border-l-4 py-3 pl-4'
              )}
            >
              <div className={cn('self-end rounded-full p-2', card.iconStyle)}>
                {card.icon}
              </div>
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <span className="animate-pulse">
                    <TextSkeleton />
                  </span>
                ) : (
                  card.value
                )}
              </div>
              <span
                className={cn(
                  'bg-none text-xs font-medium text-muted-foreground'
                )}
              >
                {isLoading ? (
                  <span className="text-muted-foreground/80 animate-pulse">
                    carregando
                    <TextSkeleton />
                  </span>
                ) : (
                  card.title
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export function useCustomersCards({ data }: Props) {
  const cardsComponents = [
    {
      title: 'Clientes cadastrados',
      value: data?.clientesCadastrados ?? 0,
      icon: <Users className="size-4" />,
      className:
        'text-muted-foreground border-l-muted-foreground bg-card shadow-default flex w-full flex-col items-start rounded-xl py-4 pr-2',
      iconStyle:
        'bg-muted-foreground/10 text-muted-foreground border-muted-foreground',
    },
    {
      title: 'Clientes ativos',
      value: data?.clientesAtivos ?? 0,
      icon: <Users className="size-4" />,
      className:
        'text-primary border-l-primary bg-card shadow-default flex w-full flex-col items-start rounded-xl py-4 pr-2',
      iconStyle: 'bg-primary/10 text-primary border-primary',
    },
    {
      title: 'Clientes bloqueados',
      value: data?.clientesBloqueados ?? 0,
      icon: <Users className="size-4" />,
      className:
        'text-secondary border-l-secondary bg-card shadow-default flex w-full flex-col items-start rounded-xl py-4 pr-2',
      iconStyle: 'bg-secondary/10 text-secondary border-secondary',
    },
    {
      title: 'Clientes cancelados',
      value: data?.clientesCancelados ?? 0,
      icon: <Users className="size-4" />,
      className:
        'text-secondary border-l-secondary bg-card shadow-default flex w-full flex-col items-start rounded-xl py-4 pr-2',
      iconStyle: 'bg-secondary/10 text-secondary border-secondary',
    },
  ]

  return { cardsComponents }
}
