import { RegimeTributarioClienteModelEnum } from '@/services/api/accountant-panel-api/schemas/cliente-models'
import { inputMask } from '@/utils/input-mask'
import { produce } from 'immer'

import {
  CustomerFormStatePayload,
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

function getFormValues(data: CustomerFormStatePayload | null) {
  const handler = produce((draft) => {
    if (!data) return formDefaultValues

    if (data.tipoPessoa != null) {
      draft.tipoPessoa = data.tipoPessoa
    }

    if (data.documento != null) {
      draft.documento = inputMask.cpfCnpj(data.documento)
    }

    if (data.nomeRazaoSocial != null) {
      draft.nomeRazaoSocial = data.nomeRazaoSocial
    }

    if (data.email != null) {
      draft.email = data.email
    }

    if (data.telefone != null) {
      draft.telefone = inputMask.phone(data.telefone)
    }

    if (data.pessoaJuridica) {
      if (data.pessoaJuridica.inscricaoEstadual != null) {
        draft.pessoaJuridica.inscricaoEstadual =
          data.pessoaJuridica.inscricaoEstadual
      }

      if (data.pessoaJuridica.inscricaoMunicipal != null) {
        draft.pessoaJuridica.inscricaoMunicipal =
          data.pessoaJuridica.inscricaoMunicipal
      }

      if (
        data.pessoaJuridica.regimeTributario ===
        RegimeTributarioClienteModelEnum.MEI
      ) {
        draft.pessoaJuridica.isMei = true
      }

      if (data.pessoaJuridica.dataAbertura != null) {
        draft.pessoaJuridica.dataAbertura = data.pessoaJuridica
          .dataAbertura as Date | null
      }
    }
  }, formDefaultValues)

  return handler()
}
