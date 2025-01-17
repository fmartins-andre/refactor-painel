import { ResultsCards } from '../results-cards'
import { useResultsCardsInvoicesConfig } from './hooks/use-results-cards-invoices-config'

export function RenderInvoicesCard() {
  const { resultsInvoicesCard } = useResultsCardsInvoicesConfig()

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row md:gap-10">
      {resultsInvoicesCard.map(({ title, icon, value, style, isLoading }) => (
        <ResultsCards
          key={title}
          title={title}
          icon={icon}
          value={value}
          style={style}
          isLoading={isLoading}
        />
      ))}
    </div>
  )
}
