import { produce } from 'immer'

import {
  CustomerFormStatePayload,
  useHandleCustomerFormState,
} from '../../../helpers/use-customer-form-state'
import { formDefaultValues } from '../constants'

export function useFormStep03Initializer() {
  const customerPayload = useHandleCustomerFormState(
    (state) => state.customerPayload
  )

  const formInitialValues = getFormValues(customerPayload)

  return formInitialValues
}

function getFormValues(data: CustomerFormStatePayload | null) {
  const handler = produce((draft) => {
    if (!data) return formDefaultValues

    if (data.regimeTributario != null) {
      draft.regimeTributario = data.regimeTributario
    }

    if (data.regimeEspecial != null) {
      draft.regimeEspecial = data.regimeEspecial
    }

    draft.modulosEmissor = {
      nfe: Boolean(data.modulosEmissor?.nfe),
      nfce: Boolean(data.modulosEmissor?.nfce),
      nfse: Boolean(data.modulosEmissor?.nfse),
      cte: Boolean(data.modulosEmissor?.cte),
      mdfe: Boolean(data.modulosEmissor?.mdfe),
    }
  }, formDefaultValues)

  return handler()
}
