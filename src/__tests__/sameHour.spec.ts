import { describe, it, expect } from "vitest"
import { sameHour } from "../sameHour"
process.env.TZ = "America/New_York"

describe("sameHour", () => {
  it("can determine two dates are the exact same", () => {
    expect(sameHour(new Date(), new Date())).toBe(true)
  })

  it("can determine string dates", () => {
    expect(sameHour("2023-02-02 12:20:30", "2024-01-01 12:21:32")).toBe(true)
  })

  it("can determine different dates and time except hours", () => {
    expect(sameHour("2024-01-01 10:20", "2023-02-02 20:10:01")).toBe(false)
  })

  it("can determine different dates and time with same hours", () => {
    expect(sameHour("2023-01-01 10:10:30", "2024-02-02 10:12:00")).toBe(true)
  })

  it("evaluates true with 1 date given", () => {
    const compare = new Date()
    compare.setDate(6)
    expect(sameHour(compare)).toBe(true)
  })
})
