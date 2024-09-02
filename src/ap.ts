import { dayPeriodMap, specDate, normStr } from "./common"
import type { LocalePeriod } from "./types"

/**
 * Determines the correct value for am/pm by locale and memoizes it.
 * @param ampm - am or pm
 * @param locale - The locale to fetch.
 */
export function ap(ampm: "am" | "pm", locale: string): string {
  const l = dayPeriodMap.get(locale)
  if (l?.[ampm]) return l[ampm] as string
  const specimen = new Date(specDate)
  specimen.setUTCHours(ampm === "am" ? 5 : 20)
  const subParts = new Intl.DateTimeFormat(locale, {
    timeStyle: "full",
    timeZone: "UTC",
    hour12: true,
  })
    .formatToParts(specimen)
    .map(normStr)
  const period = subParts.find((part) => part.type === "dayPeriod")
  if (!period) return ampm
  const localePeriod: LocalePeriod = l || {}
  dayPeriodMap.set(locale, Object.assign(localePeriod, { [ampm]: period.value }))
  return period.value
}
