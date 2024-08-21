import { describe, it, expect } from "vitest"
import { isBefore } from "../isBefore"
import { addDay } from "../addDay"
process.env.TZ = "America/New_York"

describe("isBefore", () => {
  it("returns true if first date is before second", () => {
    expect(isBefore("2022-01-01", "2022-01-02")).toBe(true)
  })
  it("returns false if first date is after second", () => {
    expect(isBefore("2022-01-02", "2022-01-01")).toBe(false)
  })
  it("returns error if date is not valid", () => {
    expect(() => isBefore("invalid", "2022-01-01")).toThrowError(
      "Non ISO 8601 compliant date"
    )
  })

  it("returns true if date is in the past", () => {
    expect(isBefore(addDay(new Date(), -1))).toBe(true)
  })
  it("returns false if date is in the future", () => {
    expect(isBefore(addDay(new Date(), 1))).toBe(false)
  })
})
