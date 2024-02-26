import { describe, it, expect } from "vitest"
import { sameMinute } from "../sameMinute"
process.env.TZ = "America/New_York"

describe("sameMinute", () => {
  it("can determine two dates are the exact same", () => {
    expect(sameMinute(new Date(), new Date())).toBe(true)
  })

  it("can determine string dates", () => {
    expect(sameMinute("2023-02-02 13:21:30", "2024-01-01 12:21:32")).toBe(true)
  })

  it("can determine different dates and time except minutes", () => {
    expect(sameMinute("2024-01-01 10:20", "2023-02-02 20:10:01")).toBe(false)
  })

  it("can determine different dates and time with same minutes", () => {
    expect(sameMinute("2024-01-01 10:10:30", "2024-02-02 20:10:00")).toBe(true)
  })
})
