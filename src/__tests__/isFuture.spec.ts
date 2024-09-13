import { describe, expect, it } from "vitest"
import { isFuture } from "../isFuture"

describe("isFuture", () => {
  it("should return false if date is in the past", () => {
    expect(isFuture(new Date(0))).toBe(false)
  })
  it("should give true if the date is in the future", () => {
    expect(isFuture(new Date("3000-01-01"))).toBe(true)
  })
})
