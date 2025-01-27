declare type StringfyKeys<T> =
  T extends Record<string, unknown> ? `${keyof T}` : never

declare type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>
}

declare type NonNullableField<T, K extends keyof T> = T &
  NonNullableFields<Pick<T, K>>

declare type NonUndefined<T> = T extends undefined ? never : T

declare type DeepNullable<T> = {
  [K in keyof T]: DeepNullable<T[K]> | null
}
