import { AccountantCustomerUpdatePayload } from '@/@types/accountant/accountant-customer'

export type CustomerDialogRef = {
  open: (
    customer?: Pick<
      AccountantCustomerUpdatePayload,
      'empresaId' | 'inscricaoId'
    >
  ) => void
  close: () => void
}

export type CustomerDialogProps = {
  skipLastStep?: boolean
  onSuccessCreatedCallback?: (
    response: unknown,
    payload: AccountantCustomerUpdatePayload
  ) => void
}
