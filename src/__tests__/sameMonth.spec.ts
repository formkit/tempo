import { describe, it, expect } from "vitest"
import { sameMonth } from "../sameMonth"
process.env.TZ = "America/New_York"

describe("sameMonth", () => {
  it("can determine two dates are the exact same", () => {
    expect(sameMonth(new Date(), new Date())).toBe(true)
  })

  it("can determine string dates", () => {
    expect(sameMonth("2023-02-02 13:20:30", "2024-02-01 12:21:32")).toBe(true)
  })

  it("can determine different dates and time except months", () => {
    expect(sameMonth("2023-02-02 13:20:30", "2024-01-01 12:21:32")).toBe(false)
  })

  it("can determine different dates and time with same months", () => {
    expect(sameMonth("2023-01-01 10:10:30", "2024-01-02 11:12:00")).toBe(true)
  })

  it("evaluates true with 1 date given", () => {
    const compare = new Date()
    compare.setMilliseconds(45)
    expect(sameMonth(null, compare)).toBe(true)
  })
})
