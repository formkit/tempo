import { describe, it, expect } from "vitest"
import { hourEnd } from "../hourEnd"
process.env.TZ = "America/New_York"

describe("hourEnd", () => {
  it("can become the end of the hour", () => {
    expect(hourEnd("2023-02-22T12:30:00Z").toISOString()).toBe("2023-02-22T12:59:59.999Z")
  })
  it("can become the end of the current hour", () => {
    const compare = new Date()
    compare.setMinutes(59, 59, 999)
    expect(hourEnd()).toEqual(compare)
  })

  it("keeps the second occurrence of a repeated hour (DST fall-back)", () => {
    // 2026-11-01 01:30 America/New_York happens twice; 06:30Z is the second (EST)
    expect(hourEnd("2026-11-01T06:30:15.123Z").toISOString()).toBe("2026-11-01T06:59:59.999Z")
  })

  it("handles a 30-minute DST fall-back (Lord_Howe)", () => {
    const tz = process.env.TZ
    process.env.TZ = "Australia/Lord_Howe"
    try {
      const r = hourEnd("2026-04-04T14:45:15.123Z")
      expect(r.getMinutes()).toBe(59)
      expect(r.getSeconds()).toBe(59)
    } finally {
      process.env.TZ = tz
    }
  })

  it("stays in the input's local hour across a non-hourly offset change (Chatham)", () => {
    const tz = process.env.TZ
    process.env.TZ = "Pacific/Chatham"
    try {
      const input = new Date("2026-04-04T13:18:13.123Z") // 03:03:13 +13:45
      const r = hourEnd(input)
      expect(r.getHours()).toBe(input.getHours())
      expect(r.getMinutes()).toBe(59)
    } finally {
      process.env.TZ = tz
    }
  })
})
