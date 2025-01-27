import { inputMask } from '@/utils/input-mask'
import { produce } from 'immer'

import {
  CustomerPayload,
  useHandleCustomerFormState,
} from '../../../helpers/use-customer-form-state'
import { formDefaultValues } from '../constants'

export function useFormStep02Initializer() {
  const customerPayload = useHandleCustomerFormState(
    (state) => state.customerPayload
  )

  const formInitialValues = getFormValues(customerPayload)

  return formInitialValues
}

function getFormValues(data: CustomerPayload | null) {
  const handler = produce((draft) => {
    if (!data) return formDefaultValues

    if (data.cep != null) {
      draft.cep = inputMask.cep(data.cep ?? '')
    }

    if (data.uf != null) {
      draft.uf = data.uf
    }

    if (data.cidadeId != null) {
      draft.cidadeId = data.cidadeId
    }

    if (data.bairro != null) {
      draft.bairro = data.bairro
    }

    if (data.logradouro != null) {
      draft.logradouro = data.logradouro
    }

    if (data.numero != null) {
      draft.numero = data.numero
    }

    if (data.complemento != null) {
      draft.complemento = data.complemento
    }

    if (data.paisId != null) {
      draft.pais = data.paisId
    }
  }, formDefaultValues)

  return handler()
}
