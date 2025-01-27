export enum CustomersStatusEnum {
  ACTIVE = 'A',
  BLOCKED = 'B',
  CANCELED = 'C',
}

export const STATUS_OPTIONS = [
  { label: 'Ativo', value: CustomersStatusEnum.ACTIVE },
  { label: 'Bloqueado', value: CustomersStatusEnum.BLOCKED },
  { label: 'Cancelado', value: CustomersStatusEnum.CANCELED },
]
