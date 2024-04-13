export type DifferenceRoundingMethod = "trunc" | "round" | "floor" | "ceil"

/**
 * Return a rounded value with the given rounding method
 * @param value the value to round
 * @param method the rounding method
 */
export function differenceRound(
  value: number,
  method: DifferenceRoundingMethod = "trunc"
) {
  const r = Math[method](value)
  return r == 0 ? 0 : r
}
