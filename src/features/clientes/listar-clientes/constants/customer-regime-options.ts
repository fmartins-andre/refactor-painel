export enum RegimeEspecialEnum {
  SEM_REGIME_ESPECIAL = '0',
  MICROEMPRESA_MUNICIPAL = '1',
  ESTIMATIVA = '2',
  SOCIEDADE_DE_PROFISSIONAIS = '3',
  COOPERATIVA = '4',
  MICROEMPRESARIO_INDIVIDUAL = '5',
  MICROEMPRESARIO_E_EMPRESA_DE_PEQUENO_PORTE = '6',
}

export const REGIME_OPTIONS = [
  {
    value: RegimeEspecialEnum.SEM_REGIME_ESPECIAL,
    label: 'Sem regime especial',
  },
  {
    value: RegimeEspecialEnum.MICROEMPRESA_MUNICIPAL,
    label: 'Microempresa Municipal',
  },
  {
    value: RegimeEspecialEnum.ESTIMATIVA,
    label: 'Estimativa',
  },
  {
    value: RegimeEspecialEnum.SOCIEDADE_DE_PROFISSIONAIS,
    label: 'Sociedade de Profissionais',
  },
  {
    value: RegimeEspecialEnum.COOPERATIVA,
    label: 'Cooperativa',
  },
  {
    value: RegimeEspecialEnum.MICROEMPRESARIO_INDIVIDUAL,
    label: 'Microempresário Individual (MEI)',
  },
  {
    value: RegimeEspecialEnum.MICROEMPRESARIO_E_EMPRESA_DE_PEQUENO_PORTE,
    label: 'Microempresário e Empresa de Pequeno Porte (ME EPP)',
  },
]
