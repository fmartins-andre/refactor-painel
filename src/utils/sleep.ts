/**
 * Wait for an amount of time.
 * @param {number} [ms=0]
 */
export default async function sleep(ms: number = 0) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}
