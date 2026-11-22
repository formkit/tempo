import { describe, it, expect } from "vitest"
import { dayOfYear } from "../dayOfYear"
import { yearStart } from "../yearStart"
import { diffDays } from "../diffDays"
process.env.TZ = "America/New_York"

describe("dayOfYear", () => {
  it("can find the number of days in a year", () => {
    expect(dayOfYear("2023-08-01")).toBe(213)
  })
  it("can find the number of days in a year", () => {
    expect(dayOfYear("2020-08-01")).toBe(214)
  })

  it("can find the number of days of the current day", () => {
    const start = yearStart()
    expect(dayOfYear()).toBe(diffDays(null, start) + 1)
  })

  it("counts calendar days across skipped dates", () => {
    const original = process.env.TZ
    try {
      for (const [tz, input, expected] of [
        ["Pacific/Apia", "2011-12-31", 365],
        ["Pacific/Kwajalein", "1993-12-31", 365],
        ["Pacific/Apia", "2011-01-01", 1],
        ["America/New_York", "2020-12-31", 366],
        ["UTC", "2011-12-31", 365],
      ] as const) {
        process.env.TZ = tz
        expect(dayOfYear(input), `${tz} ${input}`).toBe(expected)
      }
    } finally {
      process.env.TZ = original
    }
  })

})
