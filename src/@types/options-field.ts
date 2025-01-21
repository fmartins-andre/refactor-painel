export interface OptionsField {
  label: string
  value: string | number
}

export type GenericOptionField<T> = {
  label: string
  value: T
}
