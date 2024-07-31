import { describe, expect, it } from "vitest"
import { isPast } from "../isPast"

describe("isPast", () => {
  it("should return true if date is in the past", () => {
    expect(isPast(new Date(0))).toBe(true)
  })
  it("should give false if the date is in the future", () => {
    expect(isPast(new Date("3000-01-01"))).toBe(false)
  })
})
