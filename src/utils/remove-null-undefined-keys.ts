/* eslint-disable @typescript-eslint/no-wrapper-object-types */
export function removeNullUndefinedKeys<T extends Object>(obj: T) {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key]
    } else if (typeof obj[key] === 'object') {
      removeNullUndefinedKeys(obj[key])
    }
  }
  return obj
}
