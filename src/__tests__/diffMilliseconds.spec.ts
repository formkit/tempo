import { describe, it, expect } from "vitest"
import { diffMilliseconds } from "../diffMilliseconds"

describe("diffMilliseconds", () => {
  it("difference is 257 milliseconds", () => {
    expect(diffMilliseconds("2024-04-07T09:10:48.257Z", "2024-04-07T09:10:48.000Z")).toBe(
      257
    )
  })

  it("should be 5000 milleseconds difference compared to a specific time", () => {
    const base = new Date("2024-01-01T00:00:00.000Z")
    const later = new Date("2024-01-01T00:00:05.000Z") // 5000ms later
    expect(diffMilliseconds(later, base)).toBe(5000)
  })

  it("should be -5000 milleseconds difference compared to a specific time", () => {
    const base = new Date("2024-01-01T00:00:00.000Z")
    const later = new Date("2024-01-01T00:00:05.000Z")
    expect(diffMilliseconds(base, later)).toBe(-5000)
  })
})
