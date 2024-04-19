import { describe, it, expect } from "vitest"
import { validOffset } from "../common"
process.env.TZ = "America/New_York"

describe("validOffset", () => {
  it("returns its own value when valid", () => {
    expect(validOffset("+0000", "ZZ")).toBe("+0000")
    expect(validOffset("-0000", "ZZ")).toBe("-0000")
    expect(validOffset("+0100", "ZZ")).toBe("+0100")
    expect(validOffset("+00:00", "Z")).toBe("+00:00")
    expect(validOffset("+01:00", "Z")).toBe("+01:00")
    expect(validOffset("+00:00")).toBe("+00:00")
    expect(validOffset("+01:00")).toBe("+01:00")
  })
  it("should throw an error when the timezone token does not match the format", () => {
    expect(() => validOffset("+0000", "Z")).toThrow()
    expect(() => validOffset("+00:00", "ZZ")).toThrow()
  })
})
