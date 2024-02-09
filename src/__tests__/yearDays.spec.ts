import { describe, it, expect } from "vitest"
import { yearDays } from "../yearDays"
process.env.TZ = "America/New_York"

describe("yearDays", () => {
  it("can find the number of days in a year", () => {
    expect(yearDays("2023-01-01")).toBe(365)
  })
  it("can find the number of days in a year", () => {
    expect(yearDays("2020-01-01")).toBe(366)
  })
})
