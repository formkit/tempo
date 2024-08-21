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
})
