import { describe, it, expect } from "vitest"
import { validOffset } from "../common"
process.env.TZ = "America/New_York"

describe("validOffset", () => {
  it("returns its own value when valid", () => {
    expect(validOffset("+0000")).toBe("+0000")
    expect(validOffset("+0100")).toBe("+0100")
    expect(validOffset("+00:00")).toBe("+00:00")
    expect(validOffset("+01:00")).toBe("+01:00")
  })
})
