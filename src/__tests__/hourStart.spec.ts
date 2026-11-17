import { describe, it, expect } from "vitest"
import { hourStart } from "../hourStart"
process.env.TZ = "America/New_York"

describe("hourStart", () => {
  it("can become the start of the hour", () => {
    expect(hourStart("2023-02-22T12:30:00Z").toISOString()).toBe(
      "2023-02-22T12:00:00.000Z"
    )
  })

  it("can become the start of the current hour", () => {
    const compare = new Date()
    compare.setMinutes(0, 0, 0)
    expect(hourStart()).toEqual(compare)
  })

  it("keeps the second occurrence of a repeated hour (DST fall-back)", () => {
    // 2026-11-01 01:30 America/New_York happens twice; 06:30Z is the second (EST)
    expect(hourStart("2026-11-01T06:30:15.123Z").toISOString()).toBe("2026-11-01T06:00:00.000Z")
  })

  it("handles a 30-minute DST fall-back (Lord_Howe)", () => {
    const tz = process.env.TZ
    process.env.TZ = "Australia/Lord_Howe"
    try {
      const r = hourStart("2026-04-04T15:15:15.123Z")
      expect(r.getMinutes()).toBe(0)
      expect(r.getSeconds()).toBe(0)
    } finally {
      process.env.TZ = tz
    }
  })
})
