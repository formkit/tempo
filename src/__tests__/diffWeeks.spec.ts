import { describe, expect, it } from "vitest"
import { diffWeeks } from "../diffWeeks"

describe("differenceInWeeks", () => {
  it("difference is 5 hours", () => {
    expect(diffWeeks("2025-06-30", "2024-04-07")).toBe(64)
  })
})
