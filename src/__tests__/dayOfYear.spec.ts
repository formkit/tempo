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
})
