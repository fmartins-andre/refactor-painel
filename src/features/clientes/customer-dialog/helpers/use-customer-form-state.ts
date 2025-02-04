import { AccountantCustomerUpdatePayload } from '@/@types/accountant/accountant-customer'
import { create } from 'zustand'

export type CustomerPayload = Partial<
  DeepNullable<AccountantCustomerUpdatePayload>
>

interface UseHandleCustomerFormState {
  activeStep: number
  setActiveStep: (value: number) => void
  setNextStep: () => void
  setPreviousStep: () => void

  dialogState: boolean
  setDialogState: (value: boolean) => void
  toggleDialogState: () => void

  customerPayload: CustomerPayload | null
  setCustomerPayload: (data: CustomerPayload | null) => void
  updateCustomerPayload: (data: CustomerPayload | null) => void
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
              isLoading: false,
              activeStep: 0,
              dialogState: false,
              customerPayload: null,
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
              isLoading: false,
              activeStep: 0,
              dialogState: false,
              customerPayload: null,
            }),
      })),

    customerPayload: null,
    setCustomerPayload: (data) => set({ customerPayload: data }),
    updateCustomerPayload: (data) =>
      set((prev) => ({
        customerPayload: { ...prev.customerPayload, ...data },
      })),
  })
)
