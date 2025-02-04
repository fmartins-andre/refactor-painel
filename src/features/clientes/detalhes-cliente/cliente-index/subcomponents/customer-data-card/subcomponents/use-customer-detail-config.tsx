import { type ReactNode } from 'react'
import { GenericOptionField } from '@/@types/options-field'
import { clienteRegimeTributarioOptions } from '@/features/clientes/constants'
import { RegimeTributarioClienteModelEnum } from '@/services/api/accountant-panel-api/schemas/cliente-view-model'
import { inputMask } from '@/utils/input-mask'
import {
  BuildingIcon,
  FileBadgeIcon,
  FileBoxIcon,
  MapPinned,
} from 'lucide-react'

import { DotStatus } from '@/components/dot-status'

import { useGetCurrentCustomerData } from '../../../../helpers/use-get-current-customer-data.hook'

export type CustomerContextType =
  | 'BASIC_INFO'
  | 'ADDRESS'
  | 'MODULES'
  | 'CERTIFICATE'

export interface CustomerDataValues extends GenericOptionField<ReactNode> {
  [key: string]: ReactNode
}

type CustomerDataOptions = {
  label: string
  value: string
  icon: ReactNode
  context: CustomerContextType
  customerDataValues: CustomerDataValues[]
}

export function useCustomerDetailConfig() {
  const { data: customer } = useGetCurrentCustomerData()

  const basicsCustomerData = [
    {
      label: 'CNPJ/CPF',
      value: customer?.documento.length
        ? inputMask.cpfCnpj(customer.documento)
        : ' - ',
    },
    {
      label: 'Cliente',
      value: customer?.nomeRazaoSocial,
    },
    {
      label: 'Telefone',
      value: customer?.telefone?.length
        ? inputMask.phone(customer.telefone)
        : ' - ',
    },
    {
      label: 'Email',
      value: customer?.email ?? ' - ',
    },
    {
      label: 'Regime Especial',
      value:
        clienteRegimeTributarioOptions.find(
          ({ value }) =>
            value ===
            (customer?.pessoaJuridica?.regimeEspecial ??
              ('' as RegimeTributarioClienteModelEnum))
        )?.label ?? ' - ',
    },
  ]

  const addressCustomerData = [
    {
      label: 'CEP',
      value: inputMask.cep(customer?.endereco?.cep ?? ''),
    },
    {
      label: 'Rua',
      value: customer?.endereco?.logradouro,
    },
    {
      label: 'Número',
      value: customer?.endereco?.numero,
    },
    {
      label: 'Complemento',
      value: customer?.endereco?.complemento,
    },
    {
      label: 'Bairro',
      value: customer?.endereco?.bairro,
    },
    {
      label: 'Cidade / Estado',
      value: `${customer?.endereco?.cidade} / ${customer?.endereco?.uf}`,
    },
  ]

  const activeModulesData = [
    {
      label: 'NF-e',
      value: (
        <span className="inline-flex gap-2">
          <DotStatus
            color={customer?.modulosEmissor?.nfe ? 'success' : 'error'}
          />
          {customer?.modulosEmissor?.nfe ? 'Ativo' : 'Inativo'}
        </span>
      ),
      rawValue: Boolean(customer?.modulosEmissor?.nfe),
    },
    {
      label: 'NFC-e',
      value: (
        <span className="inline-flex gap-2">
          <DotStatus
            color={customer?.modulosEmissor?.nfce ? 'success' : 'error'}
          />
          {customer?.modulosEmissor?.nfce ? 'Ativo' : 'Inativo'}
        </span>
      ),
      rawValue: Boolean(customer?.modulosEmissor?.nfce),
    },
    {
      label: 'NFS-e',
      value: (
        <span className="inline-flex gap-2">
          <DotStatus
            color={customer?.modulosEmissor?.nfse ? 'success' : 'error'}
          />
          {customer?.modulosEmissor?.nfse ? 'Ativo' : 'Inativo'}
        </span>
      ),
      rawValue: Boolean(customer?.modulosEmissor?.nfse),
    },
    {
      label: 'CT-e',
      value: (
        <span className="inline-flex gap-2">
          <DotStatus
            color={customer?.modulosEmissor?.cte ? 'success' : 'error'}
          />
          {customer?.modulosEmissor?.cte ? 'Ativo' : 'Inativo'}
        </span>
      ),
      rawValue: Boolean(customer?.modulosEmissor?.cte),
    },
    {
      label: 'MDF-e',
      value: (
        <span className="inline-flex gap-2">
          <DotStatus
            color={customer?.modulosEmissor?.mdfe ? 'success' : 'error'}
          />
          {customer?.modulosEmissor?.mdfe ? 'Ativo' : 'Inativo'}
        </span>
      ),
      rawValue: Boolean(customer?.modulosEmissor?.mdfe),
    },
  ]

  const certificateData = [
    {
      label: 'Vencimento Certificado Digital',
      value:
        customer?.certificadoDigital?.dataValidade?.toLocaleDateString(
          'pt-BR'
        ) ?? ' - ',
    },
  ]

  const customerDataOptions: CustomerDataOptions[] = [
    {
      label: 'Informações básicas',
      value: 'basic-info',
      icon: <BuildingIcon className="size-4" />,
      context: 'BASIC_INFO',
      customerDataValues: basicsCustomerData,
    },
    {
      label: 'Endereço',
      value: 'address-info',
      icon: <MapPinned className="size-4" />,
      context: 'ADDRESS',
      customerDataValues: addressCustomerData,
    },
    {
      label: 'Módulos ativos',
      value: 'active-modules',
      icon: <FileBoxIcon className="size-4" />,
      context: 'MODULES',
      customerDataValues: activeModulesData,
    },
    {
      label: 'Certificado Digital ',
      value: 'due-certificate',
      icon: <FileBadgeIcon className="size-4" />,
      context: 'CERTIFICATE',
      customerDataValues: certificateData,
    },
  ]

  return {
    basicsCustomerData,
    addressCustomerData,
    activeModulesData,
    certificateData,
    customerDataOptions,
  }
}
