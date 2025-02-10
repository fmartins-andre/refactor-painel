import { forwardRef, useImperativeHandle } from 'react'
import { Check, Info, MapPin } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import Loading from '@/components/loading'

import { CustomerDialogProps, CustomerDialogRef } from './customer-dialog.types'
import { CustomerFormStep01 } from './form-steps/form-step-01/customer-form-step-01.comp'
import { CustomerFormStep02 } from './form-steps/form-step-02/customer-form-step-02.comp'
import { CustomerFormStep03 } from './form-steps/form-step-03/customer-form-step-03.comp'
import { useCustomerDialogStateHandler } from './helpers/use-customer-dialog-state-handler.hook'
import { useHandleCustomerFormState } from './helpers/use-customer-form-state'
import { useSaveCustomerHandler } from './helpers/use-save-customer-handler.hook'

const steps = [
  {
    title: 'Informações básicas',
    icon: <Info className="size-4" />,
  },
  {
    title: 'Endereço',
    icon: <MapPin className="size-4" />,
  },
  {
    title: 'Finalizar cadastro',
    icon: <Check className="size-4" />,
  },
]

export const CustomerDialog = forwardRef<
  CustomerDialogRef,
  CustomerDialogProps
>(({ onSuccessCreatedCallback, skipLastStep }, ref) => {
  const { setDialogState } = useHandleCustomerFormState()

  const open = useHandleCustomerFormState((state) => state.dialogState)
  const activeStep = useHandleCustomerFormState((state) => state.activeStep)

  const { handleOpenDialog, handleCloseDialog } =
    useCustomerDialogStateHandler()

  const { handleSaveCustomer, isPending } = useSaveCustomerHandler({
    onSuccessCreatedCallback,
  })

  useImperativeHandle(ref, () => ({
    open: handleOpenDialog,
    close: handleCloseDialog,
  }))

  return (
    <Dialog onOpenChange={setDialogState} open={open}>
      <DialogContent className={cn('flex max-w-[1100px] flex-col')}>
        <DialogTitle className="my-2 flex w-full items-center">
          <ol className="flex w-full items-center justify-between">
            {steps.slice(0, skipLastStep ? 2 : 3).map((step, index) => (
              <li
                key={index}
                className={cn(
                  'flex w-48 items-center gap-2 text-sm',
                  activeStep === index
                    ? 'text-primary font-bold'
                    : 'text-primary/30 font-normal'
                )}
              >
                {step.icon}
                <span>{step.title}</span>
              </li>
            ))}
          </ol>
        </DialogTitle>

        <div className="flex grow">
          {activeStep === 0 && <CustomerFormStep01 />}

          {activeStep === 1 && (
            <CustomerFormStep02
              handleSaveCustomer={skipLastStep ? handleSaveCustomer : undefined}
            />
          )}

          {!skipLastStep && activeStep === 2 && (
            <CustomerFormStep03 handleSaveCustomer={handleSaveCustomer} />
          )}
        </div>
      </DialogContent>

      {isPending && <Loading />}
    </Dialog>
  )
})

CustomerDialog.displayName = 'CustomerDialog'
