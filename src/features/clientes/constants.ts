import { GenericOptionField } from '@/@types/options-field'
import { TipoPessoaModelEnum } from '@/services/api/accountant-panel-api/schemas'
import {
  RegimeEspecialModelEnum,
  RegimeTributarioClienteModelEnum,
  StatusClienteModelEnum,
} from '@/services/api/accountant-panel-api/schemas/cliente-models'

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

export const clienteRegimeEspecialOptions: GenericOptionField<RegimeEspecialModelEnum>[] =
  [
    {
      label: 'Sem Regime Especial',
      value: RegimeEspecialModelEnum.SEM_REGIME_ESPECIAL,
    },
    {
      label: 'Microempresário Individual',
      value: RegimeEspecialModelEnum.MICROEMPRESARIO_INDIVIDUAL,
    },
    {
      label: 'Microempresa Municipal',
      value: RegimeEspecialModelEnum.MICROEMPRESA_MUNICIPAL,
    },
    {
      label: 'Microempresário Empresa Pequeno Porte',
      value: RegimeEspecialModelEnum.MICROEMPRESARIO_EMPRESA_DE_PEQUENO_PORTE,
    },
    {
      label: 'Sociedade de Profissionais',
      value: RegimeEspecialModelEnum.SOCIEDADE_DE_PROFISSIONAIS,
    },
    { label: 'Cooperativa', value: RegimeEspecialModelEnum.COOPERATIVA },
    { label: 'Estimativa', value: RegimeEspecialModelEnum.ESTIMATIVA },
  ]

export const tipoPessoaOptions: GenericOptionField<TipoPessoaModelEnum>[] = [
  { label: 'Pessoa Física', value: TipoPessoaModelEnum.FISICA },
  {
    label: 'Pessoa Jurídica',
    value: TipoPessoaModelEnum.JURIDICA,
  },
]

export const switchBooleanOptions = [
  { value: '0', translateKey: 'Não' },
  { value: '1', translateKey: 'Sim' },
]
