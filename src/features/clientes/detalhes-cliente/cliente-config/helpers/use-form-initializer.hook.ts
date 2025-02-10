import { useEffect } from 'react'
import { useGetCurrentCustomerData } from '@/features/clientes/detalhes-cliente/helpers/use-get-current-customer-data.hook'
import { ClienteObterDetalheResponse } from '@/services/api/accountant-panel-api/endpoints/cliente'
import { produce } from 'immer'
import { UseFormReset } from 'react-hook-form'

import { ClienteConfigFormInput } from '../cliente-config.schema'
import { formDefaultValues } from '../constants'

export function useFormInitializer(
  reset: UseFormReset<ClienteConfigFormInput>
) {
  const { data: customer, isLoading: isLoading } = useGetCurrentCustomerData()

  useEffect(() => {
    if (customer) reset(getFormValues(customer))
  }, [customer, reset])

  return { isLoading }
}

function getFormValues(
  data: ClienteObterDetalheResponse
): ClienteConfigFormInput {
  const modules = data?.modulosEmissor

  if (!modules) return formDefaultValues

  const handler = produce((draft) => {
    if (modules.nfe != null) {
      draft.modulosEmissor.nfe = modules.nfe
    }

    if (modules.nfce != null) {
      draft.modulosEmissor.nfce = modules.nfce
    }

    if (modules.nfse != null) {
      draft.modulosEmissor.nfse = modules.nfse
    }

    if (modules.cte != null) {
      draft.modulosEmissor.cte = modules.cte
    }

    if (modules.mdfe != null) {
      draft.modulosEmissor.mdfe = modules.mdfe
    }
  }, formDefaultValues)

  return handler()
}
