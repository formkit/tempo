import { describe, it, expect } from "vitest"
import { sameSecond } from "../sameSecond"
process.env.TZ = "America/New_York"

describe("sameSecond", () => {
  it("can determine two dates are the exact same", () => {
    expect(sameSecond(new Date(), new Date())).toBe(true)
  })

  it("can determine string dates", () => {
    expect(sameSecond("2024-01-01 10:20", "2024-01-01 10:20")).toBe(true)
  })

  it("can determine different dates and time except seconds", () => {
    expect(sameSecond("2024-01-01 10:20", "2024-02-02 20:10:01")).toBe(false)
  })

  it("can determine different dates and time with same seconds", () => {
    expect(sameSecond("2024-01-01 10:20", "2024-02-02 20:10:00")).toBe(true)
  })

  it("evaluates true with 1 date given", () => {
    const compare = new Date()
    compare.setHours(15)
    expect(sameSecond(compare)).toBe(true)
  })
})
