interface WhatsAppMessageParams {
  customerWhatsAppNumber: string
  customerName: string
  urlDownloadDas: string
}

function isValidPhoneNumber(phoneNumber: string): boolean {
  const phoneRegex = /^[1-9]\d{1,14}$/
  return phoneRegex.test(phoneNumber)
}

function isValidURL(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch (_) {
    return false
  }
}

function areValidWhatsAppMessageParams(
  params: WhatsAppMessageParams
): params is WhatsAppMessageParams {
  return (
    isValidPhoneNumber(params.customerWhatsAppNumber) &&
    isValidURL(params.urlDownloadDas) &&
    params.customerName.trim().length > 0
  )
}

export function sendWhatsAppMessage(params: WhatsAppMessageParams): void {
  if (!areValidWhatsAppMessageParams(params)) {
    throw new Error('Parâmetros inválidos para envio de mensagem no WhatsApp.')
  }

  const { customerWhatsAppNumber, customerName, urlDownloadDas } = params

  const message = `Olá ${customerName}, estou enviando o boleto do seu DAS para pagamento: ${urlDownloadDas}`
  const encodedMessage = encodeURIComponent(message)
  const linkWhatsApp = `https://api.whatsapp.com/send?phone=${customerWhatsAppNumber}&text=${encodedMessage}`

  window.open(linkWhatsApp, '_blank')
}
