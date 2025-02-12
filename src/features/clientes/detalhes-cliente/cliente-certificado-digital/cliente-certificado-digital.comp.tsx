import { useGetCurrentCustomerData } from '../helpers/use-get-current-customer-data.hook'
import { getCertStatus } from './helpers/get-certificate-status'
import { CertificateCard } from './subcomponents/certificate-card.comp'
import { CertificateInsertForm } from './subcomponents/certificate-insert-form.comp'
import { CertificateRemoveButton } from './subcomponents/certificate-remove-button.comp'

export function CustomerDetailsDigitalCert() {
  const { data: customer } = useGetCurrentCustomerData()

  const dataValidade = customer?.certificadoDigital?.dataValidade ?? null

  const certStatus = getCertStatus(dataValidade)

  return (
    <div className="flex flex-col w-full gap-4">
      <h2 className="text-muted-foreground">
        Certificados Digitais registrados para do cliente
      </h2>

      <section className="flex flex-row flex-wrap gap-8 w-full @container">
        <div className="flex grow basis-1 @md:min-w-80 @4xl:max-w-96 h-fit">
          <CertificateCard customer={customer} />
        </div>

        <div className="flex flex-col gap-4 basis-6 grow @md:min-w-96 @4xl:max-w-[600px] justify-start">
          {certStatus.status === 'missing' ? (
            <CertificateInsertForm />
          ) : (
            <CertificateRemoveButton />
          )}
        </div>
      </section>
    </div>
  )
}
