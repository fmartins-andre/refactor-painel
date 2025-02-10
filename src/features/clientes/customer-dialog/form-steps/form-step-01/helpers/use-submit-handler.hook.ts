import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'
import { toast } from 'sonner'

import { useHandleCustomerFormState } from '../../../helpers/use-customer-form-state'
import {
  CustomerFormStep01Input,
  CustomerFormStep01Output,
} from '../customer-form-step-01.schema'

export type UseFormStep01SubmitHandler = {
  handleSubmit: UseFormHandleSubmit<CustomerFormStep01Input>
}

export function useFormStep01SubmitHandler({
  handleSubmit,
}: UseFormStep01SubmitHandler) {
  const { setNextStep, updateCustomerPayload } = useHandleCustomerFormState()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onValid: SubmitHandler<any> = (data: CustomerFormStep01Output) => {
    updateCustomerPayload(data)
    setNextStep()
  }

  const onInvalid: SubmitErrorHandler<CustomerFormStep01Input> = (error) => {
    console.error('new customer form | step 1 | errors: ', error)
    toast.error('Erro ao validar dados', {
      description: 'Por favor, corrija as informações prestadas no formulário.',
    })
  }

  const submitHandler = handleSubmit(onValid, onInvalid)

  return { submitHandler }
}
