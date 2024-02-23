import { describe, it, expect } from "vitest"
import { isBefore } from "../isBefore"
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
      "Non ISO 8601 compliant date",
    )
  })
})
