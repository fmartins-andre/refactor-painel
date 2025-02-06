import { inputMask } from '@/utils/input-mask'
import { produce } from 'immer'

import {
  CustomerFormStatePayload,
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

function getFormValues(data: CustomerFormStatePayload | null) {
  const handler = produce((draft) => {
    if (!data) return formDefaultValues

    if (data.endereco?.cep != null) {
      draft.endereco.cep = inputMask.cep(data.endereco.cep ?? '')
    }

    if (data.endereco?.uf != null) {
      draft.endereco.uf = data.endereco.uf
    }

    if (data.endereco?.cidade != null) {
      draft.endereco.cidade = data.endereco.cidade
    }

    if (data.endereco?.bairro != null) {
      draft.endereco.bairro = data.endereco.bairro
    }

    if (data.endereco?.logradouro != null) {
      draft.endereco.logradouro = data.endereco.logradouro
    }

    if (data.endereco?.numero != null) {
      draft.endereco.numero = data.endereco.numero
    }

    if (data.endereco?.complemento != null) {
      draft.endereco.complemento = data.endereco.complemento
    }
  }, formDefaultValues)

  return handler()
}
