import { ResultsCards } from '../results-cards'
import { useResultsCardsMeiConfig } from './hooks/use-results-cards-mei-config'

export function RenderManagementMeiCards() {
  const { resultsManagementMeiCard } = useResultsCardsMeiConfig()

  return (
    <div className="grid-cols grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-4">
      {resultsManagementMeiCard.map(
        ({ title, icon, value, style, isLoading, isComingSoon }) => (
          <ResultsCards
            key={title}
            title={title}
            icon={icon}
            value={value}
            style={style}
            isLoading={isLoading}
            isComingSoon={isComingSoon}
          />
        )
      )}
    </div>
  )
}
