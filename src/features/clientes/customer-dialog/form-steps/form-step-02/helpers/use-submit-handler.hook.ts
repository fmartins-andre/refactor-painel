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
  CustomerFormStep02Input,
  CustomerFormStep02Output,
} from '../customer-form-step-02.schema'

export type UseFormStep01SubmitHandler = {
  handleSubmit: UseFormHandleSubmit<CustomerFormStep02Input>
  handleSaveCustomer?: (
    customerPayload: CustomerFormStatePayload
  ) => Promise<void>
}

export function useFormStep02SubmitHandler({
  handleSubmit,
  handleSaveCustomer,
}: UseFormStep01SubmitHandler) {
  const { setNextStep, updateCustomerPayload, customerPayload } =
    useHandleCustomerFormState()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onValid: SubmitHandler<any> = async (
    data: CustomerFormStep02Output
  ) => {
    const payload = merge(customerPayload, {
      ...data,
      ...(customerPayload.inscricoesEstaduais?.length
        ? {
            inscricoesEstaduais: [
              {
                ...customerPayload.inscricoesEstaduais[0]!,
                endereco: data.endereco,
              },
            ],
          }
        : {}),
    })

    updateCustomerPayload(payload)

    if (handleSaveCustomer) {
      await sleep(100)
      await handleSaveCustomer(payload)
    } else {
      setNextStep()
    }
  }

  const onInvalid: SubmitErrorHandler<CustomerFormStep02Input> = (error) => {
    console.error('new customer form | step 2 | errors: ', error)
    toast.error('Erro ao validar dados', {
      description: 'Por favor, corrija as informações prestadas no formulário.',
    })
  }

  const submitHandler = handleSubmit(onValid, onInvalid)

  return { submitHandler }
}
