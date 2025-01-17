'use client'

import { Check, File, User, X } from 'lucide-react'

import { useGetInvoicesCards } from '../../hooks/use-get-invoices-cards'
import { ResultsCardsProps } from '../../results-cards'

export function useResultsCardsInvoicesConfig() {
  const { data: totalInvoices, isLoading, isFetching } = useGetInvoicesCards()

  const resultsInvoicesCard: ResultsCardsProps[] = [
    {
      title: 'Total de notas',
      icon: <User className="size-5 text-white" />,
      value: totalInvoices?.total || 0,
      isLoading: isLoading || isFetching,
      style: 'bg-primary text-primary border-l-primary',
    },
    {
      title: 'Notas validadas',
      icon: <File className="size-5 text-white" />,
      value: Array.isArray(totalInvoices?.invoices)
        ? totalInvoices.invoices?.find(({ status }) => status === 'A')?.total ||
          0
        : 0,
      isLoading: isLoading || isFetching,
      style: 'bg-secondary-dark text-secondary-dark border-l-secondary-dark',
    },
    {
      title: 'Notas rejeitadas',
      icon: <Check className="size-5 text-white" />,
      value: Array.isArray(totalInvoices?.invoices)
        ? totalInvoices.invoices.find(({ status }) => status === 'R')?.total ||
          0
        : 0,
      isLoading: isLoading || isFetching,
      style: 'bg-info text-info border-l-info',
    },
    {
      title: 'Notas canceladas',
      icon: <X className="size-5 text-white" />,
      value: Array.isArray(totalInvoices?.invoices)
        ? totalInvoices.invoices.find(({ status }) => status === 'C')?.total ||
          0
        : 0,
      isLoading: isLoading || isFetching,
      style:
        'bg-muted-foreground text-muted-foreground border-muted-foreground',
    },
  ]

  return {
    resultsInvoicesCard,
    totalInvoices,
  }
}
