import {
  ClienteInputModel,
  ClienteViewModel,
} from '@/services/api/accountant-panel-api/schemas/cliente-models'

export type CustomerDialogRef = {
  open: (customer?: ClienteViewModel) => void
  close: () => void
}

export type CustomerDialogProps = {
  skipLastStep?: boolean
  onSuccessCreatedCallback?: (
    response: unknown,
    payload: ClienteInputModel
  ) => void
}
