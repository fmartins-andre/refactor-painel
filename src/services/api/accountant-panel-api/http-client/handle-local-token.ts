const LS_ACCOUNTANT_PANEL_API_TOKEN = 'tkn-ccntnt-pnl'

function get() {
  return typeof window !== 'undefined'
    ? localStorage.getItem(LS_ACCOUNTANT_PANEL_API_TOKEN)
    : null
}

function set(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LS_ACCOUNTANT_PANEL_API_TOKEN, token)
  }
}

function remove() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LS_ACCOUNTANT_PANEL_API_TOKEN)
  }
}

export const handleAccountantPanelApiLocalToken = {
  get,
  set,
  remove,
}
