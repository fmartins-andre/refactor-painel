import { GenericOptionField } from '@/@types/options-field'
import { StatusDasMeiModelEnum } from '@/services/api/accountant-panel-api/endpoints/das-mei'

export const dasMeiStatusOptions: GenericOptionField<StatusDasMeiModelEnum>[] =
  [
    {
      label: 'Liquidado',
      value: StatusDasMeiModelEnum.LIQUIDADO,
    },
    {
      label: 'A Vencer',
      value: StatusDasMeiModelEnum.A_VENCER,
    },
    {
      label: 'Processando',
      value: StatusDasMeiModelEnum.PROCESSANDO,
    },
    {
      label: 'Devedor',
      value: StatusDasMeiModelEnum.DEVEDOR,
    },
  ]
