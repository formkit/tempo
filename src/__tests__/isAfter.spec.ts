import { describe, it, expect } from "vitest"
import { isAfter } from "../isAfter"
import { addDay } from "../addDay"
process.env.TZ = "America/New_York"

describe("isAfter", () => {
  it("returns true if first date is after second", () => {
    expect(isAfter("2022-01-02", "2022-01-01")).toBe(true)
  })
  it("returns true if first date is before second", () => {
    expect(isAfter("2022-01-01", "2022-01-02")).toBe(false)
  })
  it("returns error if date is not valid", () => {
    expect(() => isAfter("invalid", "2022-01-01")).toThrowError(
      "Non ISO 8601 compliant date"
    )
  })

  it("returns false if date is in the past", () => {
    expect(isAfter(addDay(new Date(), -1))).toBe(false)
  })
  it("returns true if date is in the future", () => {
    expect(isAfter(addDay(new Date(), 1))).toBe(true)
  })
})
