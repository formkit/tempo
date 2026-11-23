import { describe, it, expect, afterEach } from "vitest"
import { formatDuration } from "../formatDuration"

const native = (Intl as any).DurationFormat
afterEach(() => {
  ;(Intl as any).DurationFormat = native
})

const cases: Array<[Parameters<typeof formatDuration>[0], Parameters<typeof formatDuration>[1], string]> = [
  [3_900_000, { locale: "en" }, "1 hour, 5 minutes"],
  [3_900_000, { locale: "en", style: "digital" }, "1:05:00"],
  [3_723_456, { locale: "en", style: "short" }, "1 hr, 2 min, 3 sec"],
  [3_723_456, { locale: "en", smallest: "milliseconds" }, "1 hour, 2 minutes, 3 seconds, 456 milliseconds"],
  [3_723_456, { locale: "en", smallest: "minutes" }, "1 hour, 2 minutes"],
  [93_600_000, { locale: "en" }, "1 day, 2 hours"],
  [{ days: 1, hours: 2, minutes: 3 }, { locale: "en", style: "digital" }, "1 day, 2:03:00"],
  [{ hours: 1, minutes: 5 }, { locale: "en", style: "narrow" }, "1h 5m"],
  [-3_900_000, { locale: "en" }, "-1 hour, 5 minutes"],
  [0, { locale: "en" }, "0 seconds"],
  [{}, { locale: "en" }, "0 seconds"],
  [400, { locale: "en" }, "0 seconds"],
]

describe("formatDuration", () => {
  it.each(cases)("native: %j %j → %s", (d, o, expected) => {
    expect(formatDuration(d, o)).toBe(expected)
  })

  it.each(cases)("fallback: %j %j → %s", (d, o, expected) => {
    ;(Intl as any).DurationFormat = undefined
    expect(formatDuration(d, o)).toBe(expected)
  })

  it("localizes", () => {
    expect(formatDuration(3_900_000, { locale: "fr" })).toBe(new (Intl as any).DurationFormat("fr", { style: "long" }).format({ hours: 1, minutes: 5 }))
    expect(formatDuration({ days: 2, hours: 3 }, { locale: "de", style: "short" })).toMatch(/2.*3/)
  })
})
