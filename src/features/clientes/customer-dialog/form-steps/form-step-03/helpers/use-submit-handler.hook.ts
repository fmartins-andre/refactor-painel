import sleep from '@/utils/sleep'
import { merge } from 'lodash'
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'
import { toast } from 'sonner'

import {
  CustomerFormStatePayload,
  useHandleCustomerFormState,
} from '../../../helpers/use-customer-form-state'
import {
  CustomerFormStep03Input,
  CustomerFormStep03Output,
} from '../customer-form-step-03.schema'

export type UseFormStep01SubmitHandler = {
  handleSubmit: UseFormHandleSubmit<CustomerFormStep03Input>
  handleSaveCustomer: (
    customerPayload: CustomerFormStatePayload
  ) => Promise<void>
}

export function useFormStep03SubmitHandler({
  handleSubmit,
  handleSaveCustomer,
}: UseFormStep01SubmitHandler) {
  const { updateCustomerPayload, customerPayload } =
    useHandleCustomerFormState()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onValid: SubmitHandler<any> = async (
    data: CustomerFormStep03Output
  ) => {
    updateCustomerPayload(data)

    await sleep(100)
    await handleSaveCustomer(merge(customerPayload, data))
  }

  const onInvalid: SubmitErrorHandler<CustomerFormStep03Input> = (error) => {
    console.error('new customer form | step 3 | errors: ', error)
    toast.error('Erro ao validar dados', {
      description: 'Por favor, corrija as informações prestadas no formulário.',
    })
  }

  const submitHandler = handleSubmit(onValid, onInvalid)

  return { submitHandler }
}
