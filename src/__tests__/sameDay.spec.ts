import { describe, it, expect } from "vitest"
import { sameDay } from "../sameDay"
process.env.TZ = "America/New_York"

describe("sameDay", () => {
  it("can determine two dates are the exact same", () => {
    expect(sameDay(new Date(), new Date())).toBe(true)
  })

  it("can compare a string against a date object", () => {
    expect(sameDay("1999-12-17", new Date("1999-12-17T10:00:00Z"))).toBe(true)
  })

  it("evaluates false for the same dates in different years", () => {
    expect(sameDay("1999-12-17", new Date("2020-12-17T00:10:00Z"))).toBe(false)
  })

  it("evaluates false for the same dates in different months", () => {
    expect(sameDay("2020-11-17", new Date("2020-12-17T10:00:00Z"))).toBe(false)
  })

  it("evaluates false for two adjacent days", () => {
    expect(sameDay("2020-11-17", new Date("2020-11-18T10:00:00Z"))).toBe(false)
  })
})
