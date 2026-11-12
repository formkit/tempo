import { describe, expect, it } from "vitest"
import { diffWeeks } from "../diffWeeks"

describe("differenceInWeeks", () => {
  it("difference is 5 hours", () => {
    expect(diffWeeks("2025-06-30", "2024-04-07")).toBe(64)
  })
  it("counts whole weeks across a DST change", () => {
    expect(diffWeeks("2026-03-15", "2026-03-01")).toBe(2)
  })
})
