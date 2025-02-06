import { useLazyCnpjWsDadosEmpresa } from '@/services/api/third-party/cnpj-ws/endpoints/cnpj'
import { inputMask } from '@/utils/input-mask'
import {
  UseFormGetFieldState,
  UseFormResetField,
  UseFormSetValue,
} from 'react-hook-form'

import { useHandleCustomerFormState } from '../../../helpers/use-customer-form-state'
import { CustomerFormStep01Input } from '../customer-form-step-01.schema'

export type UseFormStep01HandleCustomerDataByCnpj = {
  getFieldState: UseFormGetFieldState<CustomerFormStep01Input>
  resetField: UseFormResetField<CustomerFormStep01Input>
  setValue: UseFormSetValue<CustomerFormStep01Input>
}

export function useFormStep01HandleCustomerDataByCnpj({
  getFieldState,
  resetField,
  setValue,
}: UseFormStep01HandleCustomerDataByCnpj) {
  const { updateCustomerPayload } = useHandleCustomerFormState()

  const [fetchCnpjData, { isLoading: isFetchingCnpjData }] =
    useLazyCnpjWsDadosEmpresa()

  const getCustomerDataHandler = async (cnpj: string) => {
    const { isDirty } = getFieldState('documento')
    if (!isDirty) return

    resetField('documento', { defaultValue: inputMask.cpfCnpj(cnpj) })

    const data = await fetchCnpjData({ cnpj })

    if (data) {
      setValue('nomeRazaoSocial', data.razao_social ?? '')
      setValue('email', data.estabelecimento.email ?? '')
      setValue(
        'telefone',
        inputMask.phone(
          data.estabelecimento.ddd1.concat(data.estabelecimento.telefone1)
        )
      )
      setValue('pessoaJuridica.isMei', data.simples.mei.toLowerCase() === 'sim')
      setValue(
        'pessoaJuridica.dataAbertura',
        data.simples.data_opcao_mei ?? null
      )
      setValue(
        'pessoaJuridica.inscricaoEstadual',
        data.estabelecimento.inscricoes_estaduais.find(
          (ie) => ie.estado.sigla === data.estabelecimento.estado.sigla
        )?.inscricao_estadual ?? null
      )

      updateCustomerPayload({
        endereco: {
          cep: inputMask.cep(data.estabelecimento.cep ?? ''),
          numero: data.estabelecimento.numero ?? '',
          logradouro: data.estabelecimento.logradouro.replace(/\s{2,}/g, ' '),
          complemento: data.estabelecimento.complemento?.replace(
            /\s{2,}/g,
            ' '
          ),
          cidade: String(data.estabelecimento.cidade.ibge_id),
          bairro: data.estabelecimento.bairro.replace(/\s{2,}/g, ' '),
          uf: data.estabelecimento.estado.sigla,
        },
      })
    }
  }

  return { isFetchingCnpjData, getCustomerDataHandler }
}
