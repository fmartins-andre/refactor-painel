import { AccountantCustomerUpdatePayload } from '@/@types/accountant/accountant-customer'
import sleep from '@/utils/sleep'
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'

import { useToast } from '@/components/hooks/use-toast'

import { useHandleCustomerFormState } from '../../../helpers/use-customer-form-state'
import {
  CustomerFormStep02Input,
  CustomerFormStep02Output,
} from '../customer-form-step-02.schema'

export type UseFormStep01SubmitHandler = {
  handleSubmit: UseFormHandleSubmit<CustomerFormStep02Input>
  handleSaveCustomer?: (
    customerPayload: Partial<
      DeepNullable<AccountantCustomerUpdatePayload>
    > | null
  ) => Promise<void>
}

export function useFormStep02SubmitHandler({
  handleSubmit,
  handleSaveCustomer,
}: UseFormStep01SubmitHandler) {
  const { toast } = useToast()
  const { setNextStep, updateCustomerPayload, customerPayload } =
    useHandleCustomerFormState()

  const onValid: SubmitHandler<any> = async (
    data: CustomerFormStep02Output
  ) => {
    updateCustomerPayload(data)

    if (handleSaveCustomer) {
      await sleep(100)
      await handleSaveCustomer({ ...customerPayload, ...data })
    } else {
      setNextStep()
    }
  }

  const onInvalid: SubmitErrorHandler<CustomerFormStep02Input> = (error) => {
    console.error('new customer form | step 2 | errors: ', error)
    toast({
      title: 'Erro ao validar dados',
      description: 'Por favor, corrija as informações prestadas no formulário.',
      variant: 'destructive',
    })
  }

  const submitHandler = handleSubmit(onValid, onInvalid)

  return { submitHandler }
}
