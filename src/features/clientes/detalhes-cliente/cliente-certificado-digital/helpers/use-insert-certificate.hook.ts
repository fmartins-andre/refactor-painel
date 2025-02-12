import { useClienteCertificadoInserir } from '@/services/api/accountant-panel-api/endpoints/cliente/certificado'
import { toast } from 'sonner'

const toastId = 'upload-customer-certificate'

export function useCustomerDetailsInsertDigitalCert() {
  const { mutate: uploadCertificate, isPending: isUploadingCertificate } =
    useClienteCertificadoInserir({
      onMutate: () => {
        toast.loading('Inserindo novo certificado...', { id: toastId })
      },
      onSuccess: () => {
        toast.success('Certificado inserido com sucesso!', { id: toastId })
      },
      onError: () => {
        toast.dismiss(toastId)
      },
    })

  return {
    uploadCertificate,
    isUploadingCertificate,
  }
}
