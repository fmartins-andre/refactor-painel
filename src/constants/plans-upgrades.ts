import { enumerateList } from '@/utils/string-methods'

import { z } from '@/lib/translated-zod'

export const plansAndUpgradeSchema = z.object({
  id: z.string(),
  title: z.string(),
  paymentForm: z.string(),
  bestSeller: z.boolean(),
  price: z.string(),
  subtitle: z.string(),
  subtitle2: z.string(),
  notes: z.string(),
  options: z.array(
    z.object({
      title: z.string(),
      hasCheck: z.boolean(),
    })
  ),
})

type PlansAndUpgrade = z.infer<typeof plansAndUpgradeSchema>

const notes = ['NF-e', 'NFC-e', 'NFS-e', 'CT-e', 'CT-e OS', 'MDF-e'].filter(
  // Refs: DEV-4139
  // TODO: habilitar cada opção de nota a partir de env/config para cada white-label
  // cteos não está disponível na IOB
  (note) => {
    switch (true) {
      case note === 'CT-e OS':
        return false

      default:
        return true
    }
  }
)

export const plans: PlansAndUpgrade[] = [
  {
    id: '1',
    title: 'Start',
    paymentForm: 'Assinatura Anual',
    bestSeller: false,
    price: 'R$ 199,90',
    subtitle: '30 Notas Fiscais por Mês',
    subtitle2: '12 Certificados Grátis por Ano',
    notes: 'podendo resgatar 01 por mês',
    options: [
      {
        title: `Emissão de ${enumerateList(notes)}.`,
        hasCheck: true,
      },
      {
        title: 'Downloads de XMLs, DAS-MEI e Notas Fiscais.',
        hasCheck: true,
      },
      {
        title: 'Lembrete de DAS-MEI próximos ao vencimento.',
        hasCheck: true,
      },
      {
        title: 'Alerta para clientes próximos ao limite do MEI (Em breve).',
        hasCheck: true,
      },
      {
        title: 'Notificações para certificados digitais prestes a vencer.',
        hasCheck: true,
      },
      {
        title: 'App para Android e iOS para emissão de Notas (Em breve).',
        hasCheck: true,
      },
      {
        title: 'Emissão de boletos e links de pagamentos (Em breve).',
        hasCheck: true,
      },
      {
        title: 'Suporte premium para Contadores.',
        hasCheck: true,
      },
    ],
  },
  {
    id: '2',
    title: 'Light',
    paymentForm: 'Assinatura Anual',
    bestSeller: false,
    price: 'R$ 249,90',
    subtitle: '50 Notas Fiscais por Mês',
    subtitle2: '12 Certificados Grátis por Ano',
    notes: 'podendo resgatar 01 por mês',
    options: [
      {
        title: `Emissão de ${enumerateList(notes)}.`,
        hasCheck: true,
      },
      {
        title: 'Downloads de XMLs, DAS-MEI e Notas Fiscais.',
        hasCheck: true,
      },
      {
        title: 'Lembrete de DAS-MEI próximos ao vencimento.',
        hasCheck: true,
      },
      {
        title: 'Alerta para clientes próximos ao limite do MEI (Em breve).',
        hasCheck: true,
      },
      {
        title: 'Notificações para certificados digitais prestes a vencer.',
        hasCheck: true,
      },
      {
        title: 'App para Android e iOS para emissão de Notas (Em breve).',
        hasCheck: true,
      },
      {
        title: 'Emissão de boletos e links de pagamentos (Em breve).',
        hasCheck: true,
      },
      {
        title: 'Suporte premium para Contadores.',
        hasCheck: true,
      },
    ],
  },
  {
    id: '3',
    title: 'Plus',
    paymentForm: 'Assinatura Anual',
    bestSeller: true,
    price: 'R$ 299,90',
    subtitle: '100 Notas Fiscais por Mês',
    subtitle2: '12 Certificados Grátis por Ano',
    notes: 'podendo resgatar 01 por mês',
    options: [
      {
        title: `Emissão de ${enumerateList(notes)}.`,
        hasCheck: true,
      },
      {
        title: 'Downloads de XMLs, DAS-MEI e Notas Fiscais.',
        hasCheck: true,
      },
      {
        title: 'Lembrete de DAS-MEI próximos ao vencimento.',
        hasCheck: true,
      },
      {
        title: 'Alerta para clientes próximos ao limite do MEI (Em breve).',
        hasCheck: true,
      },
      {
        title: 'Notificações para certificados digitais prestes a vencer.',
        hasCheck: true,
      },
      {
        title: 'App para Android e iOS para emissão de Notas (Em breve).',
        hasCheck: true,
      },
      {
        title: 'Emissão de boletos e links de pagamentos (Em breve).',
        hasCheck: true,
      },
      {
        title: 'Suporte premium para Contadores.',
        hasCheck: true,
      },
    ],
  },
  {
    id: '4',
    title: 'Master',
    paymentForm: 'Assinatura Anual',
    bestSeller: false,
    price: 'R$ 399,90',
    subtitle: '200 Notas Fiscais por Mês',
    subtitle2: '12 Certificados Grátis por Ano',
    notes: 'podendo resgatar 01 por mês',
    options: [
      {
        title: `Emissão de ${enumerateList(notes)}.`,
        hasCheck: true,
      },
      {
        title: 'Downloads de XMLs, DAS-MEI e Notas Fiscais.',
        hasCheck: true,
      },
      {
        title: 'Lembrete de DAS-MEI próximos ao vencimento.',
        hasCheck: true,
      },
      {
        title: 'Alerta para clientes próximos ao limite do MEI (Em breve).',
        hasCheck: true,
      },
      {
        title: 'Notificações para certificados digitais prestes a vencer.',
        hasCheck: true,
      },
      {
        title: 'App para Android e iOS para emissão de Notas (Em breve).',
        hasCheck: true,
      },
      {
        title: 'Emissão de boletos e links de pagamentos (Em breve).',
        hasCheck: true,
      },
      {
        title: 'Suporte premium para Contadores.',
        hasCheck: true,
      },
    ],
  },
]
