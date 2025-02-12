import {
  ClienteInputModel,
  ClienteViewModel,
} from '@/services/api/accountant-panel-api/schemas/cliente-models'
import { merge } from 'lodash'
import { create } from 'zustand'

import { initialCustomerPayload } from '../constants'

export type CustomerFormStatePayload = DeepNullable<ClienteInputModel> & {
  id: ClienteViewModel['id'] | null
}

interface UseHandleCustomerFormState {
  activeStep: number
  setActiveStep: (value: number) => void
  setNextStep: () => void
  setPreviousStep: () => void

  dialogState: boolean
  setDialogState: (value: boolean) => void
  toggleDialogState: () => void

  customerPayload: CustomerFormStatePayload
  setCustomerPayload: (data: CustomerFormStatePayload) => void
  updateCustomerPayload: (data: DeepPartial<CustomerFormStatePayload>) => void
}

export const useHandleCustomerFormState = create<UseHandleCustomerFormState>(
  (set) => ({
    activeStep: 0,
    setActiveStep: (step) => set({ activeStep: step }),
    setNextStep: () => {
      set((state) => ({ activeStep: state.activeStep + 1 }))
    },
    setPreviousStep: () => {
      set((state) => ({ activeStep: Math.max(state.activeStep - 1, 0) }))
    },

    dialogState: false,
    setDialogState: (value) => {
      set({
        ...(value
          ? {
              dialogState: true,
            }
          : {
              dialogState: false,
              activeStep: 0,
              customerPayload: initialCustomerPayload,
            }),
      })
    },
    toggleDialogState: () =>
      set((prev) => ({
        ...(!prev.dialogState
          ? {
              dialogState: true,
            }
          : {
              dialogState: false,
              activeStep: 0,
              customerPayload: initialCustomerPayload,
            }),
      })),

    customerPayload: initialCustomerPayload,
    setCustomerPayload: (data) => set({ customerPayload: data }),
    updateCustomerPayload: (data) =>
      set((state) => ({
        ...state,
        customerPayload: merge(state.customerPayload, data),
      })),
  })
)
