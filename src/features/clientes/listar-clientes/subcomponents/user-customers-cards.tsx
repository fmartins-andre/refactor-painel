import { Users } from 'lucide-react'

import { TotalCustomersOutput } from '../types/total-customers-output'

interface Props {
  customersTotals: TotalCustomersOutput[] | undefined
}

export function useCustomersCards({ customersTotals }: Props) {
  const cardsComponents = [
    {
      title: 'Clientes cadastrados',
      value: customersTotals?.reduce((acc, item) => acc + item.total, 0) ?? 0,
      icon: <Users className="size-4" />,
      className:
        'text-muted-foreground border-l-muted-foreground bg-card shadow-default flex w-full flex-col items-start rounded-xl py-4 pr-2',
      iconStyle:
        'bg-muted-foreground/10 text-muted-foreground border-muted-foreground',
    },
    {
      title: 'Clientes ativos',
      value: customersTotals?.find((i) => i.status === 'A')?.total ?? 0,
      icon: <Users className="size-4" />,
      className:
        'text-primary border-l-primary bg-card shadow-default flex w-full flex-col items-start rounded-xl py-4 pr-2',
      iconStyle: 'bg-primary/10 text-primary border-primary',
    },
    {
      title: 'Clientes bloqueados',
      value: customersTotals?.find((i) => i.status === 'B')?.total ?? 0,
      icon: <Users className="size-4" />,
      className:
        'text-secondary border-l-secondary bg-card shadow-default flex w-full flex-col items-start rounded-xl py-4 pr-2',
      iconStyle: 'bg-secondary/10 text-secondary border-secondary',
    },
    {
      title: 'Clientes cancelados',
      value: customersTotals?.find((i) => i.status === 'C')?.total ?? 0,
      icon: <Users className="size-4" />,
      className:
        'text-secondary border-l-secondary bg-card shadow-default flex w-full flex-col items-start rounded-xl py-4 pr-2',
      iconStyle: 'bg-secondary/10 text-secondary border-secondary',
    },
    // {
    //   title: 'Clientes inativos',
    //   value: customersTotals?.find((i) => i.status === 'D')?.total ?? 0,
    //   icon: <Users className="size-4" />,
    //   color: 'bg-red700 text-red700 border-l-red700',
    // },
  ]

  return { cardsComponents }
}
