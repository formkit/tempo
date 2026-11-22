import { describe, it, expect } from "vitest"
import { minuteEnd } from "../minuteEnd"
process.env.TZ = "America/New_York"

describe("minuteEnd", () => {
  it("can become the end of the hour", () => {
    expect(minuteEnd("2023-02-22T12:30:30Z").toISOString()).toBe(
      "2023-02-22T12:30:59.999Z"
    )
  })

  it("can become the end of the current minute", () => {
    const compare = new Date()
    compare.setSeconds(59, 999)
    expect(minuteEnd()).toEqual(compare)
  })

  it("keeps the second occurrence of a repeated hour (DST fall-back)", () => {
    // 2026-11-01 01:30 America/New_York happens twice; 06:30Z is the second (EST)
    expect(minuteEnd("2026-11-01T06:30:15.123Z").toISOString()).toBe("2026-11-01T06:30:59.999Z")
  })
})
