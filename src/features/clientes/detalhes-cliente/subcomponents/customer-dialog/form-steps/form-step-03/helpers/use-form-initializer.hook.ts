import { produce } from 'immer'

import {
  CustomerPayload,
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

function getFormValues(data: CustomerPayload | null) {
  const handler = produce((draft) => {
    if (!data) return formDefaultValues

    if (data.crt != null) {
      draft.crt = data.crt
    }

    if (data.isProdutorRural != null) {
      draft.isProdutorRural = data.isProdutorRural ? '1' : '0'
    }

    if (data.regimeEspecialId != null) {
      draft.regimeEspecialId = data.regimeEspecialId
    }

    if (data.emiteCte != null) {
      draft.emiteCte = data.emiteCte
    }

    if (data.emiteCteos != null) {
      draft.emiteCteos = data.emiteCteos
    }

    if (data.emiteMdfe != null) {
      draft.emiteMdfe = data.emiteMdfe
    }

    if (data.emiteNfce != null) {
      draft.emiteNfce = data.emiteNfce
    }

    if (data.emiteNfe != null) {
      draft.emiteNfe = data.emiteNfe
    }

    if (data.emiteNfse != null) {
      draft.emiteNfse = data.emiteNfse
    }
  }, formDefaultValues)

  return handler()
}
