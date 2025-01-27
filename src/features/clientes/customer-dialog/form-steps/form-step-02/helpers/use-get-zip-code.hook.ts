import { useLazyViaCepApiLocalidadeDetalhes } from '@/services/api/third-party/via-cep/endpoints/cep'
import { inputMask } from '@/utils/input-mask'
import {
  UseFormGetFieldState,
  UseFormResetField,
  UseFormSetValue,
} from 'react-hook-form'

import { CustomerFormStep02Input } from '../customer-form-step-02.schema'

export type UseGetZipCode = {
  getFieldState: UseFormGetFieldState<CustomerFormStep02Input>
  resetField: UseFormResetField<CustomerFormStep02Input>
  setValue: UseFormSetValue<CustomerFormStep02Input>
}

export function useGetZipCode({
  getFieldState,
  resetField,
  setValue,
}: UseGetZipCode) {
  const [fetchZipCodeData, { isLoading: isFetchingZipCodeData }] =
    useLazyViaCepApiLocalidadeDetalhes()

  const getZipCode = async (zipCode: string) => {
    const { isDirty } = getFieldState('cep')
    if (!isDirty) return

    const data = await fetchZipCodeData({ cep: zipCode })

    resetField('cep', { defaultValue: inputMask.cep(zipCode) })
    setValue('uf', data?.uf ?? null)
    setValue('cidadeId', data?.ibge ?? null)
    setValue('bairro', data?.bairro ?? '')
    setValue('logradouro', data?.logradouro ?? '')
    setValue('complemento', data?.complemento)
  }

  return {
    getZipCode,
    isFetchingZipCodeData,
  }
}
