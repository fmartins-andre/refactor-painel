import { useEffect } from 'react'
import { ClienteObterDetalheResponse } from '@/services/api/accountant-panel-api/endpoints/cliente'
import { inputMask } from '@/utils/input-mask'
import { patchDeep } from '@/utils/patch-deep'
import { produce } from 'immer'
import { UseFormReset } from 'react-hook-form'

import { useGetCurrentCustomerData } from '../../helpers/use-get-current-customer-data.hook'
import { CustomerFormInput } from '../cliente-info.schema'
import { formDefaultValues } from '../constants'

export function useFormInitializer(reset: UseFormReset<CustomerFormInput>) {
  const { data: customer, isLoading: isLoading } = useGetCurrentCustomerData()

  useEffect(() => {
    if (customer) reset(getFormValues(customer))
  }, [customer, reset])

  return { isLoading }
}

function getFormValues(data: ClienteObterDetalheResponse): CustomerFormInput {
  if (!data) return formDefaultValues

  const { telefone, email, endereco, pessoaJuridica, ...rest } = data

  const patchedData = patchDeep(formDefaultValues, {
    ...rest,
    telefone: telefone ?? undefined,
    email: email ?? undefined,
    endereco: endereco ?? undefined,
    pessoaJuridica: pessoaJuridica ?? undefined,
  })

  const handler = produce((draft) => {
    if (patchedData.documento != null) {
      draft.documento = inputMask.cpfCnpj(patchedData.documento)
    }

    if (patchedData.telefone != null) {
      draft.telefone = inputMask.phone(patchedData.telefone)
    }

    if (patchedData.endereco?.cep != null) {
      draft.endereco.cep = inputMask.cep(patchedData.endereco.cep)
    }
  }, patchedData)

  return handler()
}
