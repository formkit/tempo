import { describe, it, expect } from "vitest"
import { relative } from "../relative"
process.env.TZ = "America/New_York"

const base = new Date("2026-03-10T12:00:00") // local noon, Tue
const at = (iso: string) => new Date(iso)

describe("relative", () => {
  it("picks the largest sensible unit", () => {
    const o = { base, locale: "en" }
    expect(relative(at("2026-03-10T11:59:30"), o)).toBe("30 seconds ago")
    expect(relative(at("2026-03-10T12:00:00"), o)).toBe("now")
    expect(relative(at("2026-03-10T11:55:00"), o)).toBe("5 minutes ago")
    expect(relative(at("2026-03-10T14:30:00"), o)).toBe("in 2 hours")
    expect(relative(at("2026-03-12T09:00:00"), o)).toBe("in 2 days")
    expect(relative(at("2026-02-26T12:00:00"), o)).toBe("last week")
    expect(relative(at("2026-02-17T12:00:00"), o)).toBe("3 weeks ago")
    expect(relative(at("2026-05-11T12:00:00"), o)).toBe("in 2 months")
    expect(relative(at("2023-01-01T00:00:00"), o)).toBe("3 years ago")
  })

  it("uses the wall clock for hours and calendar dates for days", () => {
    // under 24 wall-clock hours stays in hours, even across midnight
    const late = new Date("2026-03-10T01:00:00")
    expect(relative(at("2026-03-09T23:30:00"), { base: late, locale: "en" })).toBe("1 hour ago")
    // 30h earlier across one midnight is yesterday, not "2 days ago"
    expect(relative(at("2026-03-09T06:00:00"), { base, locale: "en" })).toBe("yesterday")
    // 26h earlier across two midnights is 2 days ago
    expect(relative(at("2026-03-08T23:00:00"), { base: late, locale: "en" })).toBe("2 days ago")
  })

  it("is not shifted by DST", () => {
    // New York springs forward 2026-03-08: noon → next noon is 23h elapsed
    expect(relative(at("2026-03-08T12:00:00"), { base: at("2026-03-07T12:00:00"), locale: "en" })).toBe("tomorrow")
    expect(relative(at("2026-03-07T12:00:00"), { base: at("2026-03-08T12:00:00"), locale: "en" })).toBe("yesterday")
    // falls back 2026-11-01: midnight → 23:30 same day is 24.5h elapsed
    expect(relative(at("2026-11-01T23:30:00"), { base: at("2026-11-01T00:00:00"), locale: "en" })).toBe("in 23 hours")
    // inside the repeated hour the wall clock reads the same twice
    expect(relative(at("2026-11-01T01:30:00-05:00"), { base: at("2026-11-01T01:30:00-04:00"), locale: "en", numeric: "always" })).toBe("in 1 hour")
    expect(relative(at("2026-11-01T01:30:00-04:00"), { base: at("2026-11-01T01:30:00-05:00"), locale: "en", numeric: "always" })).toBe("1 hour ago")
    // skipped midnight (São Paulo 2018-11-04) still counts one day
    process.env.TZ = "America/Sao_Paulo"
    expect(relative(new Date(2018, 10, 5, 12), { base: new Date(2018, 10, 4, 12), locale: "en", unit: "day", numeric: "always" })).toBe("in 1 day")
    process.env.TZ = "America/New_York"
  })

  it("keeps direction for zero amounts and never auto-picks a zero unit", () => {
    expect(relative(new Date(+base - 1), { base, locale: "en", numeric: "always" })).toBe("0 seconds ago")
    expect(relative(new Date(+base + 1), { base, locale: "en", numeric: "always" })).toBe("in 0 seconds")
    expect(relative(at("2026-03-12T12:00:00"), { base, locale: "en", unit: "month", numeric: "always" })).toBe("in 0 months")
    const o = { base, locale: "en", numeric: "always" as const }
    for (let h = -24 * 800; h <= 24 * 800; h += 7) {
      expect(relative(new Date(+base + h * 3_600_000), o)).not.toMatch(/\b0 /)
    }
  })

  it("supports numeric, style, unit and locale", () => {
    const d = at("2026-03-09T12:00:00")
    expect(relative(d, { base, locale: "en", numeric: "always" })).toBe("1 day ago")
    expect(relative(at("2026-03-10T09:00:00"), { base, locale: "en", style: "short" })).toBe("3 hr. ago")
    expect(relative(d, { base, locale: "en", unit: "hour" })).toBe("24 hours ago")
    expect(relative(d, { base, locale: "fr" })).toBe("hier")
    expect(relative(at("2029-03-10T12:00:00"), { base, locale: "de" })).toBe("in 3 Jahren")
  })

  it("defaults the base to now", () => {
    expect(relative(new Date(Date.now() - 5 * 60_000), { locale: "en" })).toBe("5 minutes ago")
  })
})
