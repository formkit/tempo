import { describe, it, expect } from "vitest"
import { diffMilliseconds } from "../diffMilliseconds"

describe("diffMilliseconds", () => {
  it("difference is 257 milliseconds", () => {
    expect(diffMilliseconds("2024-04-07T09:10:48.257Z", "2024-04-07T09:10:48.000Z")).toBe(
      257
    )
  })

  it("should be 5000 milleseconds difference compared to the current time", () => {
    const now = new Date()
    now.setMilliseconds(5000) // because the date function sets ms to 0, the test needs to test with increments of 1000
    expect(diffMilliseconds(now)).toBe(5000)
  })

  it("should be -5000 milleseconds difference compared to the current time", () => {
    const now = new Date()
    now.setMilliseconds(5000)
    expect(diffMilliseconds(null, now)).toBe(-5000)
  })
})
