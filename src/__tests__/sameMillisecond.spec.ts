import { describe, it, expect } from "vitest"
import { sameMillisecond } from "../sameMillisecond"
process.env.TZ = "America/New_York"

describe("sameMillisecond", () => {
  it("can determine two dates are the exact same", () => {
    expect(sameMillisecond(new Date(), new Date())).toBe(true)
  })

  it("can determine dates with same milliseconds", () => {
    expect(
      sameMillisecond(
        new Date("2024-01-01T10:20:30.123Z"),
        new Date("2024-02-02T20:10:00.123Z")
      )
    ).toBe(true)
  })

  it("can determine dates with different milliseconds", () => {
    expect(
      sameMillisecond(
        new Date("2024-01-01T10:20:30.123Z"),
        new Date("2024-01-01T10:20:30.456Z")
      )
    ).toBe(false)
  })

  it("can determine same milliseconds from string dates", () => {
    expect(
      sameMillisecond("2024-01-01T10:20:30.500Z", "2024-02-02T20:10:00.500Z")
    ).toBe(true)
  })

  it("evaluates true with 1 date given when milliseconds match current time", () => {
    const compare = new Date()
    expect(sameMillisecond(compare)).toBe(true)
  })
})
