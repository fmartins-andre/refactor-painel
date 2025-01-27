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
  CustomerFormStep03Input,
  CustomerFormStep03Output,
} from '../customer-form-step-03.schema'

export type UseFormStep01SubmitHandler = {
  handleSubmit: UseFormHandleSubmit<CustomerFormStep03Input>
  handleSaveCustomer: (
    customerPayload: Partial<
      DeepNullable<AccountantCustomerUpdatePayload>
    > | null
  ) => Promise<void>
}

export function useFormStep03SubmitHandler({
  handleSubmit,
  handleSaveCustomer,
}: UseFormStep01SubmitHandler) {
  const { toast } = useToast()
  const { updateCustomerPayload, customerPayload } =
    useHandleCustomerFormState()

  const onValid: SubmitHandler<any> = async (
    data: CustomerFormStep03Output
  ) => {
    updateCustomerPayload(data)

    await sleep(100)
    await handleSaveCustomer({ ...customerPayload, ...data })
  }

  const onInvalid: SubmitErrorHandler<CustomerFormStep03Input> = (error) => {
    console.error('new customer form | step 3 | errors: ', error)
    toast({
      title: 'Erro ao validar dados',
      description: 'Por favor, corrija as informações prestadas no formulário.',
      variant: 'destructive',
    })
  }

  const submitHandler = handleSubmit(onValid, onInvalid)

  return { submitHandler }
}
