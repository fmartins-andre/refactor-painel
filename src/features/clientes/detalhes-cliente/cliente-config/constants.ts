import { ClienteConfigFormInput } from './cliente-config.schema'

export const formDefaultValues: ClienteConfigFormInput = {
  modulosEmissor: {
    nfe: false,
    nfce: false,
    nfse: false,
    cte: false,
    mdfe: false,
  },
}
