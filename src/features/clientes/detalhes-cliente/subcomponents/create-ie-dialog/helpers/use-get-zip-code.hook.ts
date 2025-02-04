import { useLazyViaCepApiLocalidadeDetalhes } from '@/services/api/third-party/via-cep/endpoints/cep'
import { inputMask } from '@/utils/input-mask'
import {
  UseFormGetFieldState,
  UseFormResetField,
  UseFormSetValue,
} from 'react-hook-form'

import { CreateInscricaoEstadualSchema } from '../modal-create-inscricao-estadual.schema'

export type UseGetZipCode = {
  getFieldState: UseFormGetFieldState<CreateInscricaoEstadualSchema>
  resetField: UseFormResetField<CreateInscricaoEstadualSchema>
  setValue: UseFormSetValue<CreateInscricaoEstadualSchema>
}

export function useGetZipCode({
  getFieldState,
  resetField,
  setValue,
}: UseGetZipCode) {
  const [fetchZipCode] = useLazyViaCepApiLocalidadeDetalhes()

  const getZipCode = async (zipCode: string) => {
    const cleanedCep = zipCode.replace(/\D/g, '')

    if (!cleanedCep || cleanedCep.length !== 8) return

    const { isDirty } = getFieldState('endereco.cep')
    if (!isDirty) return

    const data = await fetchZipCode({ cep: cleanedCep })

    resetField('endereco.cep', { defaultValue: inputMask.cep(cleanedCep) })
    setValue('endereco.uf', data?.uf ?? '')
    setValue('endereco.cidadeId', data?.ibge ?? '')
    setValue('endereco.bairro', data?.bairro ?? '')
    setValue('endereco.logradouro', data?.logradouro ?? '')
    setValue('endereco.complemento', data?.complemento ?? '')
  }

  return {
    getZipCode,
  }
}
