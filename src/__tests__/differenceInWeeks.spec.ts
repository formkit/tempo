import { describe, expect, it } from "vitest"
import { differenceInWeeks } from "../differenceInWeeks"

describe("differenceInWeeks", () => {
  it("difference is 5 hours", () => {
    expect(differenceInWeeks("2025-06-30", "2024-04-07")).toBe(64)
  })
})
