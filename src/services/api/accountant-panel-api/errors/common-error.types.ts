export interface CommonAccountantPanelApiError {
  type: string
  title: string
  status: number
  detail: string
  instance: string
  [key: string]: unknown
}
