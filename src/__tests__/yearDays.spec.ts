import { describe, it, expect } from "vitest"
import { yearDays } from "../yearDays"
import { yearEnd } from "../yearEnd"
import { diffDays } from "../diffDays"
import { yearStart } from "../yearStart"
process.env.TZ = "America/New_York"

describe("yearDays", () => {
  it("can find the number of days in a year", () => {
    expect(yearDays("2023-01-01")).toBe(365)
  })
  it("can find the number of days in a year", () => {
    expect(yearDays("2020-01-01")).toBe(366)
  })

  it("can find the number of days of the current day", () => {
    const start = yearStart()
    const end = yearEnd()
    expect(yearDays()).toBe(diffDays(end, start) + 1)
  })

  it("returns whole days in zones with DST changes at midnight or skipped days", () => {
    const original = process.env.TZ
    try {
      for (const [tz, input, expected] of [
        ["America/Sao_Paulo", "2019-06-15", 365],
        ["America/Nuuk", "2023-06-15", 365],
        ["Pacific/Apia", "2011-06-15", 365],
        ["America/Sao_Paulo", "2020-06-15", 366],
      ] as const) {
        process.env.TZ = tz
        expect(yearDays(input), `${tz} ${input}`).toBe(expected)
      }
    } finally {
      process.env.TZ = original
    }
  })
})
