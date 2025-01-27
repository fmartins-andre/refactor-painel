import { cn } from '@/lib/utils'

import { useGetTotalCustomersCards } from './helpers/use-get-total-customers.hook'
import { useCustomersCards } from './user-customers-cards'

export function ResumeCards() {
  const { data: customersTotals } = useGetTotalCustomersCards()

  const { cardsComponents } = useCustomersCards({
    customersTotals,
  })

  return (
    <>
      <div className="grid-cols mb-1 mt-5 grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-4">
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
              <div className="text-2xl font-bold">{card.value}</div>
              <span
                className={cn(
                  'bg-none text-xs font-medium text-muted-foreground'
                )}
              >
                {card.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
