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

  it("counts calendar days, not 24h blocks", () => {
    // 11pm the night before is yesterday, even though it is only 13h earlier…
    const late = new Date("2026-03-10T23:30:00")
    expect(relative(at("2026-03-09T23:00:00"), { base: late, locale: "en" })).toBe("yesterday")
    // …and 30h earlier across one midnight is still yesterday, not "2 days ago"
    expect(relative(at("2026-03-09T06:00:00"), { base, locale: "en" })).toBe("yesterday")
    // 26h earlier across two midnights is 2 days ago
    const early = new Date("2026-03-10T01:00:00")
    expect(relative(at("2026-03-08T23:00:00"), { base: early, locale: "en" })).toBe("2 days ago")
  })

  it("is not shifted by DST (2026-03-08 in New York)", () => {
    const after = new Date("2026-03-09T00:30:00")
    expect(relative(at("2026-03-07T23:30:00"), { base: after, locale: "en" })).toBe("2 days ago")
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
