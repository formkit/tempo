import { describe, it, expect } from "vitest"
import { weekNumber } from "../weekNumber"
process.env.TZ = "America/New_York"

/** Reference ISO 8601 week via the classic Thursday rule (UTC arithmetic). */
function isoWeek(y: number, m: number, d: number): number {
  const t = new Date(Date.UTC(y, m, d))
  const day = t.getUTCDay() || 7
  t.setUTCDate(t.getUTCDate() + 4 - day)
  const yearStart = Date.UTC(t.getUTCFullYear(), 0, 1)
  return Math.ceil(((+t - yearStart) / 86400000 + 1) / 7)
}

describe("weekNumber", () => {
  it("returns ISO 8601 weeks by default", () => {
    expect(weekNumber("2024-01-10")).toBe(2)
    expect(weekNumber("2024-01-01")).toBe(1)
    expect(weekNumber("2024-12-30")).toBe(1) // week 1 of 2025
    expect(weekNumber("2021-01-03")).toBe(53) // week 53 of 2020
    expect(weekNumber("2020-12-31")).toBe(53)
    expect(weekNumber("2026-06-15")).toBe(25)
  })

  it("matches the ISO reference for every day from 2000 to 2040", () => {
    const mismatches: string[] = []
    for (let t = Date.UTC(2000, 0, 1); t <= Date.UTC(2040, 11, 31); t += 86400000) {
      const u = new Date(t)
      const y = u.getUTCFullYear(), m = u.getUTCMonth(), d = u.getUTCDate()
      if (weekNumber(new Date(y, m, d)) !== isoWeek(y, m, d)) mismatches.push(u.toISOString().slice(0, 10))
    }
    expect(mismatches).toEqual([])
  })

  it("supports other week conventions", () => {
    // US-style: Sunday weeks, week 1 contains Jan 1
    expect(weekNumber("2024-01-06", 0, 1)).toBe(1)
    expect(weekNumber("2024-01-07", 0, 1)).toBe(2)
    expect(weekNumber("2023-12-31", 0, 1)).toBe(1) // that week contains 2024-01-01
  })

  it("is stable across DST changes", () => {
    expect(weekNumber("2026-03-08")).toBe(weekNumber("2026-03-02"))
    expect(weekNumber("2026-11-01")).toBe(weekNumber("2026-10-26"))
  })
})
