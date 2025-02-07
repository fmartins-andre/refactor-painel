const isObject = (obj: unknown) => obj && typeof obj === 'object'

/**
 * Patch source object with other object.
 * Only the source object keys are kept!
 * Patch undefined values are ignored
 *
 * @param {TSource} source
 * @param {TPatch} patch
 * @return {*}  {TSource}
 */
export function patchDeep<
  TSource extends Record<string, unknown>,
  TPatch extends DeepPartial<TSource>,
>(source: TSource, patch: TPatch): TSource {
  if (!isObject(source)) {
    return source
  }

  const mergedObj = Object.entries(source).reduce(
    (agg, [sourceKey, sourceValue]): TSource => {
      const patchValue = patch[sourceKey]

      if (Array.isArray(sourceValue)) {
        return {
          ...agg,
          [sourceKey]: Array.isArray(patchValue)
            ? patchValue.concat(sourceValue)
            : sourceValue,
        }
      }

      if (isObject(sourceValue)) {
        return {
          ...agg,
          [sourceKey]: isObject(patchValue)
            ? patchDeep(sourceValue as TSource, patchValue as TPatch)
            : sourceValue,
        }
      }

      return {
        ...agg,
        [sourceKey]: patchValue === undefined ? sourceValue : patchValue,
      }
    },
    Object.create({}) as TSource
  )

  return mergedObj
}
