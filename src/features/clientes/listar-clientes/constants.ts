import { GenericOptionField } from '@/@types/options-field'
import {
  RegimeTributarioClienteModelEnum,
  StatusClienteModelEnum,
} from '@/services/api/accountant-panel-api/schemas/cliente-view-model'

export const clienteStatusOptions: GenericOptionField<StatusClienteModelEnum>[] =
  [
    {
      label: 'Ativo',
      value: StatusClienteModelEnum.ATIVO,
    },
    {
      label: 'Bloqueado',
      value: StatusClienteModelEnum.BLOQUEADO,
    },
    {
      label: 'Inativo',
      value: StatusClienteModelEnum.INATIVO,
    },
  ]

export const clienteRegimeTributarioOptions: GenericOptionField<RegimeTributarioClienteModelEnum>[] =
  [
    { label: 'MEI', value: RegimeTributarioClienteModelEnum.MEI },
    {
      label: 'Simples Nacional',
      value: RegimeTributarioClienteModelEnum.SIMPLES_NACIONAL,
    },
    {
      label: 'Lucro Presumido',
      value: RegimeTributarioClienteModelEnum.LUCRO_PRESUMIDO,
    },
    { label: 'Lucro Real', value: RegimeTributarioClienteModelEnum.LUCRO_REAL },
    {
      label: 'Produtor Rural',
      value: RegimeTributarioClienteModelEnum.PRODUTOR_RURAL,
    },
    { label: 'Nenhum', value: RegimeTributarioClienteModelEnum.NENHUM },
  ]
