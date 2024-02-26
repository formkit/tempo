import { describe, it, expect } from "vitest"
import { sameYear } from "../sameYear"
process.env.TZ = "America/New_York"

describe("sameYear", () => {
  it("can determine two dates are the exact same", () => {
    expect(sameYear(new Date(), new Date())).toBe(true)
  })

  it("can determine string dates", () => {
    expect(sameYear("2024-02-02 13:20:30", "2024-01-01 12:21:32")).toBe(true)
  })

  it("can determine different dates and time except year", () => {
    expect(sameYear("2024-01-01 10:20", "2023-02-02 20:10:01")).toBe(false)
  })

  it("can determine different dates and time with same year", () => {
    expect(sameYear("2024-01-01 12:10:30", "2024-02-02 10:12:00")).toBe(true)
  })
})
