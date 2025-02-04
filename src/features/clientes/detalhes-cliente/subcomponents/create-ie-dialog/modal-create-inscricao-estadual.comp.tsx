import { useMemo, useState } from 'react'
import {
  useBrasilApiIbgeEstadosListar,
  useBrasilApiIbgeMunicipios,
} from '@/services/api/third-party/brasil-api/endpoints/ibge'
import { zodResolver } from '@hookform/resolvers/zod'
import { BuildingIcon, MapPinIcon, PlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { RenderField } from '@/components/form/RenderField'

import { formDefaultValues } from './constants'
import { useGetZipCode } from './helpers/use-get-zip-code.hook'
import { useCreateIEDialogSubmitHandler } from './helpers/use-submit-handler.hook'
import {
  createInscricaoEstadualSchema,
  CreateInscricaoEstadualSchema,
} from './modal-create-inscricao-estadual.schema'

export function ModalCreateInscricaoEstadual() {
  const [openDialog, setOpenDialog] = useState(false)

  const form = useForm<CreateInscricaoEstadualSchema>({
    resolver: zodResolver(createInscricaoEstadualSchema),
    defaultValues: formDefaultValues,
  })

  const { watch, setValue, handleSubmit, reset, getFieldState, resetField } =
    form

  const uf = watch('endereco.uf') ?? ''

  const handleToggleDialog = (value: boolean) => {
    if (!value) reset(formDefaultValues)

    setOpenDialog(value)
  }

  const { handleOnSubmit, isPending } = useCreateIEDialogSubmitHandler({
    handleSubmit,
    handleCloseDialog: () => handleToggleDialog(false),
  })

  const { data: brazilianStates } = useBrasilApiIbgeEstadosListar()

  const { data: brazilianCitiesByState } = useBrasilApiIbgeMunicipios({ uf })

  const brazilianStatesOptions = useMemo(
    () =>
      brazilianStates
        ?.map((state) => ({
          value: state.sigla,
          label: state.nome,
        }))
        .sort((a, b) => (a.label > b.label ? 1 : -1)) ?? [],
    [brazilianStates]
  )

  const brazilianCitiesByStateOptions = useMemo(
    () =>
      brazilianCitiesByState
        ?.map((state) => ({
          value: state.codigo_ibge,
          label: state.nome,
        }))
        .sort((a, b) => (a.label > b.label ? 1 : -1)) ?? [],
    [brazilianCitiesByState]
  )

  const { getZipCode } = useGetZipCode({
    getFieldState,
    resetField,
    setValue,
  })

  return (
    <Dialog open={openDialog} onOpenChange={handleToggleDialog}>
      <DialogTrigger asChild>
        <Button size="icon" variant="tertiary" className="h-11 w-14">
          <PlusIcon className="size-6" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-screen-sm lg:max-w-screen-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {/* <Icons.support /> */}
            <span className="text-md font-semibold">Adicionar IE</span>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={handleOnSubmit}>
            <div className="grid w-full grid-cols-12 gap-4">
              <RenderField<CreateInscricaoEstadualSchema>
                form={form}
                slot={{
                  type: 'title',
                  icon: <BuildingIcon className="size-4 text-[#7D93B8]" />,
                  label: 'Informações Básica',
                  placeholderKey: 'Informações Básica',
                  name: 'razaoSocial',
                  className: 'col-span-full text-sm',
                }}
              />
            </div>

            <div className="grid w-full grid-cols-12 gap-4">
              <RenderField<CreateInscricaoEstadualSchema>
                form={form}
                slot={{
                  name: 'status',
                  disabled: true,
                  label: 'Status',
                  className: 'col-span-2',
                  type: 'select',
                  options: [
                    { value: 'A', label: 'Ativo' },
                    { value: 'I', label: 'Inativo' },
                  ],
                  translateKey: 'Status',
                }}
              />

              <RenderField<CreateInscricaoEstadualSchema>
                form={form}
                slot={{
                  name: 'inscricaoEstadual',
                  required: true,
                  translateKey: 'Inscrição estadual',
                  placeholderKey: 'Ex: 00.000.00-00',
                  type: 'text',
                  className: 'col-span-5',
                }}
              />

              <RenderField<CreateInscricaoEstadualSchema>
                form={form}
                slot={{
                  name: 'nomeFantasia',
                  required: true,
                  translateKey: 'Nome Fantasia',
                  placeholderKey: 'Ex: Lorem Ipsum company',
                  type: 'text',
                  className: 'col-span-5',
                }}
              />
            </div>

            <div className="grid w-full grid-cols-12 gap-4">
              <RenderField<CreateInscricaoEstadualSchema>
                form={form}
                slot={{
                  name: 'razaoSocial',
                  required: true,
                  translateKey: 'Razão Social',
                  placeholderKey: 'Ex: Lorem Ipsum company LTDA',
                  type: 'text',
                  className: 'col-span-full',
                }}
              />
            </div>

            <div className="grid w-full grid-cols-12 gap-4">
              <RenderField<CreateInscricaoEstadualSchema>
                form={form}
                slot={{
                  type: 'title',
                  icon: <MapPinIcon className="size-4 text-[#7D93B8]" />,
                  label: 'Endereço ',
                  placeholderKey: 'Endereço ',
                  name: 'endereco.cep',
                  className: 'col-span-full text-sm',
                }}
              />
            </div>

            <div className="grid w-full grid-cols-12 gap-4">
              <RenderField<CreateInscricaoEstadualSchema>
                form={form}
                slot={{
                  name: 'endereco.cep',
                  required: true,
                  translateKey: 'CEP',
                  placeholderKey: 'Ex: 00000-000',
                  type: 'zipcode',
                  className: 'col-span-4',
                  onBlur: (e) => getZipCode(e.target.value),
                }}
              />

              <RenderField<CreateInscricaoEstadualSchema>
                form={form}
                slot={{
                  name: 'endereco.uf',
                  required: true,
                  translateKey: 'Estado',
                  placeholderKey: 'Estado',
                  type: 'combobox-single-value',
                  options: brazilianStatesOptions,
                  className: 'col-span-4',
                  postChangeCall: () => setValue('endereco.cidadeId', ''),
                }}
              />

              <RenderField<CreateInscricaoEstadualSchema>
                form={form}
                slot={{
                  name: 'endereco.cidadeId',
                  required: true,
                  translateKey: 'Cidade',
                  placeholderKey: 'Cidade',
                  options: brazilianCitiesByStateOptions,
                  type: 'combobox-single-value',
                  className: 'col-span-4',
                  disabled: !brazilianCitiesByState?.length,
                }}
              />
            </div>

            <div className="grid w-full grid-cols-12 gap-4">
              <RenderField<CreateInscricaoEstadualSchema>
                form={form}
                slot={{
                  name: 'endereco.bairro',
                  required: true,
                  translateKey: 'Bairro',
                  placeholderKey: 'Ex: Setor central',
                  type: 'text',
                  className: 'col-span-4',
                }}
              />

              <RenderField<CreateInscricaoEstadualSchema>
                form={form}
                slot={{
                  name: 'endereco.numero',
                  required: true,
                  translateKey: 'Número',
                  placeholderKey: 'Ex: 000',
                  type: 'text',
                  className: 'col-span-4',
                }}
              />

              <RenderField<CreateInscricaoEstadualSchema>
                form={form}
                slot={{
                  name: 'endereco.complemento',
                  optional: true,
                  translateKey: 'Complemento',
                  placeholderKey: 'Ex: Casa, Apartamento, etc',
                  type: 'text',
                  className: 'col-span-4',
                }}
              />
            </div>

            <div className="grid w-full grid-cols-12 gap-4">
              <RenderField<CreateInscricaoEstadualSchema>
                form={form}
                slot={{
                  name: 'endereco.logradouro',
                  required: true,
                  translateKey: 'Logradouro',
                  placeholderKey: 'Ex: Rua Lorem Ipsum',
                  type: 'text',
                  className: 'col-span-full',
                }}
              />
            </div>

            <div className="flex w-full items-center justify-end gap-4">
              <Button disabled={isPending} type="submit">
                Salvar Nova IE
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
