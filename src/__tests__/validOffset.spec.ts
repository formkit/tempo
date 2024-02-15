import { describe, it, expect } from "vitest"
import { validOffset } from "../common"
process.env.TZ = "America/New_York"

describe("validOffset", () => {
  it("returns its own value when valid", () => {
    expect(validOffset("+0000")).toBe("+0000")
    expect(validOffset("+0100")).toBe("+0100")
  })
  it("throws on invalid offset", () => {
      expect(() => { validOffset("+3969") }).toThrow("Invalid offset: +3969")
  })
})
