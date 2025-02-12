import { clienteCertificadoInserirRequestPayloadSchema } from '@/services/api/accountant-panel-api/endpoints/cliente/certificado'
import { fileToBase64 } from '@/utils/file-to-base64'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FileBadge2Icon,
  FilePlus2Icon,
  Trash2Icon,
  UploadIcon,
} from 'lucide-react'
import { useForm } from 'react-hook-form'

import { z } from '@/lib/translated-zod'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Dropzone,
  DropZoneArea,
  DropzoneMessage,
  DropzoneTrigger,
  useDropzone,
} from '@/components/ui/dropzone'
import { Form } from '@/components/ui/form'
import { PasswordInput } from '@/components/ui/password-input'
import { RenderField } from '@/components/form/RenderField'

const certficateInsertFormSchema =
  clienteCertificadoInserirRequestPayloadSchema.shape.payload

type CertificateInsertFormInput = z.input<typeof certficateInsertFormSchema>
type CertificateInsertFormOutput = z.output<typeof certficateInsertFormSchema>

export function CertificateInsertForm() {
  const form = useForm<CertificateInsertFormInput, CertificateInsertFormOutput>(
    {
      resolver: zodResolver(certficateInsertFormSchema),
      defaultValues: {
        certificado: '',
        senhaCertificado: '',
      },
    }
  )

  const submitHandler = form.handleSubmit(
    (data) => console.log('data: ', data.certificado),
    (error) => console.error(error)
  )

  const dropzone = useDropzone({
    onDropFile: async (file: File) => {
      const base64file = await fileToBase64(file)

      form.setValue('certificado', base64file)

      return {
        status: 'success',
        result: file.name,
      }
    },
    validation: {
      accept: {
        'application/x-pkcs12': ['.pfx'],
      },
      maxSize: 10 * 1024 * 1024,
      maxFiles: 1,
    },
    shiftOnMaxFiles: true,
  })

  const fileName = dropzone.fileStatuses[0]?.result
  const base64File = form.watch('certificado')

  return (
    <Form {...form}>
      <form className="flex flex-col w-full gap-4" onSubmit={submitHandler}>
        <RenderField<CertificateInsertFormInput, CertificateInsertFormOutput>
          form={form}
          slot={{
            name: 'certificado',
            translateKey: 'Certificado ',
            className: 'w-full',
          }}
        >
          <Dropzone {...dropzone}>
            <div className="flex flex-col w-full">
              <DropzoneMessage />
              <DropZoneArea className="w-full">
                <DropzoneTrigger
                  className={cn(
                    'flex gap-8 bg-transparent text-sm text-muted-foreground',
                    base64File?.length && 'text-foreground'
                  )}
                >
                  {base64File?.length ? (
                    <FileBadge2Icon className="size-10" />
                  ) : (
                    <UploadIcon className="size-10" />
                  )}

                  <div className="flex flex-col gap-1 justify-center">
                    <p className={cn('line-clamp-1')}>
                      {base64File?.length
                        ? fileName
                        : 'Carregue seu certificado digital'}
                    </p>

                    <p className="text-xs text-muted-foreground/80">
                      {!base64File?.length
                        ? 'São aceitos somente arquivos .pfx'
                        : 'seu certificado'}
                    </p>
                  </div>

                  {Boolean(base64File?.length) && (
                    <Button
                      variant="tertiary"
                      className="rounded-full p-3 hover:bg-background z-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        form.setValue('certificado', '')
                      }}
                    >
                      <Trash2Icon />
                    </Button>
                  )}
                </DropzoneTrigger>
              </DropZoneArea>
            </div>
          </Dropzone>
        </RenderField>

        <RenderField<CertificateInsertFormInput, CertificateInsertFormOutput>
          form={form}
          slot={{
            name: 'senhaCertificado',
            translateKey: 'Senha ',
            className: 'w-full',
            render: ({ field }) => (
              <PasswordInput value={field.value} onChange={field.onChange} />
            ),
          }}
        />

        <Button type="submit">
          <FilePlus2Icon />
          Adicionar certificado
        </Button>
      </form>
    </Form>
  )
}
