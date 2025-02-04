import {
  AccountantCustomerTypeEnum,
  AccountantCustomerUpdatePayload,
} from '@/@types/accountant/accountant-customer'
import { produce } from 'immer'

import { useToast } from '@/components/hooks/use-toast'

import { useHandleCustomerFormState } from './use-customer-form-state'

export type UseSaveCustomerHandler = {
  onSuccessCreatedCallback?: (
    response: unknown,
    payload: AccountantCustomerUpdatePayload
  ) => void
}

export function useSaveCustomerHandler({
  onSuccessCreatedCallback,
}: UseSaveCustomerHandler) {
  const { toast } = useToast()
  const { setDialogState } = useHandleCustomerFormState()

  function onSuccess(data: unknown, variables: any) {
    const wasUpdate = 'empresaId' in variables && variables.empresaId

    toast({
      title: `Cliente ${wasUpdate ? 'atualizado' : 'criado'} com sucesso!`,
      variant: 'success',
    })

    if (!wasUpdate) onSuccessCreatedCallback?.(data, variables)

    setDialogState(false)
  }

  // const { mutate: update, isPending: isUpdating } = useUpdateAccountantCustomer(
  //   { onSuccess }
  // )

  // const { mutate: create, isPending: isCreating } = useCreateAccountantCustomer(
  //   { onSuccess }
  // )

  // const isPending = isUpdating || isCreating

  const handleSaveCustomer = async (
    customerPayload: Partial<
      DeepNullable<AccountantCustomerUpdatePayload>
    > | null
  ) => {
    if (!customerPayload || !Object.values(customerPayload).length) return

    const getPayload = produce((draft) => {
      Object.entries(customerPayload).forEach(([key, value]) => {
        if (value !== undefined) {
          draft[key as keyof typeof draft] = value as never
        }
      })

      draft.telefoneFinanceiro =
        customerPayload.telefoneFinanceiro ??
        customerPayload.telefoneWhatsapp ??
        ''
    }, accountantCustomerInitialValues)

    const payload = getPayload()

    if (payload.empresaId && payload.inscricaoId) {
      // update(payload)
    } else {
      // create(payload)
    }
  }

  const isPending = false
  return { handleSaveCustomer, isPending }
}

const accountantCustomerInitialValues: AccountantCustomerUpdatePayload = {
  empresaId: 0,
  inscricaoId: 0,
  tipoPessoa: AccountantCustomerTypeEnum.PJ,
  cnpjCpf: '',
  razaoSocial: '',
  nomeFantasia: '',
  isProdutorRural: false,
  telefoneWhatsapp: '',
  telefoneFinanceiro: '',
  inscricaoEstadual: '',
  inscricaoMunicipal: '',
  cep: '',
  logradouro: '',
  numero: '',
  bairro: '',
  complemento: null,
  cidadeId: '',
  uf: '',
  paisId: '1058',
  crt: '0',
  email: '',
  isMei: false,
  meiDataAbertura: '',
  regimeEspecialId: '0',
  emiteNfe: false,
  emiteNfce: false,
  emiteNfse: false,
  emiteMdfe: false,
  emiteCte: false,
  emiteCteos: false,
}
