import { useLazyViaCepApiLocalidadeDetalhes } from '@/services/api/third-party/via-cep/endpoints/cep'
import { inputMask } from '@/utils/input-mask'
import {
  UseFormGetFieldState,
  UseFormResetField,
  UseFormSetValue,
} from 'react-hook-form'

import { CustomerFormInput } from '../cliente-info.schema'

export type UseGetZipCode = {
  getFieldState: UseFormGetFieldState<CustomerFormInput>
  resetField: UseFormResetField<CustomerFormInput>
  setValue: UseFormSetValue<CustomerFormInput>
}

export function useGetZipCode({
  getFieldState,
  resetField,
  setValue,
}: UseGetZipCode) {
  const [fetchZipCodeData, { isLoading: isFetchingZipCodeData }] =
    useLazyViaCepApiLocalidadeDetalhes()

  const getZipCode = async (zipCode: string) => {
    const { isDirty } = getFieldState('endereco.cep')
    if (!isDirty) return

    const data = await fetchZipCodeData({ cep: zipCode })

    resetField('endereco.cep', { defaultValue: inputMask.cep(zipCode) })
    setValue('endereco.uf', data?.uf ?? null)
    setValue('endereco.cidade', data?.ibge ?? '')
    setValue('endereco.bairro', data?.bairro ?? '')
    setValue('endereco.logradouro', data?.logradouro ?? '')
    setValue('endereco.complemento', data?.complemento ?? null)
  }

  return {
    getZipCode,
    isFetchingZipCodeData,
  }
}
