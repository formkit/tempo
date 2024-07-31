import { describe, it, expect } from "vitest"
import { sameMillisecond } from "../sameMillisecond"
process.env.TZ = "America/New_York"

describe("sameMillisecond", () => {
  it("can determine two dates are the exact same", () => {
    expect(sameMillisecond(new Date(), new Date())).toBe(true)
  })

  it("can determine string dates", () => {
    expect(sameMillisecond("2024-01-01 10:20:30.123", "2024-01-01 10:20:30.123")).toBe(true)
  })

  it("can determine different dates and time except milliseconds", () => {
    expect(sameMillisecond("2024-01-01 10:20:30.123", "2024-02-02 20:10:01.123")).toBe(true)
  })

  it("can determine different dates and time with different milliseconds", () => {
    expect(sameMillisecond("2024-01-01 10:20:30.123", "2024-02-02 20:10:00.456")).toBe(false)
  })

  it("can determine same date and time with different milliseconds", () => {
    expect(sameMillisecond("2024-01-01 10:20:30.123", "2024-01-01 10:20:30.456")).toBe(false)
  })
})
