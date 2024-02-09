import { describe, it, expect } from "vitest"
import { dayOfYear } from "../dayOfYear"
process.env.TZ = "America/New_York"

describe("dayOfYear", () => {
  it("can find the number of days in a year", () => {
    expect(dayOfYear("2023-08-01")).toBe(213)
  })
  it("can find the number of days in a year", () => {
    expect(dayOfYear("2020-08-01")).toBe(214)
  })
})
