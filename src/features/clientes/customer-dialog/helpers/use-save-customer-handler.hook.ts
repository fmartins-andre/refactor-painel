import { UfBrasilEnum } from '@/@types/system-wide-enums'
import {
  useClienteAtualizar,
  useClienteInserir,
} from '@/services/api/accountant-panel-api/endpoints/cliente'
import { TipoPessoaModelEnum } from '@/services/api/accountant-panel-api/schemas'
import { ClienteInputModel } from '@/services/api/accountant-panel-api/schemas/cliente-models'
import { produce } from 'immer'

import { useToast } from '@/components/hooks/use-toast'

import { useHandleCustomerFormState } from './use-customer-form-state'

export type UseSaveCustomerHandler = {
  onSuccessCreatedCallback?: (
    response: unknown,
    payload: ClienteInputModel
  ) => void
}

export function useSaveCustomerHandler({
  onSuccessCreatedCallback,
}: UseSaveCustomerHandler) {
  const { toast } = useToast()
  const { setDialogState } = useHandleCustomerFormState()

  const { mutate: update, isPending: isUpdating } = useClienteAtualizar({
    onSuccess: () => {
      toast({
        title: 'Cliente atualizado com sucesso!',
        variant: 'success',
      })
      setDialogState(false)
    },
  })

  const { mutate: create, isPending: isCreating } = useClienteInserir({
    onSuccess: (data, variables) => {
      toast({
        title: 'Cliente inserido com sucesso!',
        variant: 'success',
      })
      onSuccessCreatedCallback?.(data, variables)
      setDialogState(false)
    },
  })

  const isPending = isUpdating || isCreating

  const handleSaveCustomer = async (
    customerPayload: Partial<DeepNullable<ClienteInputModel>> | null
  ) => {
    if (!customerPayload || !Object.values(customerPayload).length) return

    const getPayload = produce((draft) => {
      Object.entries(customerPayload).forEach(([key, value]) => {
        if (value !== undefined) {
          draft[key as keyof typeof draft] = value as never
        }
      })
    }, customerTemplateData)

    const payload = getPayload()

    if (payload.tipoPessoa && payload.documento) {
      create(payload)
    } else {
      update({ clienteId: '', payload })
    }
  }

  return { handleSaveCustomer, isPending }
}

const customerTemplateData: ClienteInputModel = {
  tipoPessoa: TipoPessoaModelEnum.FISICA,
  documento: '',
  nomeRazaoSocial: '',
  nomeFantasia: null,
  telefone: '',
  email: '',
  endereco: {
    logradouro: '',
    numero: null,
    bairro: '',
    complemento: null,
    cidade: '',
    uf: UfBrasilEnum.ACRE,
    cep: '',
  },
  pessoaJuridica: null,
  certificadoDigital: null,
  sincronizarNfseTomado: false,
  usuarioLoginNfse: null,
  senhaLoginNfse: null,
  utilizaRadarxml: false,
  utilizaValidadorTributario: false,
  integracaoGdfe: false,
  integracaoDominio: false,
  tokenIntegracaoDominio: null,
  utilizaEmissor: false,
  modulosEmissor: null,
}
