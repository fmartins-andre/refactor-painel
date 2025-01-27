import { inputMask } from '@/utils/input-mask'
import { parseISO } from 'date-fns'
import { produce } from 'immer'

import {
  CustomerPayload,
  useHandleCustomerFormState,
} from '../../../helpers/use-customer-form-state'
import { formDefaultValues } from '../constants'

export function useFormStep01Initializer() {
  const customerPayload = useHandleCustomerFormState(
    (state) => state.customerPayload
  )

  const formInitialValues = getFormValues(customerPayload)

  return formInitialValues
}

function getFormValues(data: CustomerPayload | null) {
  const handler = produce((draft) => {
    if (!data) return formDefaultValues

    if (data.tipoPessoa != null) {
      draft.tipoPessoa = data.tipoPessoa
    }

    if (data.cnpjCpf != null) {
      draft.cnpjCpf = inputMask.cpfCnpj(data.cnpjCpf)
    }

    if (data.razaoSocial != null) {
      draft.razaoSocial = data.razaoSocial
    }

    if (data.email != null) {
      draft.email = data.email
    }

    if (data.telefoneWhatsapp != null) {
      draft.telefoneWhatsapp = inputMask.phone(data.telefoneWhatsapp)
    }

    if (data.inscricaoEstadual != null) {
      draft.inscricaoEstadual = data.inscricaoEstadual
    }

    if (data.inscricaoMunicipal != null) {
      draft.inscricaoMunicipal = data.inscricaoMunicipal
    }

    if (data.isMei != null) {
      draft.isMei = Boolean(data.isMei)
    }

    if (data.meiDataAbertura != null) {
      draft.meiDataAbertura = parseISO(data.meiDataAbertura)
    }
  }, formDefaultValues)

  return handler()
}
