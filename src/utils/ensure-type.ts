export function ensureType(arg: unknown, type: string): boolean {
  const _type = Object.prototype.toString.call(arg).toLowerCase()

  return _type.includes(type.toLowerCase())
}
