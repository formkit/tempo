import { describe, expect, it } from "vitest"
import { diffHours } from "../diffHours"
import { addHour } from "../addHour"

describe("differenceInHours", () => {
  it("difference is 5 hours", () => {
    expect(diffHours("2024-04-07T15:28:00.000Z", "2024-04-07T09:50:00.000Z")).toBe(5)
  })

  it("different should be -64 hours compared to the current time", () => {
    const compare = addHour(null, 64)
    expect(diffHours(null, compare)).toBe(-64)
  })
})
