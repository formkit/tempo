import { describe, expect, it } from "vitest"
import { diffWeeks } from "../diffWeeks"

describe("differenceInWeeks", () => {
  it("difference is 5 hours", () => {
    expect(diffWeeks("2025-06-30", "2024-04-07")).toBe(64)
  })
})

describe("diffWeeks without a second date", () => {
  it("compares with the current time when dateB is omitted", () => {
    const now = new Date()
    const twoWeeksAhead = new Date(now.getTime() + 14 * 24 * 3600 * 1000 + 60000)
    expect(diffWeeks(twoWeeksAhead)).toBe(2)
  })

  it("compares with the current time when dateA is null", () => {
    const now = new Date()
    const twoWeeksAhead = new Date(now.getTime() + 14 * 24 * 3600 * 1000 + 60000)
    expect(diffWeeks(null, twoWeeksAhead)).toBe(-2)
  })
})
