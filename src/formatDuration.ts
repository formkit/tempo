import { deviceLocale } from "./deviceLocale"

export type DurationUnit =
  | "years"
  | "months"
  | "weeks"
  | "days"
  | "hours"
  | "minutes"
  | "seconds"
  | "milliseconds"

export type DurationObject = Partial<Record<DurationUnit, number>>

export interface FormatDurationOptions {
  /** A BCP 47 locale (default: the device locale). */
  locale?: string
  /** "long" (default) "1 hour, 5 minutes", "short" "1 hr, 5 min", "narrow" "1h 5m", or "digital" "1:05:00". */
  style?: "long" | "short" | "narrow" | "digital"
  /**
   * The smallest unit to show when the duration is given in milliseconds;
   * smaller parts are dropped (truncated). Default: "seconds".
   */
  smallest?: "days" | "hours" | "minutes" | "seconds" | "milliseconds"
}

const order: DurationUnit[] = [
  "years",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds",
]
const msUnits: Array<[DurationUnit, number]> = [
  ["days", 86_400_000],
  ["hours", 3_600_000],
  ["minutes", 60_000],
  ["seconds", 1_000],
  ["milliseconds", 1],
]

/**
 * Split milliseconds into days, hours, minutes, seconds and milliseconds
 * (months and years have no fixed length, so they're never produced).
 */
function fromMilliseconds(ms: number, smallest: DurationUnit): DurationObject {
  const sign = ms < 0 ? -1 : 1
  let rest = Math.abs(ms)
  const out: DurationObject = {}
  for (const [unit, size] of msUnits) {
    const isLast = unit === smallest
    const value = Math.floor(rest / size)
    if (value || isLast) out[unit] = value * sign || 0
    rest -= value * size
    if (isLast) break
  }
  return out
}

/**
 * Fallback for runtimes without Intl.DurationFormat, mirroring its output:
 * only the first unit carries a minus sign, and "digital" shows days and
 * larger units as words before an h:mm:ss clock.
 */
function fallback(
  d: DurationObject,
  locale: string,
  style: NonNullable<FormatDurationOptions["style"]>
): string {
  const negative = order.some((u) => (d[u] ?? 0) < 0)
  const abs = (u: DurationUnit) => Math.abs(d[u] ?? 0)
  const unitText = (u: DurationUnit, display: "long" | "short" | "narrow") =>
    new Intl.NumberFormat(locale, {
      style: "unit",
      unit: u.slice(0, -1),
      unitDisplay: display,
    }).format(abs(u))
  const ListFormat = (Intl as any).ListFormat
  const list = (parts: string[], listStyle: "long" | "short" | "narrow") =>
    typeof ListFormat === "function"
      ? new ListFormat(locale, { type: "unit", style: listStyle }).format(parts)
      : parts.join(listStyle === "narrow" ? " " : ", ")
  let out: string
  if (style === "digital") {
    const pad = (n: number) => String(n).padStart(2, "0")
    let clock = `${abs("hours")}:${pad(abs("minutes"))}:${pad(abs("seconds"))}`
    if (d.milliseconds) clock += `.${String(abs("milliseconds")).padStart(3, "0")}`
    const big = order.slice(0, 4).filter((u) => d[u]).map((u) => unitText(u, "long"))
    out = list([...big, clock], "short")
  } else {
    const units = order.filter((u) => d[u])
    if (!units.length) units.push(order.find((u) => u in d) ?? "seconds")
    out = list(units.map((u) => unitText(u, style)), style)
  }
  return negative ? `-${out}` : out
}

/**
 * Formats a duration for people, e.g. "1 hour, 5 minutes" or "1:05:00",
 * using `Intl.DurationFormat` (with a fallback for older runtimes).
 *
 * ```js
 * formatDuration(3_900_000) // "1 hour, 5 minutes"
 * formatDuration(3_900_000, { style: "digital" }) // "1:05:00"
 * formatDuration({ days: 2, hours: 3 }, { style: "short", locale: "de" }) // "2 Tg., 3 Std."
 * ```
 *
 * @param duration - Milliseconds, or an object like `{ hours: 1, minutes: 5 }`
 * @param [options] - locale, style and (for milliseconds) the smallest unit
 */
export function formatDuration(
  duration: number | DurationObject,
  options: FormatDurationOptions = {}
): string {
  const locale =
    !options.locale || options.locale === "device" ? deviceLocale() : options.locale
  const style = options.style ?? "long"
  const smallest = options.smallest ?? "seconds"
  let d =
    typeof duration === "number"
      ? fromMilliseconds(Math.trunc(duration), smallest)
      : duration
  // A zero duration would format as "" (or throw for {}): show "0 seconds".
  const zero = !order.some((u) => d[u])
  if (zero) d = { [typeof duration === "number" ? smallest : "seconds"]: 0 }
  const DurationFormat = (Intl as any).DurationFormat
  if (typeof DurationFormat === "function") {
    const zeroUnit = Object.keys(d)[0]
    return new DurationFormat(locale, {
      style,
      ...(zero && style !== "digital" ? { [`${zeroUnit}Display`]: "always" } : {}),
    }).format(d)
  }
  return fallback(d, locale, style)
}
