import {
  RegimeEspecialModelEnum,
  RegimeTributarioClienteModelEnum,
} from '@/services/api/accountant-panel-api/schemas/cliente-models'

import { CustomerFormStep03Input } from './customer-form-step-03.schema'

export const formDefaultValues: CustomerFormStep03Input = {
  regimeTributario: RegimeTributarioClienteModelEnum.NENHUM,
  regimeEspecial: RegimeEspecialModelEnum.SEM_REGIME_ESPECIAL,

  modulosEmissor: {
    nfe: false,
    nfce: false,
    nfse: false,
    cte: false,
    mdfe: false,
  },
}
